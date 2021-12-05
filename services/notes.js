import prisma from '../providers/prisma.js';

export function getNotes(limit) {
  return prisma.notes.findMany({ take: limit });
}

export function getNoteById(id) {
  return prisma.notes.findUnique({
    where: {
      note_id: id,
    },
  });
}

export function createNote(noteDTO) {
  return prisma.notes.create({ data: noteDTO });
}
