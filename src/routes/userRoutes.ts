import { Router } from 'express';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { validateRequestParams } from '../middleware/validateRequestParams';
import { userSchema } from '../validations/userValidation';
import { paramValidation } from '../validations/paramValidation';
import { borrowBook, returnBook } from '../controllers/userController';
import { bookValidation } from '../validations/bookValidation';
import { listUsers, createUser, getUserById } from '../controllers/userController';

const router = Router();

router.get('/', listUsers);
router.post('/', validateRequestBody(userSchema), createUser);
router.get('/:id', validateRequestParams(paramValidation.id), getUserById);

// borrow book
router.post('/:userId/borrow/:bookId', validateRequestParams(paramValidation.userIdAndBookId), borrowBook);

// return book
router.post('/:userId/return/:bookId', validateRequestParams(paramValidation.userIdAndBookId), validateRequestBody(bookValidation.returnBookSchema), returnBook);


export default router;
