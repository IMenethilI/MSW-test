import { rest } from 'msw';

// 定义 mock 数据
const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' },
];

// 编写所有的 mock 请求处理函数
export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json(users));
  }),

  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      return res(ctx.status(404));
    }

    return res(ctx.json(user));
  }),

  rest.post('/api/users', (req, res, ctx) => {
    const user = req.json;

    if (!user || !user.name) {
      return res(ctx.status(400));
    }

    const id = users.length > 0 ? Math.max(...users.map((u) => u.id), 0) + 1 : 1;
    const newUser = { id, ...user };
    users.push(newUser);

    return res(ctx.json(newUser));
  }),

  rest.put('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      return res(ctx.status(404));
    }

    const updatedUser = req.json;

    if (!updatedUser || !updatedUser.name) {
      return res(ctx.status(400));
    }

    user.name = updatedUser.name;

    return res(ctx.json(user));
  }),

  rest.delete('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    const userIndex = users.findIndex((u) => u.id === Number(id));

    if (userIndex === -1) {
      return res(ctx.status(404));
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    return res(ctx.json(deletedUser));
  }),
];

