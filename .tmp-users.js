const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.user.findMany({ where: { OR: [{ email: { contains: 'test' } }, { email: { contains: 'dma' } }, { email: { contains: 'dmb' } }] }, select: { email: true }, take: 6 }).then(r => { console.log(JSON.stringify(r)); process.exit(0); }).catch(e => { console.error(e.message.slice(0,120)); process.exit(1); });
