import prisma from '../providers/prisma.js';

export function getNotes(limit) {
  return prisma.note.findMany({ take: limit });
}

export function getNoteById(id) {
  return prisma.note.findUnique({
    where: {
      note_id: id,
    },
  });
}

export function createNote(noteDTO) {
  return prisma.note.create({ data: noteDTO });
}

export function updateNote(id, noteDTO) {
  return prisma.note.update({
    where: {
      note_id: id,
    },
    data: noteDTO,
  });
}
