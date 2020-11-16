import { IBook, bookModel, bookRentModel } from "../models";

export interface IBookController {
  title: string;
  isbn: string;
  author: string;
  quantity: number;
  synopsis: string;
}

export interface IBookFilter {
  title: string | null;
  isbn: string | null;
  author: string | null;
}

export class BookController {
  async createBook(book: IBookController): Promise<string> {
    try {
      const { title } = await bookModel.insertMany({ ...book });
      return title;
    } catch (error) {
      throw new Error("Não foi possível cadastrar livro.");
    }
  }

  async getBooks(): Promise<IBookController[]> {
    try {
      return bookModel.find();
    } catch (error) {
      throw new Error("Não foram encontrado livros.");
    }
  }

  async updateBook(isbn: string, book: IBookController) {
    try {
      const bookToUpdate = await bookModel.findOne({ isbn });

      if (!bookToUpdate) {
        throw new Error("Livro não cadastrado no sistema. ");
      }

      const rents = await bookRentModel.find({ book: bookToUpdate });

      if (rents.length > 0) {
        throw new Error("Esse livro já foi alugado.");
      }
      if (bookToUpdate.quantity <= 0) {
        throw new Error("Livro indisponível para edição no momento.");
      }
      if (bookToUpdate.isDeleted) {
        throw new Error("Esse livro foi deletado.");
      }

      return bookModel.updateOne({ _id: bookToUpdate._id }, book);
    } catch (error) {
      throw error;
    }
  }

  async deleteBook(isbn: string) {
    try {
      const bookToDelete = await bookModel.findOne({ isbn });

      if (!bookToDelete) {
        throw new Error("Livro não cadastrado no sistema. ");
      }

      const rents = await bookRentModel.find({ book: bookToDelete });

      if (rents.length > 0) {
        throw new Error("Esse livro já foi alugado.");
      }
      if (bookToDelete.quantity <= 0) {
        throw new Error("Livro indisponível para deleção no momento.");
      }

      return bookModel.updateOne(
        { _id: bookToDelete._id },
        { isDeleted: true }
      );
    } catch (error) {
      throw error;
    }
  }
  async filterBooks(filter: IBookFilter): Promise<IBookController[]> {
    try {
      const query = [];
      if (filter.author) {
        query.push({
          author: { $regex: `.*${filter.author}.*`, $options: "i" },
        });
      }

      if (filter.isbn) {
        query.push({ isbn: { $regex: `.*${filter.isbn}.*`, $options: "i" } });
      }

      if (filter.title) {
        query.push({ title: { $regex: `.*${filter.title}.*`, $options: "i" } });
      }
      return bookModel.find({ $or: query });
    } catch (error) {
      throw new Error("Não foi possível encontrar o livro.");
    }
  }
}
