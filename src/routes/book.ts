import { Router, Request, Response } from "express";
import { verifyJWT } from "../middlewares/auth";
import {
  BookController,
  IBookController,
  IBookFilter,
} from "../controllers/book";
const router = Router();

router.post("/inserir", verifyJWT, async (req: Request, res: Response) => {
  const book = new BookController();
  
  try {
    const bookInfo: IBookController = req.body;
    
    res.status(201).send({title: await book.createBook(bookInfo)});
  } catch (error) {
    throw error;
  }
});

router.get("/", [verifyJWT], async (req: Request, res: Response) => {
  const book = new BookController();
  try {
    res.status(200).send(await book.getBooks());
  } catch (error) {
    throw error;
  }
});

router.get("/filtrar", [verifyJWT], async (req: Request, res: Response) => {
  const book = new BookController();
  try {
    const filter: IBookFilter = req.body;
    res.status(200).send(await book.filterBooks(filter));
  } catch (error) {
    throw error;
  }
});

router.put("/", [verifyJWT], async (req: Request, res: Response) => {
  const book = new BookController();
  try {
    const bookInfo: IBookController = req.body;
    await book.updateBook(bookInfo.isbn, bookInfo)
    res.status(200).send({status: "livro atualizado com sucesso!"});
  } catch (error) {
    throw error;
  }
});

router.delete("/", [verifyJWT], async (req: Request, res: Response) => {
  const book = new BookController();
  try {
    const bookInfo: IBookController = req.body;
    await book.deleteBook(bookInfo.isbn)
    res.status(200).send({status: "livro deletado com sucesso!"});
  } catch (error) {
    throw error;
  }
});
export default router;
