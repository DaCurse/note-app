import { Router } from 'express';
import createHttpError from 'http-errors';
import validate from '../middleware/validate.js';
import {
  getNoteByIdSchema,
  getNotesSchema,
  noteDTOSchema,
} from '../schemas/notes.js';
import {
  createNote,
  getNoteById,
  getNotes,
  updateNote,
} from '../services/notes.js';

const router = Router();

router.get('/', validate(getNotesSchema, 'query'), async (req, res) =>
  res.json(await getNotes(req.query.limit))
);

router.get(
  '/:id',
  validate(getNoteByIdSchema, 'params'),
  async (req, res, next) => {
    const note = await getNoteById(req.params.id);
    if (note) {
      res.json(note);
    } else {
      next(createHttpError(404, 'Note not found'));
    }
  }
);

router.post('/', validate(noteDTOSchema, 'body'), async (req, res) =>
  res.json(await createNote(req.body))
);

router.put(
  '/:id',
  validate(getNoteByIdSchema, 'params'),
  validate(noteDTOSchema, 'body'),
  async (req, res) => res.json(await updateNote(req.params.id, req.body))
);

export const prefix = '/notes';
export { router };
