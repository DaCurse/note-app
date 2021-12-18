import argon2 from 'argon2'
import HttpErrors from 'http-errors'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import prisma from '../providers/prisma.js'

const { Conflict, InternalServerError, Unauthorized } = HttpErrors

export async function createUser(userDTO) {
  const { username, password } = userDTO
  const passwordHash = await argon2.hash(password)
  try {
    return await prisma.user.create({
      select: { id: true },
      data: { username, passwordHash },
    })
  } catch (error) {
    if (error?.code === 'P2002') {
      throw new Conflict('Username already exists')
    }
    throw InternalServerError()
  }
}

async function createToken(userId, secret, expiresIn) {
  const data = { userId }
  return await promisify(jwt.sign)(data, secret, { expiresIn })
}

export async function loginUser(userDTO) {
  const { username, password } = userDTO
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true, passwordHash: true },
    rejectOnNotFound: false,
  })
  if (!user) {
    throw new Unauthorized('Invalid credentials')
  }
  const isValid = await argon2.verify(user.passwordHash, password)
  if (!isValid) {
    throw new Unauthorized('Invalid credentials')
  }
  return await createToken(user.id, process.env.JWT_SECRET, process.env.JWT_TTL)
}

export async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true },
  })
}
