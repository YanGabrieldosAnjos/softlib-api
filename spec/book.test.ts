import * as faker from "faker";
import { stringify } from "querystring";
import { isExpressionStatement } from "typescript";
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

    expect(title).toBe(bookInfo.title);
  });
  
  test("get", async () => {
    const bookRest = new BookRest();
    
    const bookRange = faker.random.number({max:5, min:1});
    
    Array(bookRange).forEach(async i => {
      const bookInfo: IBookController = {
        isbn: faker.random.uuid(),
        title: faker.random.word(),
        author: faker.random.word(),
        quantity: faker.random.number({ max: 10, min: 1 }),
        synopsis: faker.random.word(),
      };
      await bookRest.postBook(bookInfo, token.token);
      
    });
    const books = await bookRest.getBooks(token.token);
    expect(books.length).toBeLessThanOrEqual(5);
    expect(books.length).toBeGreaterThanOrEqual(1);
  })
  
  test("filter", async () => {
    const bookRest = new BookRest();
    
    const bookRange = faker.random.number({max:5, min:1});
    const insertedBooks: IBookController[] = [];
    Array(bookRange).forEach(async i => {
      const bookInfo: IBookController = {
        isbn: faker.random.uuid(),
        title: faker.random.word(),
        author: faker.random.word(),
        quantity: faker.random.number({ max: 10, min: 1 }),
        synopsis: faker.random.word(),
      };
      await bookRest.postBook(bookInfo, token.token);
      insertedBooks.push(bookInfo);
    });
      
      insertedBooks.map(async  book => {
        const booksfiltered = await bookRest.filterBooks(token.token, {isbn: book.isbn, title: null, author: null});
        expect(booksfiltered).toBeGreaterThanOrEqual(1);
      });
  })
});
