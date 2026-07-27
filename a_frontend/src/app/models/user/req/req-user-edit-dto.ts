import { User } from "../user"

export type ReqUserEditDTO = Pick<User, 'name' | 'email' | 'password'>