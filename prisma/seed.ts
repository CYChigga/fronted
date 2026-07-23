import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env['DATABASE_URL'],
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter,
  log: ['query', 'error', 'info', 'warn'],
});

async function seed() {
  const SALT_ROUNDS = 10;
  const plainPassword = '123456';
  const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);

  // createMany 不支持逐行 hash，先统一哈希再批量插入
  await prisma.user.createMany({
    data: [
      { name: 'Zhang Wei', email: 'zhangwei@qq.com', password: hashedPassword },
      { name: 'Li Na', email: 'lina@qq.com', password: hashedPassword },
      { name: 'Wang Qiang', email: 'wangqiang@qq.com', password: hashedPassword },
      { name: 'Zhao Jing', email: 'zhaojing@qq.com', password: hashedPassword },
      { name: 'Chen Yu', email: 'chenyu@qq.com', password: hashedPassword },
    ],
    skipDuplicates: true,
  });

  console.log('Seed completed');
}

seed()
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
