import { Router } from 'express';
import validate from '../middleware/validate.js';
import {
  getNoteByIdSchema,
  getNotesSchema,
  noteDTOSchema,
} from '../schemas/notes.js';
import { createNote, getNoteById, getNotes } from '../services/notes.js';

const router = Router();

router.get('/', validate(getNotesSchema, 'query'), async (req, res) =>
  res.json(await getNotes(req.query.limit))
);

router.get('/:id', validate(getNoteByIdSchema, 'params'), async (req, res) =>
  res.json(await getNoteById(req.params.id))
);

router.post('/', validate(noteDTOSchema, 'body'), async (req, res) =>
  res.json(await createNote(req.body))
);

export const prefix = '/notes';
export { router };
