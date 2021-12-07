import argon2 from 'argon2';
import HttpErrors from 'http-errors';
import prisma from '../providers/prisma.js';

const { Conflict, InternalServerError } = HttpErrors;

export async function createUser(userDTO) {
  const { username, password } = userDTO;
  const passwordHash = await argon2.hash(password);
  try {
    return await prisma.user.create({
      select: { userId: true },
      data: { username, passwordHash },
    });
  } catch (error) {
    console.log('123');
    if (error?.code === 'P2002') {
      throw new Conflict('Username already exists');
    }
    throw InternalServerError();
  }
}
