// TEKA NEXUS — GET/POST /api/os/shop  (Task 19-e)
// TEKA COIN SHOP: profile frames, titles and buddy skins bought with coins.
// Equip state lives on UserItem.equipped / User.title and is surfaced to the
// chrome by /api/os/session — this route never touches the session route.

import { z } from "zod";

import { db } from "@/lib/db";
import { fail, handle, ok, parseBody, requireUser } from "@/lib/server";
import { awardCoins, logActivity } from "@/lib/os/economy";

export const dynamic = "force-dynamic";

// ─── Catalog ─────────────────────────────────────────────────

type ShopItem = {
  itemKey: string;
  type: "frame" | "title" | "skin";
  price: number;
  name: { en: string; fa: string };
  /** Color hex for frames, italic label seed for titles, emoji for skins. */
  preview: string;
};

const SHOP_ITEMS: ShopItem[] = [
  // Frames
  { itemKey: "frame:cyan", type: "frame", price: 80, name: { en: "Cyan Halo", fa: "هاله فیروزه‌ای" }, preview: "#22d3ee" },
  { itemKey: "frame:violet", type: "frame", price: 80, name: { en: "Violet Halo", fa: "هاله بنفش" }, preview: "#a78bfa" },
  { itemKey: "frame:ember", type: "frame", price: 80, name: { en: "Ember Halo", fa: "هاله آتشین" }, preview: "#fbbf24" },
  { itemKey: "frame:gold", type: "frame", price: 240, name: { en: "Gold Halo", fa: "هاله طلایی" }, preview: "#fde047" },
  {
    itemKey: "frame:legendary", type: "frame", price: 600,
    name: { en: "Legendary Halo", fa: "هاله افسانه‌ای" },
    preview: "conic", // animated rainbow ring in the UI
  },
  // Titles
  { itemKey: "title:pixel", type: "title", price: 120, name: { en: "Pixel Forger", fa: "پیکسل‌ور" }, preview: "italic" },
  { itemKey: "title:debugger", type: "title", price: 150, name: { en: "Midnight Debugger", fa: "دیباگر نیمه‌شب" }, preview: "italic" },
  { itemKey: "title:async", type: "title", price: 200, name: { en: "Async Whisperer", fa: "زمزمه‌گر ناهمگام" }, preview: "italic" },
  // Skins
  { itemKey: "skin:gold", type: "skin", price: 300, name: { en: "Golden Buddy", fa: "همراه طلایی" }, preview: "🐉" },
  { itemKey: "skin:ghost", type: "skin", price: 350, name: { en: "Ghost Buddy", fa: "همراه شبح" }, preview: "👻" },
];

// ─── GET: wallet + owned items + catalog ─────────────────────

export async function GET() {
  return handle(async () => {
    const user = await requireUser();

    const [fresh, owned] = await Promise.all([
      db.user.findUnique({ where: { id: user.id }, select: { coins: true } }),
      db.userItem.findMany({ where: { userId: user.id }, orderBy: { createdAt: "asc" } }),
    ]);

    return ok({
      coins: fresh?.coins ?? 0,
      owned: owned.map((o) => ({ itemKey: o.itemKey, equipped: o.equipped })),
      catalog: SHOP_ITEMS,
    });
  });
}

// ─── POST: buy / equip ───────────────────────────────────────

const postSchema = z.object({
  action: z.enum(["buy", "equip"]),
  itemKey: z.string().min(1),
});

export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = await parseBody(req, postSchema);

    const item = SHOP_ITEMS.find((i) => i.itemKey === body.itemKey);
    if (!item) return fail("Item not found.", 404);

    const ownedItem = await db.userItem.findUnique({
      where: { userId_itemKey: { userId: user.id, itemKey: item.itemKey } },
    });

    // ── Buy ──
    if (body.action === "buy") {
      if (ownedItem) return fail("ALREADY_OWNED", 400);

      const fresh = await db.user.findUnique({ where: { id: user.id }, select: { coins: true } });
      if ((fresh?.coins ?? 0) < item.price) return fail("NOT_ENOUGH", 400);

      // Ledger first (validates balance again at the source), then the item row.
      await awardCoins(user.id, -item.price, `shop:${item.itemKey}`);
      await db.userItem.create({ data: { userId: user.id, itemKey: item.itemKey } });

      // Titles auto-equip on purchase: User.title drives the OS chrome.
      if (item.type === "title") {
        await db.user.update({ where: { id: user.id }, data: { title: item.name.fa } });
      }

      await logActivity(user.id, "shop", { item: item.itemKey });
      const after = await db.user.findUnique({ where: { id: user.id }, select: { coins: true } });
      return ok({ bought: true, coins: after?.coins ?? 0 });
    }

    // ── Equip ──
    if (!ownedItem) return fail("NOT_OWNED", 400);

    if (item.type === "title") {
      await db.user.update({ where: { id: user.id }, data: { title: item.name.fa } });
    } else {
      const prefix = item.type === "frame" ? "frame:" : "skin:";
      await db.userItem.updateMany({
        where: { userId: user.id, itemKey: { startsWith: prefix } },
        data: { equipped: false },
      });
      await db.userItem.update({ where: { id: ownedItem.id }, data: { equipped: true } });
    }

    await logActivity(user.id, "shop", { equip: item.itemKey });
    return ok({ equipped: true });
  });
}
