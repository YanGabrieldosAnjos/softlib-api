import { Document, createConnection, set } from "mongoose";
const { MONGO_USER, MONGO_PASSWORD, DB_NAME, DB_URI } = process.env;

import * as s from "./schemas";

export const mongoOptions = {
  user: MONGO_USER,
  pass: MONGO_PASSWORD,
  useNewUrlParser: true,
  dbName: DB_NAME,
  authSource: "admin",
};

const uri = DB_URI;
const conn = createConnection(uri!, mongoOptions);

conn.on("error", console.log.bind(console, "Erro ao conectar"));
conn.once("open", console.log.bind(console, "Conexão estabelecida"));

set("useCreateIndex", true);

export interface IUser extends Document {
  username: string,
  name: string,
  password: string
}

export interface IBook extends Document {
  author: string,
  title: string,
  isbn: string, 
  quantity: number,
  isDeleted: boolean,
  synopsis: string,
}
export interface IBookRent extends Document {
  book: IBook;
  user: IUser;
  isDeleted: boolean;
}
export const userModel = conn.model<IUser>("users", s.userSchema);
export const bookModel = conn.model<IBook>("books", s.bookSchema);
export const bookRentModel = conn.model<IBookRent>("book_rents", s.bookRentSchema);