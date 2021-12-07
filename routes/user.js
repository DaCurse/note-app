import Prisma from '@prisma/client';
import { Router } from 'express';
import createHttpError from 'http-errors';
import { userDTO } from '../dto/user.js';
import validate from '../middleware/validate.js';
import { createUser } from '../services/user.js';

const router = Router();

router.post('/register', validate(userDTO, 'body'), async (req, res, next) => {
  try {
    res.json(await createUser(req.body));
  } catch (error) {
    // TODO: Refactor error handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          next(createHttpError(409, 'Username already exists'));
      }
    } else {
      next(createHttpError(500, error));
    }
  }
});

export const prefix = '/user';
export { router };
