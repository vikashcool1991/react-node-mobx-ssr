import state from './State';
import {observable, action, computed} from 'mobx';

export default class Common {
  constructor(request, state){
    this.state = state;
  }
  @observable headerTitle = '';
  @observable drawerOpen = false;
  @action drawerOpenState(open){
    this.drawerOpen = open;
  }
  @action hideMessage(hide){
    this.state.error.hide = hide;
  }
  @computed get isDrawerOpen(){
    return this.drawerOpen;
  }
  @computed get header(){
    return this.headerTitle;
  }
  @action setHeader(title){
    this.headerTitle = title;
  }
  @action setTitle(newTitle) {
    state.common.title = newTitle;
  }
}
