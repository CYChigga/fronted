// InputType定义前端传过来的参数结构用于TS类型校验
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: '用户名不能为空' })
  name!: string;

  @Field()
  @IsEmail({}, { message: '邮箱格式不正确' })
  email!: string;

  @Field()
  @MinLength(6, { message: '密码至少6位' })
  password!: string;
}
