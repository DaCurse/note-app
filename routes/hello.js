import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.end('Hello, World!');
});

export const prefix = '/hello';
export { router };
