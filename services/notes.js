import prisma from '../providers/prisma.js';

export function getNotes() {
  return prisma.notes.findMany();
}

export function getNoteById(id) {
  return prisma.notes.findUnique({
    where: {
      note_id: id,
    },
  });
}
