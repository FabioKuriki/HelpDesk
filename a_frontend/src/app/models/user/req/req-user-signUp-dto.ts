import { User } from "../user"

export type ReqUserSignUpDTO = Pick<User, 'name' | 'email' | 'password' | 'profile'>
