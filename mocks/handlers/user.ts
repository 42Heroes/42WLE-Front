import { rest } from 'msw';

export const getUser = rest.get('/user/:id', (req, res, ctx) => {
  const { id } = req.params;
  return res(ctx.json({ id }));
});
