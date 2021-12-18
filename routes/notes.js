import UserStrategy from '../auth/user.js'
import { getNoteByIdDTO, getNotesDTO, noteDTO } from '../dto/notes.js'
import authenticate from '../middleware/authenticate.js'
import validate from '../middleware/validate.js'
import {
  createNote,
  getNoteById,
  getNotes,
  updateNote,
} from '../services/notes.js'
import AsyncRouter from '../util/async-router.js'

const router = new AsyncRouter()
router.use(authenticate(UserStrategy, { session: false }))

router.get('/', validate(getNotesDTO, 'query'), async (req, res) =>
  res.json(await getNotes(req.user.userId, req.query.limit))
)

router.get('/:id', validate(getNoteByIdDTO, 'params'), async (req, res) =>
  res.json(await getNoteById(req.user.userId, req.params.id))
)

router.post('/', validate(noteDTO, 'body'), async (req, res) =>
  res.json(await createNote(req.user.userId, req.body))
)

router.put(
  '/:id',
  validate(getNoteByIdDTO, 'params'),
  validate(noteDTO, 'body'),
  async (req, res) =>
    res.json(await updateNote(req.user.userId, req.params.id, req.body))
)

export const prefix = '/notes'
export { router }
