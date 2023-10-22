import { Router } from 'express';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { validateRequestParams } from '../middleware/validateRequestParams';
import { bookValidation } from '../validations/bookValidation';
import { paramValidation } from '../validations/paramValidation';
import { listBooks, createBook, getBookById } from '../controllers/bookController';

const router = Router();

router.get('/', listBooks);
router.post('/', validateRequestBody(bookValidation.bookSchema), createBook);
router.get('/:id', validateRequestParams(paramValidation.id), getBookById);

export default router;
