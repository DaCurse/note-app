import { Router } from 'express';
import createHttpError from 'http-errors';
import { getNoteByIdDTO, getNotesDTO, noteDTO } from '../dto/notes.js';
import validate from '../middleware/validate.js';
import {
  createNote,
  getNoteById,
  getNotes,
  updateNote,
} from '../services/notes.js';

const router = Router();

router.get('/', validate(getNotesDTO, 'query'), async (req, res) =>
  res.json(await getNotes(req.query.limit))
);

router.get(
  '/:id',
  validate(getNoteByIdDTO, 'params'),
  async (req, res, next) => {
    const note = await getNoteById(req.params.id);
    if (note) {
      res.json(note);
    } else {
      next(createHttpError(404, 'Note not found'));
    }
  }
);

router.post('/', validate(noteDTO, 'body'), async (req, res) =>
  res.json(await createNote(req.body))
);

router.put(
  '/:id',
  validate(getNoteByIdDTO, 'params'),
  validate(noteDTO, 'body'),
  async (req, res) => res.json(await updateNote(req.params.id, req.body))
);

export const prefix = '/notes';
export { router };
