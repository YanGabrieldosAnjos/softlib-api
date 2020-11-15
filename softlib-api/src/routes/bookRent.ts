import { Router, Request, Response} from "express";
import { BookRentController } from "../controllers/bookRent";
import {verifyJWT} from "../middlewares/auth";

const router = Router();
interface IBookRentRequest{
    userId: string,
    isbn: string,
}
router.post("/aluguel",[verifyJWT], async(req: Request, res: Response) => {
    const bookRent = new BookRentController();
    
    try{
        const {userId, isbn}: IBookRentRequest = req.body;
        
        res.status(201).send(await bookRent.rentBook(userId, isbn));
        
    } catch(error){
        throw error;
    } 
});

router.post("/devolucao",[verifyJWT], async(req: Request, res: Response) => {
    const bookRent = new BookRentController();
    
    try{
        const {userId, isbn}: IBookRentRequest = req.body;
        
        res.status(200).send(await bookRent.devolutionBook(userId, isbn));
        
    } catch(error){
        throw error;
    } 
});