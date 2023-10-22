import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class Borrowing {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    borrowed_date!: Date;

    @Column({ type: 'date', nullable: true })
    returned_date!: Date | null;

    @Column({ nullable: true })
    score!: number;  // renamed from user_rating to score

    @Column()
    user_id!: number;

    @Column()
    book_id!: number;

    @ManyToOne(() => User, user => user.borrowings)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => Book, book => book.borrowings)
    @JoinColumn({ name: "book_id" })
    book!: Book;
}
