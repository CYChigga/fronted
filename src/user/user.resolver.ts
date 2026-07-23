import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './user.input';
import { UserService } from './user.service';

// Code-First
/* @Mutation(() => LoginResult) 返回类型
    async login(@Args('email') email: string) {
     return this.userService.login(email, password);
   }
*/
// 调度User类型
@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}
  // 引用users字符串
  @Query('users')
  async getUsers() {
    return this.userService.findAll();
  }

  @Query('user')
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @Query('userByEmail')
  async getUserByEmail(@Args('email') email: string) {
    return this.userService.findByEmail(email);
  }
  // 增
  @Mutation('createUser')
  async create(@Args('createUserInput') input: CreateUserInput) {
    return this.userService.create(input);
  }
  // 删
  @Mutation('deleteUser')
  async remove(@Args('id', { type: () => Int }) id: number) {
    return this.userService.delete(id);
  }
  // 登录
  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.userService.login(email, password);
  }
}
