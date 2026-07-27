import { User } from "../user"

export type ReqUserLoginDTO = Pick<User, 'email' | 'password'>
