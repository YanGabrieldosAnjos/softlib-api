import { Router, Request, Response} from "express";
import { INewUser, UserController } from "../controllers/user";
import * as jwt from "jsonwebtoken";
import {verifyJWT} from "../middlewares/auth";
const router = Router();

interface ILoginRequest {
    username: string,
    password: string
}
router.post("/login", async(req: Request, res: Response) => {
    const user = new UserController();
    
    try{
        const { username, password }: ILoginRequest = req.body;
        const userInfo = await user.login(username, password);
        const payload = userInfo._id;
        if(userInfo){
            const token =  jwt.sign({payload}, process.env.SECRET!, {
                expiresIn: 300
            });
            return res.json({auth: true, token})
        }
        return res.status(500).json({message: "login inválido!"});
    } catch(error){
        throw error;
    } 
});


router.post("/inserir", async(req: Request, res: Response) => {
    const user = new UserController();
    
    try{
        const userInfo: INewUser = req.body;
        res.status(201).send({name: await user.createUser(userInfo)});
    }catch(error){
        throw error;
    }
})

router.get("/livros", [verifyJWT], async( req: Request, res: Response) => {
    const user = new UserController();
    
    try{
        const {username}: INewUser = req.body;
        
        res.status(200).send(await user.listRentedBooks(username));
    }catch(error){
        throw error;
    }
});

export default router;