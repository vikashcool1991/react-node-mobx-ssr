import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'
import Dashboard from '../components/dashboard';
import Leads from '../components/leads';

export default [
  {
    path: '/',
    component: Login
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: `/leads/:action`,
    component: Leads
  },
  {
    path: '/logout',
    component: Logout
  },
]
