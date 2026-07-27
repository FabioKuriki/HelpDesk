import { Comment } from "../comment";

export type ResListCommentDTO = Pick<Comment, 'author' | 'text' | 'createdAt'>