import React from 'react';

const renderIf = (test, component, alternative) => {
  return test ? component : alternative
}

class TaskForm extends React.Component{
 constructor(props) {
   super(props);
   this.state = {
     name:this.props.name || '',
     completed:this.props.completed || false,
     groupID:this.props.groupID || '1',
     taskID:this.props._id || '',
     competedBy:this.props.userID || ''
   }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleOnChange = this.handleOnChange.bind(this);
 }

 componentWillReceiveProps(props){
  //  console.log('PROPS IN WILL RECEIVE', props)
   this.setState(props)
 }

 handleChange(e){
   let {name, value} = e.target;
   this.setState({[name]: value});
 };

 handleSubmit(e){
   e.preventDefault();
    console.log('in submit to post a task, this.state::::',this.state)
    //  this.setState()
     this.props.handle(this.state);
     if (!this.props.name) this.setState({name:''})
 }

 handleOnChange(e){
  //  console.log('this.props.userID ', this.props.userID);
   let task = Object.assign(this.state, {completed:!this.state.completed, completedBy:this.props.userID})
   this.setState({task}, () => {
     console.log("State after the checkbox is checked:  ", this.state)
    this.props.handle(this.state);
  });
  // console.log('state in onChange button',this.state.task.completed);
 }
 
 render(){
  //  console.log("props from tasksQueue::::", this.state)
   return(
     <div className='task-form-div'>
       <form
         onSubmit={this.handleSubmit}>
         <input    
           className={this.props.name ? "listInput" : "newInput"}
           id={this.state.completed ? "completedTask" : "incompleteTask"}
           type='text'
           name='name'
           placeholder='What needs to be done?'
           value={this.state.name}
           onChange={this.handleChange}
         />
         {
           renderIf (!this.props.name,
            <button type='submit'> {this.props.button} </button>,
            <input id="checkBox" 
                   type="checkbox" 
                   onChange= {this.handleOnChange} 
                   checked = {this.state.completed}  
            />
           )
         }
       </form>
     </div>
   )
 }
}

export default TaskForm;