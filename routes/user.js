import { userDTO } from '../dto/user.js';
import validate from '../middleware/validate.js';
import { createUser, loginUser } from '../services/user.js';
import AsyncRouter from '../util/async-router.js';

const router = new AsyncRouter();

router.post('/register', validate(userDTO, 'body'), async (req, res) =>
  res.json(await createUser(req.body))
);

router.post('/login', validate(userDTO, 'body'), async (req, res) => {
  res.json({ token: await loginUser(req.body) });
});

export const prefix = '/user';
export { router };
