 import { Router } from "express";
 import user from "./user";
 import book from "./book";
 import bookRent from "./bookRent";

 const routes = Router()

 routes.use("/usuario", user);
 routes.use("/livro", book);
 routes.use("/aluguel", bookRent);
 
 
 export default routes;
