import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import { Link } from 'react-router-dom';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: []
		}
		
		this.addNewTask = this.addNewTask.bind(this)
	}

	componentDidMount() {
		$.getJSON('http://localhost:3000/getTasks', (taskFromApi)=> {
			// console.log(studentsFromApi)
			for (let i = 0; i < taskFromApi.length; i++){
				taskFromApi[i].taskDate = taskFromApi[i].taskDate.slice(0,10)
			}
			this.setState({
				tasks: taskFromApi
			})
			console.log(this.state.tasks)
		});

	}

	addNewTask(event){
		event.preventDefault();
		var taskToAdd = document.getElementById('newTask').value
		var taskDate = document.getElementById('newTaskDate').value
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/addTask',
			data: {
				task: taskToAdd,
				date: taskDate
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

	render(){

		var theTaskArray = [];
		this.state.tasks.map((task,index) => {
			theTaskArray.push(<div key={index}>{task.taskName}
				<Link to={`/task/edit/${task.id}`}> |3d1t</Link>
				<Link to={`/task/delete/${task.id}`}> |D-1337</Link>
				</div>)
		});

		return(
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					HEY FUCK YOU...  Go do these things...
				</p>
				<form onSubmit={this.addNewTask}>
					<input type='text' id='newTask' />
					<input type='date' id='newTaskDate' />
					<button className='btn btn-primary' type='submit'>Add Task</button>
				</form>	
				<div className="App-intro container col-sm-12">
					{theTaskArray}
				</div>
			</div>
		)
	}
}

export default Home