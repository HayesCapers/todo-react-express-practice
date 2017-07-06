import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import Home from './Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Delete from './Delete';
import Edit from './Edit'

class Todo extends Component {
  constructor(props) {
	super(props);
	

	this.addTask = this.addTask.bind(this)
  }

  

  addTask(event) {
  	var TaskToAdd = event.target.parentNode.childNodes[0].value
  	var TaskDate = event.target.parentNode.childNodes[1].value
  	// or do it this way
  	// var studentToAdd = document.getElementById('newStudent')
  	// console.log(studentToAdd)
  	// ajax request takes an obj that needs to say how to send (method), where to send (url)
  	// and what to send (data)
  	// $.ajax is a promise whic has a 'done' method that will run 
  	// whener the ajax request returns
  	// in this case, we update state to cause a re-render of the list of students
  	$.ajax({
  		method: 'POST',
  		url: 'http://localhost:3000/addTask',
  		data: {
  			task: TaskToAdd,
  			date: TaskDate
  		}
  	}).done((taskArray)=>{
  		for (let i = 0; i < taskArray.length; i++){
  			taskArray[i].taskDate = taskArray[i].taskDate.slice(0,10)
  		}
  		this.setState({
  			tasks: taskArray
  		})
  	})
  }

  	render() {

		return(
			<Router>
				<div>
					<Route exact path='/' component={Home} />
					<Route exact path='/task/delete/:taskId' component={Delete} />
					<Route exact path='/task/edit/:taskId' component={Edit} />
				</div>
			</Router>
		)
	}		
}

export default Todo;
