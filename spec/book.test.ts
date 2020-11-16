import * as faker from "faker";
import { stringify } from "querystring";
import { IBookController } from "../src/controllers/book";
import { BookRest } from "./mocks/book";
import {  UserRest } from "./mocks/user";
describe("book", () => {
  let token: {auth: boolean, token: string} = {auth: false, token: ""};

  beforeAll(async () => {
    const userRest = new UserRest();
    const userInfo = {username: faker.random.word(), name: faker.random.word(), password: faker.random.word()};
    await userRest.postUser(userInfo);
    token = await userRest.loginUser(userInfo.username, userInfo.password);
    
  });
  test("create", async () => {
    const bookRest = new BookRest();

    const bookInfo: IBookController = {
      isbn: faker.random.uuid(),
      title: faker.random.word(),
      author: faker.random.word(),
      quantity: faker.random.number({ max: 10, min: 1 }),
      synopsis: faker.random.word(),
    };
    const title = await bookRest.postBook(bookInfo, token.token);
    console.log("test", title);

    expect(title).toBe(bookInfo.title);
  });
});
