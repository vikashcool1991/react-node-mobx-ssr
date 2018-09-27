import React from 'react'
import { observer, inject } from 'mobx-react'
import AddTodo from '../components/home/AddTodo'
import Todo from '../components/home/Todo'
import Login from './Login';

@inject('state')
@observer
class Home extends React.Component {

  // When route is loaded (isomorphic)
  static async onEnter({ state, store }, params) {
    state.common.title = 'Home'
    await store.todos.browse()
  }

  render() {
    const { state } = this.props
    return (
      <main>
      </main>
    )
  }
}


export default Home
