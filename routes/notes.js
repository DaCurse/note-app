import { getNoteByIdDTO, getNotesDTO, noteDTO } from '../dto/notes.js';
import validate from '../middleware/validate.js';
import {
  createNote,
  getNoteById,
  getNotes,
  updateNote,
} from '../services/notes.js';
import AsyncRouter from '../util/async-router.js';

const router = new AsyncRouter();

router.get('/', validate(getNotesDTO, 'query'), async (req, res) =>
  res.json(await getNotes(req.query.limit))
);

router.get('/:id', validate(getNoteByIdDTO, 'params'), async (req, res) =>
  res.json(await getNoteById(req.params.id))
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
