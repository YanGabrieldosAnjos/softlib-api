import { Schema, Types } from "mongoose";

const ObjectId = Types.ObjectId;

export const userSchema = new Schema(
  {
    _id: ObjectId,
    name: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: String,
  },
  { collection: "users", versionKey: false }
);

export const bookSchema = new Schema(
  {
    _id: ObjectId,
    title: String,
    author: String,
    isbn: {
      type: String,
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    synopsis: String,
    quantity: Number,
  },
  { collection: "books", versionKey: false }
);

export const bookRentSchema = new Schema(
  {
    _id: ObjectId,
    user: {
      type: ObjectId,
      ref: "users",
    },
    book: {
      type: ObjectId,
      ref: "books",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "book_rents", versionKey: false }
);
