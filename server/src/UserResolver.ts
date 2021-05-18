import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { compare, hash } from 'bcryptjs';
import { User } from './entity/User';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}
@Resolver()
export class UserResolvers {
  @Query(() => String)
  hello() {
    return 'hi';
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string,
  ) {

    try {
      const hashedPassword = await hash(password, 12);
      await User.insert({
        email,
        password: hashedPassword,
      })
      return true;
    } catch(err) {
      console.log('error', err);
      return false;
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string,
  ): Promise<LoginResponse> {

    const user = await User.findOne({where: { email }});

    if (!user) {
      throw new Error('could not find user');
    }

    const isValid = compare(password, user.password);

    if (!isValid) {
      throw new Error('bad password');
    }

    // login successful

    return {
      accessToken: '',
    };
  }
}