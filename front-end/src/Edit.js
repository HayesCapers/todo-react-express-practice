import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskName: '',
			taskDate: ''
		}
		
		this.updateTask = this.updateTask.bind(this)
		this.updateInput = this.updateInput.bind(this)
	}

	componentDidMount() {
		var taskId = this.props.match.params.taskId;
		$.getJSON(`http://localhost:3000/editTask/${taskId}`, (taskData)=>{
			this.setState({
				taskName: taskData.taskName,
				taskDate: taskData.taskDate
			})
			console.log(this.state.taskName)
			console.log(this.state.taskDate)
		})
	}

	updateInput(event){
		console.log('thisran')
		event.preventDefault()
		var newTaskName = event.target.parentNode.childNodes[0].value
		var newTaskDate = event.target.parentNode.childNodes[1].value
		console.log(newTaskName)
		console.log(newTaskDate)
		this.setState({
			taskName: newTaskName,
			taskDate: newTaskDate
		})
	}

	updateTask(event){
		event.preventDefault()
		var taskId = this.props.match.params.taskId;
		var taskName = document.getElementById('task').value
		var taskDate = document.getElementById('taskDate').value
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/updateTask',
			data: {
				taskId: taskId,
				taskDate: taskDate,
				taskName: taskName
			}
		}).done((data)=>{
			// console.log(this.props.history)
			this.props.history.push('/');
		})
	}

	render(){
		var taskName = this.state.taskName
		var taskDate = this.state.taskDate
		return(
			<div className='container'>
				<h1>3d1t T4sk</h1>
				<form onSubmit={this.updateTask}>
					<input type="text" id='task' onChange={this.updateInput} value={this.state.taskName} />
					<input type="date" id='taskDate' onChange={this.updateInput} value={this.state.taskDate} />
					<button className="btn btn-primary" type='submit'>Update</button>
				</form>
			</div>
		)
	}
}

export default Edit