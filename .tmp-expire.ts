import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const id = process.argv[2];
  await db.academyExam.update({ where: { id }, data: { expiresAt: new Date(Date.now() - 1000) } });
  console.log("backdated");
  await db.$disconnect();
}
main();
