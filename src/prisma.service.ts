import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// 适配器
import { PrismaPg } from '@prisma/adapter-pg';
// 数据库连接池
import { Pool } from 'pg';

// 连接数据库
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const pool = new Pool({
      connectionString: process.env['DATABASE_URL'],
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }
}
