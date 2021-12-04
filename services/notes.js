import prisma from '../providers/prisma.js';

const DEFAULT_LIMIT = 10;

export function getNotes(limit = DEFAULT_LIMIT) {
  return prisma.notes.findMany({ take: limit });
}

export function getNoteById(id) {
  return prisma.notes.findUnique({
    where: {
      note_id: id,
    },
  });
}
