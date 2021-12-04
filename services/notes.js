import prisma from '../providers/prisma.js';

export function getNotes() {
  return prisma.notes.findMany();
}
