import { Document, createConnection, set } from "mongoose";
const { NODE_ENV } = process.env;
import config from "./config";
import * as s from "./schemas";

export const mongoOptions = config.MONGO_OPTIONS;

const uri = config.DB_URI;

export let conn = createConnection(uri!, mongoOptions);

conn.on("error", console.log.bind(console, "Erro ao conectar"));
conn.once("open", console.log.bind(console, "Conexão estabelecida"));

set("useCreateIndex", true);

export interface IUser extends Document {
  username: string;
  name: string;
  password: string;
}

export interface IBook extends Document {
  author: string;
  title: string;
  isbn: string;
  quantity: number;
  isDeleted: boolean;
  synopsis: string;
}
export interface IBookRent extends Document {
  book: IBook;
  user: IUser;
  isDeleted: boolean;
}
export const userModel = conn.model<IUser>("users", s.userSchema);
export const bookModel = conn.model<IBook>("books", s.bookSchema);
export const bookRentModel = conn.model<IBookRent>(
  "book_rents",
  s.bookRentSchema
);
