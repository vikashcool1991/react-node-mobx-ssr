import Router from 'koa-router'
import authorize from './middleware/authorize'
import * as account from './routes/account'
import * as todos from './routes/todos'
import * as leads from './routes/leads'

const router = new Router({
    prefix: '/api'
})

router.get('/todos', todos.getTodos)
router.post('/todos/add', todos.addTodos)
router.post('/todos/remove', authorize, todos.removeTodos)
router.get('/account/logout', account.logout)
router.post('/account/login', account.login)
router.post('/account/register', account.register)
router.get('/leads/:type', authorize, leads.getLeads)

export default router
