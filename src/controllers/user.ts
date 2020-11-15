import {bookRentModel, IBook, IUser, userModel} from "../models";
import * as bcrypt from "bcrypt";
import { BookRentController } from "./bookRent";



export interface INewUser {
    name: string;
    username: string;
    password: string;
} 

export class UserController{
    

    async createUser(user : INewUser): Promise<string> {
        try{
            const cryptedPassword =  await bcrypt.hash(user.password, 10);
            const { name } = await userModel.insertMany({...user, password: cryptedPassword});
            return name;
        }catch(error){
            throw new Error("Não foi possível cadastrar novo usuário.");
        }
    }
    
    async login(username: string, password: string): Promise<IUser>{
        try{
            const [user] = await userModel.find({username});
        
            if(!await bcrypt.compare(password, user.password)){
                throw new Error("Não encontrado.");
            }
            return  user;
        }catch(error){
            throw error;
        }
    }
    
    async listRentedBooks(username: string): Promise<IBook[]>{
        try{            
            const user = await userModel.findOne({username});
            if(!user){
                throw new Error("Usuário inexistente.");
            }
            const booksRented = await bookRentModel.find({$and: [{user}, {isDeleted: true}]}).populate("book isbn title quantity");
            return booksRented.map(({book}) => book );
        }catch(error){
            throw error;
        }
    }
}

