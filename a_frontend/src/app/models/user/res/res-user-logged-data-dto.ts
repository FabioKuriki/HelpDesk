import { User } from "../user"

export type ResUserLoggedDataDTO = Pick<User, 'name' | 'email' | 'password' | 'profile' | 'createdAt'>