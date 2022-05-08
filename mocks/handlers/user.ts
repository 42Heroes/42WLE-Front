import { rest } from 'msw';

// [Get] fruits 서버 요청 시 [ '사과', '바나나' ]를 응답한다.
export const getUser = rest.get('/user/:id', (req, res, ctx) => {
  const { id } = req.params;
  return res(ctx.json({ id }));
});
