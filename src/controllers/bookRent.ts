import { bookRentModel, bookModel, userModel} from "../models";

export class BookRentController {
    async rentBook(userId: string, isbn: string ): Promise<string>{
        try{
            const bookToRent = await bookModel.findOne({isbn});
            const user = await userModel.findOne({_id: Object(userId)});
            const rentedBooks = await bookRentModel.find({user: user?._id}).populate("book", "isbn title quantity");
                        
            if(!bookToRent || bookToRent.quantity < 0 ){
                throw new Error("Livro em falta.")
            }
            
            if(rentedBooks.find(({book})=> book.isbn === bookToRent.isbn)){
                throw new Error("Usuário já alugou o livro.");    
            }
        
            await bookModel.update({_id: bookToRent._id}, {$inc: {quantity:  - 1}});
            await bookRentModel.insertMany({user, book: bookToRent});
            return bookToRent.title;
        }catch(error){
            throw error;
            
        }
    }
    
     async  devolutionBook(userId: string, isbn: string): Promise<string>{
        try{
            
            const bookToRent = await bookModel.findOne({isbn});
            const user = await userModel.findOne({_id: Object(userId)});
            const rentedBooks = await bookRentModel.find({user: user?._id, isDeleted: false}).populate("book", "isbn title quantity");
            
            if(!bookToRent || rentedBooks.length < 1){
                throw new Error("Todos os livros já foram devolvidos.");
            }
            
            const bookToDevolve = rentedBooks.find(({book})=> book.isbn === bookToRent.isbn);
            
            if(!bookToDevolve){
                throw new Error("Usuário não alugou o livro.");    
            }
            
            await bookModel.updateOne({_id: bookToRent._id}, {$inc: {quantity:  + 1}});
            await bookRentModel.updateOne({_id: bookToDevolve._id}, {isDeleted: true});
            
            return bookToRent.title;
        }catch(error){
            throw error;
        }
     }
}