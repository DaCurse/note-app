import { Router } from 'express';
import { getNotes } from '../services/notes.js';

const router = Router();

router.get('/', async (_req, res) => {
  res.json(await getNotes());
});

export const prefix = '/notes';
export { router };
