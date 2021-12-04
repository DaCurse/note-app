import { Router } from 'express';
import validate from '../middleware/validate.js';
import { getNoteByIdSchema, getNotesSchema } from '../schemas/notes.js';
import { getNoteById, getNotes } from '../services/notes.js';

const router = Router();

router.get('/', validate(getNotesSchema, 'query'), async (req, res) =>
  res.json(await getNotes(req.query.limit))
);

router.get('/:id', validate(getNoteByIdSchema, 'params'), async (req, res) =>
  res.json(await getNoteById(req.params.id))
);

export const prefix = '/notes';
export { router };
