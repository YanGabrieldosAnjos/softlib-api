import request from "supertest";
import { IBookController } from "../../src/controllers/book";
import * as app from "../../src/index";

export class BookRest {
  async postBook(book: IBookController, token: string): Promise<string> {
    const res = await request(app.default)
      .post("/api/livro/inserir")
      .set("auth", token)
      .send(book);
      
    console.log(res.status);
    const title: string = res.body.title;
    return title;
  }
}
