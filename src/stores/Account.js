import {action, computed} from 'mobx'
import {size, find} from 'lodash'
import {get} from 'axios';
export default class Account {

  constructor(request, state) {
    this.request = request
    this.state = state
  }

  @computed get isLoggedIn() {
    return !!(this.state.account.username)
  }

  @action find(username) {
    return find(this.state.account.users, { username })
  }

  @action login(params) {
    this.request.post('api/account/login', params).then(account => {
      this.state.account = account
    }).catch(e => {
      this.state.error = {
        hide: false,
        type: 'error',
        msg: e.message || e
      }
    })
  }

  @action logout() {
    let token = this.state.account.token
    get('http://localhost:2000/api/account/logout',{
      headers: {
        'content-type': 'application/json',
        'token': token
      }
    })
    this.state.account.username = null
    this.state.account.token = null
  }

  @action register(params) {
    return this.request.post('api/account/register', params).then(account => {
      this.state.account = account
    })
  }
}

