import Prisma from '@prisma/client';
import HttpErrors from 'http-errors';

const prisma = new Prisma.PrismaClient({
  rejectOnNotFound: (error) => new HttpErrors.NotFound(error.message),
});

export default prisma;
