import {action, computed} from 'mobx';
import {get} from 'axios';

export default class Leads {
    constructor(state){
        this.state = state;
    }
   
    @action async getLeads(){
        let token = this.state.account.token
        get('http://localhost:2000/api/leads/new',{
            headers: {
              'content-type': 'application/json',
              'token': token
            }
        }).then((response)=>{
            this.state.leads = response.data;
        }).catch((e)=>{
            this.state.error = {
                hide: false,
                type: 'error',
                msg: e.message || e
            }
        })
    }
    @action handleChange(obj){
        Object.keys(obj).forEach(key=>{
            this.state.leads[key] = obj[key];
        })
    }
    @action handleClick(id){
        const selected = this.state.leads.selected;
        const index = selected.indexOf(id);
        if(index !== -1){
            selected.splice(index, 1);
        } else {
            selected.push(id)
        }
        this.handleChange({selected})
    }
    isSelected(id){
        return this.state.leads.selected.indexOf(id) !== -1;
    }
}