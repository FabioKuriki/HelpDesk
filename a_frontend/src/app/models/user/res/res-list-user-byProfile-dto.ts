import { User } from "../user";

export type ResListUserByProfileDTO = Pick<User, 'id' | 'name' | 'email'>