import prisma from '../providers/prisma.js'

export function getNotes(limit) {
  return prisma.note.findMany({ take: limit })
}

export function getNoteById(id) {
  return prisma.note.findUnique({
    where: {
      noteId: id,
    },
  })
}

export function createNote(noteDTO) {
  return prisma.note.create({ data: noteDTO })
}

export function updateNote(id, noteDTO) {
  return prisma.note.update({
    where: {
      noteId: id,
    },
    data: noteDTO,
  })
}
