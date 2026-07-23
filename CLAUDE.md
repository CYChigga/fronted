# NestJS + GraphQL + Prisma 后端项目

## 项目概述

这是一个学习项目，目标是掌握 NestJS 框架中集成 Prisma 连接 PostgreSQL 数据库，并使用 GraphQL 实现前后端通信。

## 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | NestJS | 11 |
| ORM | Prisma | 7.8 |
| 数据库 | PostgreSQL (Neon Serverless) | — |
| 接口 | GraphQL (Apollo Server) | 5.x |
| 语言 | TypeScript | 5.7 |

## 目录结构

```
NestJS/
├── prisma/
│   ├── schema.prisma      # 数据库模型定义
│   ├── seed.ts            # 种子数据
│   └── migrations/        # 迁移文件
├── src/
│   ├── main.ts            # 入口，启动 NestJS
│   ├── app.module.ts      # 根模块，GraphQL 配置
│   ├── app.controller.ts  # REST 接口（对比用，非必需）
│   ├── prisma.service.ts  # Prisma 数据库服务
│   └── user/
│       ├── user.graphql       # Schema-First：手写 SDL
│       ├── user.input.ts      # GraphQL 输入类型
│       ├── user.resolver.ts   # GraphQL 解析器
│       ├── user.service.ts    # 业务逻辑层
│       └── user.module.ts     # 用户模块
├── .env                  # 数据库连接串
├── prisma.config.ts      # Prisma 配置
└── package.json
```

## 架构分层

```
请求 → Resolver（接收参数、转发） → Service（业务逻辑） → Prisma（数据库）
        user.resolver.ts               user.service.ts        prisma.service.ts
```

- **Resolver 不碰数据库**，只负责接收 GraphQL 参数和返回结果
- **Service 封装 Prisma 操作**，处理业务逻辑
- **PrismaService 管理连接**，使用 pg Pool + adapter 适配 Neon

## GraphQL 配置

- **方式**：Schema-First（手写 `.graphql` 文件）
- **Schema 文件**：`src/user/user.graphql`
- **配置位置**：`src/app.module.ts` 的 `GraphQLModule.forRoot()`
- **自动生成**：`typePaths` 扫描 `.graphql`，`definitions` 生成 `src/graphql.schema.ts`
- **调试**：`playground: true`，启动后访问 `http://localhost:3000/graphql`

## 数据库

- **类型**：Neon Serverless PostgreSQL
- **连接**：pg Pool + @prisma/adapter-pg
- **当前模型**：User (id, name, email, password)
- **修改 Schema 后**：`npx prisma db push` 同步数据库

## 端口

| 服务 | 端口 |
|------|------|
| NestJS 后端 | 3000 |
| Vite 前端 | 5173 |

## 当前 User 模型

```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
}
```

## 已实现的 GraphQL 接口

```graphql
type Query {
  users: [User!]!
  user(id: Int!): User
}

type Mutation {
  createUser(createUserInput: CreateUserInput!): User!
  deleteUser(id: Int!): User!
}
```

## 开发约定

- 前端和后端是独立项目，分别启动
- 后端 Schema 变更后需重启 `pnpm start:dev`
- Prisma schema 变更后需 `npx prisma db push` 同步
- 种子数据：`npx ts-node prisma/seed.ts`
