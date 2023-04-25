import { rest } from 'msw'
interface User {
  id: number
  name: string
}
// 定义 mock 数据
let users: Array<User> = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' }
]

// 编写所有的 mock 请求处理函数
export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json(users))
  }),

  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params
    const user = users.find((u) => u.id === Number(id))

if (!user) {
  return res(ctx.status(404))
}

return res(ctx.json(user))
  }),

  rest.post('/api/users', (req, res, ctx) => {
    const user: any = req.body

if (!user) {
  return res(ctx.status(400))
}

const id = +new Date()
const newUser: User = {
  id: id,
  name: user.name
}

users.push(newUser)

return res(ctx.json(newUser))
  }),

  rest.put('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params
    const user = users.find((u) => u.id === Number(id))

if (!user) {
  return res(ctx.status(404))
}

const updatedUser: any = req.body

if (!updatedUser || !updatedUser.name) {
  return res(ctx.status(400))
}

user.name = updatedUser.name

return res(ctx.json(user))
  }),

  rest.delete('/api/users/:id', (req, res, ctx) => {
    const id = req.params
    users = users.filter((item) => item.id != Number(id.id))

return res(ctx.json(users))
  })
]
