import argon2 from 'argon2';
import HttpErrors from 'http-errors';
import prisma from '../providers/prisma.js';

const { Conflict, InternalServerError, Unauthorized } = HttpErrors;

export async function createUser(userDTO) {
  const { username, password } = userDTO;
  const passwordHash = await argon2.hash(password);
  try {
    return await prisma.user.create({
      select: { userId: true },
      data: { username, passwordHash },
    });
  } catch (error) {
    if (error?.code === 'P2002') {
      throw new Conflict('Username already exists');
    }
    throw InternalServerError();
  }
}

export async function loginUser(userDTO) {
  const { username, password } = userDTO;
  const user = await prisma.user.findUnique({
    where: { username },
    select: { passwordHash: true },
  });
  if (!user) {
    throw new Unauthorized('Invalid credentials');
  }
  const isValid = await argon2.verify(user.passwordHash, password);
  if (!isValid) {
    throw new Unauthorized('Invalid credentials');
  }
  // TODO: return jwt
}
