import prisma from '../providers/prisma.js'

export function getNotes(userId, limit) {
  return prisma.note.findMany({ where: { userId }, take: limit })
}

export function getNoteById(userId, id) {
  return prisma.note.findFirst({
    where: {
      userId,
      id,
    },
  })
}

export function createNote(userId, noteDTO) {
  return prisma.note.create({
    data: {
      user: {
        connect: { id: userId },
      },
      ...noteDTO,
    },
  })
}

export async function updateNote(userId, id, noteDTO) {
  // TODO: See if there is a way to do this in one query
  await prisma.note.findFirst({
    where: {
      id,
      userId,
    },
  })

  return prisma.note.update({
    where: {
      id,
    },
    data: noteDTO,
  })
}
