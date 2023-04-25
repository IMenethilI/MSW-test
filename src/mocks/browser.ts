import { setupWorker } from 'msw'
import { handlers } from './handlers'

// 创建一个 Mock Service Worker 实例
const server = setupWorker(...handlers)
// 导出 server 对象
export { server }
