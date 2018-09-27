import React from 'react'
import { observer, inject } from 'mobx-react'
import Sidebar from './Sidebar';
import Message from './Message';

@inject('store')
@observer
class Menu extends React.Component {
  render() {
    const { store } = this.props
    return (
      <div>
        <Message />
        {store.account.isLoggedIn
          ? <Sidebar/>
          : null
        }
      </div>
    )
  }
}

export default Menu
