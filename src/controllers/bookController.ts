import { Request, Response, NextFunction } from 'express';
import { Book } from '../entities/Book';
import CustomError from '../utils/CustomError';
import { AppDataSource } from '../config/dbConfig';

export const listBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookRepository = AppDataSource.getRepository(Book);
        const books = await bookRepository.find({ select: ['id', 'name'] });
        res.status(200).json(books);
    } catch (error) {
        next(new CustomError(500, "Error retrieving books"));
    }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookRepository = AppDataSource.getRepository(Book);
        const book = bookRepository.create({ name: req.body.name });
        await bookRepository.save(book);
        res.status(201).send(null);
    } catch (error) {
        next(new CustomError(500, "Error creating book"));
    }
};

interface BookWithScore extends Book {
    score?: any; 
}

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookRepository = AppDataSource.getRepository(Book);

        // Fetch book and average score
        const bookWithScore: BookWithScore | null | undefined = await bookRepository
            .createQueryBuilder("book")
            .leftJoin("book.borrowings", "borrowing")
            .select(["book.id", "book.name"])
            .addSelect("COALESCE(AVG(borrowing.score), -1)", "score")
            .where("book.id = :id", { id: req.params.id })
            .groupBy("book.id")
            .getRawOne();

        if (bookWithScore && bookWithScore.score) {
            bookWithScore.score = bookWithScore.score == -1 ? -1 : parseFloat(bookWithScore.score).toFixed(2);
            res.status(200).json(bookWithScore);
        } else {
            next(new CustomError(404, "Book not found"));
        }
    } catch (error) {
        next(new CustomError(500, "Error retrieving book"));
    }
};
