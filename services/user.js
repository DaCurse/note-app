import argon2 from 'argon2';
import prisma from '../providers/prisma.js';

export async function createUser(userDTO) {
  const { username, password } = userDTO;
  const passwordHash = await argon2.hash(password);
  return prisma.user.create({
    select: { userId: true },
    data: { username, passwordHash },
  });
}
