import React from 'react';
import {connect} from 'react-redux';

const renderIf = (test, component, alternative) => {
  return test ? component : alternative
}

class TaskForm extends React.Component{
 constructor(props) {
   super(props);
   this.state = this.props || {
     task: {
      name: '',
      _id: '',
      completed: false
     }
   }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleOnChange = this.handleOnChange.bind(this);
 }

 componentWillReceiveProps(props, nextState){
   console.log('PROPS IN WILL RECEIVE', props, nextState)
   // this.setState(nextState)
 }

 handleChange(e){
   let {name, value} = e.target;
   this.setState({[name]: value});
 };

 handleSubmit(e){
   e.preventDefault();
     this.props.handle(this.state);
     if (!this.props.task.name) this.setState({task:{name:''}})
 }

 handleOnChange(e){
   let task = Object.assign(this.state.task, {completed:!this.state.completed})
   this.setState({task}, () => {
    this.props.handle(this.state.task);
  });
  console.log('state in onChange button',this.state.task.completed);
 }
 
 render(){
   console.log("last try:::::::::", this.state)
   return(
     <div className='task-form-div'>
       <form
         onSubmit={this.handleSubmit}>
         <input    
           className={this.props.task ? "listInput" : "newInput"}
           id={this.state.task.completed ? "completedTask" : "incompleteTask"}
           type='text'
           name='name'
           placeholder='What needs to be done?'
           value={this.state.task.name}
           onChange={this.handleChange}
         />
         {
           renderIf(this.state.button,
            <button type='submit'> {this.state.button} </button>,
            <input id="checkBox" 
                   type="checkbox" 
                   onChange= {this.handleOnChange} 
                   checked = {this.state.task.completed}  
            />
           )
         }
       </form>
     </div>
   )
 }
}

export default TaskForm;