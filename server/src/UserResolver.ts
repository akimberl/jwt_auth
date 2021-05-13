import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { hash } from 'bcryptjs';
import { User } from './entity/User';

@Resolver()
export class UserResolvers {
  @Query(() => String)
  hello() {
    return 'hi';
  }

  @Mutation()
  async register(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string,
  ) {

    const hashedPassword = await hash(password, 12);
    await User.insert({
      email,
      password: hashedPassword,
    })
    return 
  }
}