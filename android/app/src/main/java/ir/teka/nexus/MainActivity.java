package ir.teka.nexus;

import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.URLUtil;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

/**
 * TEKA NEXUS v1.0.2 — native WebView shell.
 *
 * WHY: v1.0.0/1.0.1 were TWA shells (com.google.androidbrowserhelper
 * LauncherActivity). On devices without a Custom-Tabs-capable browser
 * (Chrome missing/disabled — common on Iranian devices without Play
 * Services) the TWA launcher crashed at icon tap — the exact "Force
 * Close" Myket's testers reported on Poco X5 (Android 14) and
 * Galaxy A51 (Android 12).
 *
 * A WebView shell depends ONLY on the bundled android.webkit stack, which
 * exists on every Android 5+ device — nothing external to look up, so the
 * Force Close class of failures is eliminated by construction.
 *
 * Extras: swipe-to-refresh, offline error view with retry, external links
 * handed to the system, DownloadManager for files (APK releases), file
 * chooser for avatar uploads, renderer-crash self-healing (recreate()
 * instead of taking the whole app down).
 */
public class MainActivity extends AppCompatActivity {

    private static final String HOME_URL = "https://teka-nexus.vercel.app/";
    private static final String SITE_HOST = "teka-nexus.vercel.app";
    private static final int FILE_CHOOSER_REQUEST = 1001;

    private WebView webView;
    private SwipeRefreshLayout swipeRefresh;
    private LinearLayout errorView;
    private ValueCallback<Uri[]> fileUploadCallback;
    private boolean mainFrameFailed = false;

    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);
        swipeRefresh = findViewById(R.id.swipe_refresh);
        errorView = findViewById(R.id.error_view);
        Button retryButton = findViewById(R.id.btn_retry);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        // Lets the site (and Vercel analytics) recognise app traffic.
        settings.setUserAgentString(settings.getUserAgentString() + " TekaNexusApp/1.0.2");

        webView.setBackgroundColor(Color.parseColor("#08080d"));

        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.setAcceptThirdPartyCookies(webView, true);

        webView.setWebViewClient(new TekaWebViewClient());
        webView.setWebChromeClient(new TekaWebChromeClient());

        webView.setDownloadListener(new DownloadListener() {
            @Override
            public void onDownloadStart(String url, String userAgent,
                                        String contentDisposition, String mimeType, long contentLength) {
                try {
                    DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
                    request.setNotificationVisibility(
                            DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
                    String fileName = URLUtil.guessFileName(url, contentDisposition, mimeType);
                    request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName);
                    DownloadManager dm = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
                    if (dm != null) {
                        dm.enqueue(request);
                        Toast.makeText(MainActivity.this,
                                R.string.download_started, Toast.LENGTH_SHORT).show();
                    }
                } catch (Exception e) {
                    openExternally(url); // DownloadManager unavailable → browser fallback
                }
            }
        });

        swipeRefresh.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                clearFailure();
                webView.reload();
            }
        });

        retryButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clearFailure();
                webView.reload();
            }
        });

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
        } else {
            String url = HOME_URL;
            Intent intent = getIntent();
            // Deep links (https://teka-nexus.vercel.app/...) open that exact page.
            if (intent != null && Intent.ACTION_VIEW.equals(intent.getAction())
                    && intent.getData() != null) {
                url = intent.getData().toString();
            }
            webView.loadUrl(url);
        }
    }

    private boolean isInternalUrl(@NonNull Uri uri) {
        String scheme = uri.getScheme();
        String host = uri.getHost() == null ? "" : uri.getHost();
        return "https".equals(scheme)
                && (SITE_HOST.equals(host) || host.endsWith("." + SITE_HOST));
    }

    private void openExternally(String url) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
        } catch (ActivityNotFoundException ignored) {
            // No app can handle this scheme — silently drop it.
        }
    }

    private void showFailure() {
        mainFrameFailed = true;
        errorView.setVisibility(View.VISIBLE);
        webView.setVisibility(View.INVISIBLE);
        swipeRefresh.setRefreshing(false);
    }

    private void clearFailure() {
        if (!mainFrameFailed) return;
        mainFrameFailed = false;
        errorView.setVisibility(View.GONE);
        webView.setVisibility(View.VISIBLE);
    }

    private class TekaWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(@NonNull WebView view,
                                                @NonNull WebResourceRequest request) {
            Uri uri = request.getUrl();
            String scheme = uri.getScheme() == null ? "" : uri.getScheme();
            if ("https".equals(scheme) || "http".equals(scheme)) {
                if (isInternalUrl(uri)) return false; // our site → in-app
                openExternally(uri.toString());       // other sites → browser
                return true;
            }
            // mailto:, tel:, intent:… → hand to the system
            openExternally(uri.toString());
            return true;
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            swipeRefresh.setRefreshing(false);
        }

        @Override
        public void onReceivedError(WebView view, WebResourceRequest request,
                                    WebResourceError error) {
            if (request.isForMainFrame()) showFailure();
        }

        @Override
        public boolean onRenderProcessGone(WebView view, RenderProcessGoneDetail detail) {
            // Self-heal: a renderer crash must never become an app "Force Close".
            recreate();
            return true;
        }
    }

    private class TekaWebChromeClient extends WebChromeClient {
        @Override
        public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback,
                                         FileChooserParams params) {
            if (fileUploadCallback != null) fileUploadCallback.onReceiveValue(null);
            fileUploadCallback = callback;
            try {
                startActivityForResult(params.createIntent(), FILE_CHOOSER_REQUEST);
            } catch (ActivityNotFoundException e) {
                fileUploadCallback = null;
                return false;
            }
            return true;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == FILE_CHOOSER_REQUEST) {
            Uri[] results = null;
            if (resultCode == RESULT_OK && data != null && data.getData() != null) {
                results = new Uri[]{ data.getData() };
            }
            if (fileUploadCallback != null) {
                fileUploadCallback.onReceiveValue(results);
                fileUploadCallback = null;
            }
        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null && !mainFrameFailed && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onPause() {
        if (webView != null) webView.onPause();
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) webView.onResume();
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        if (webView != null) webView.saveState(outState);
    }

    @Override
    protected void onDestroy() {
        if (webView != null) webView.destroy();
        super.onDestroy();
    }
}
