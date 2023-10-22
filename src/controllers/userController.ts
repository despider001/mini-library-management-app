import { Request, Response, NextFunction } from 'express';
import { Book } from '../entities/Book';
import { User } from '../entities/User';
import { Borrowing } from '../entities/Borrowing';
import CustomError from '../utils/CustomError';
import { AppDataSource } from '../config/dbConfig';
import { IsNull } from 'typeorm';


export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find({ select: ['id', 'name'] });
        res.status(200).json(users);
    } catch (error) {
        next(new CustomError(500, "Error retrieving users"));
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = userRepository.create(req.body);
        await userRepository.save(user);
        res.status(201).send("");
    } catch (error) {
        next(new CustomError(500, "Error creating user"));
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: {
                id: Number(req.params.id)
            },
            relations: ["borrowings", "borrowings.book"]
        });

        if (user) {
            const pastBooks = user.borrowings
                .filter(borrowing => borrowing.returned_date !== null)
                .map(borrowing => ({
                    name: borrowing.book.name,
                    userScore: borrowing.score
                }));

            const presentBooks = user.borrowings
                .filter(borrowing => borrowing.returned_date === null)
                .map(borrowing => ({
                    name: borrowing.book.name
                }));

            const response = {
                id: user.id,
                name: user.name,
                books: {
                    past: pastBooks,
                    present: presentBooks
                }
            };

            res.status(200).json(response);
        } else {
            next(new CustomError(404, "User not found"));
        }
    } catch (error) {
        next(new CustomError(500, "Error retrieving user"));
    }
};



export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, bookId } = req.params;

    const userRepository = AppDataSource.getRepository(User);
    const bookRepository = AppDataSource.getRepository(Book);
    const borrowingRepository = AppDataSource.getRepository(Borrowing);

    // Fetch the user and book based on IDs
    const user = await userRepository.findOne({
        where: {
            id: Number(userId)
        }
    });
    const book = await bookRepository.findOne({
        where: {
            id: Number(bookId)
        }
    });

    // Validate existence
    if (!user || !book) {
        return next(new CustomError(404, "User or Book not found"));
    }

    // Check if the book is already borrowed and not yet returned by any user
    const existingBorrowing = await borrowingRepository.findOne({
        where: {
            book_id: book.id,
            returned_date: IsNull()
        }
    });
    if (existingBorrowing) {
        return next(new CustomError(400, "Book already borrowed"));
    }

    // Create a new Borrowing entry
    const borrowing = new Borrowing();
    borrowing.user = user;
    borrowing.book = book;
    borrowing.borrowed_date = new Date();
    borrowing.returned_date = null; // initially null as the book hasn't been returned

    await borrowingRepository.save(borrowing);

    res.status(200).send(null);
};


export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, bookId } = req.params;
    const { score } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const bookRepository = AppDataSource.getRepository(Book);
    const borrowingRepository = AppDataSource.getRepository(Borrowing);

    // Fetch the user and book based on IDs
    const user = await userRepository.findOne({ where: { id: Number(userId) } });
    const book = await bookRepository.findOne({ where: { id: Number(bookId) } });

    if (!user || !book) {
        return next(new CustomError(404, "User or Book not found"));
    }

    // Find the existing borrowing record for the given user and book where the returned_date is null
    const borrowing = await borrowingRepository.findOne({
        where: {
            user_id: user.id,
            book_id: book.id,
            returned_date: IsNull()
        }
    });

    if (!borrowing) {
        return next(new CustomError(400, "Book not borrowed by user or already returned"));
    }

    // Update the borrowing record
    borrowing.returned_date = new Date();  // Set the return date to now
    borrowing.score = score;  // Update the score

    await borrowingRepository.save(borrowing);

    res.status(200).send(null)
};



