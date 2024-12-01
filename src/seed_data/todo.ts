import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const tasks = ['牛乳を買いに行く', '部屋の掃除をする', '実家へ電話をかける'];

  await Promise.all(
    tasks.map((task) => {
      return prisma.task.create({
        data: {
          title: task,
        },
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
