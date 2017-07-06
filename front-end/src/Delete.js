import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';

class Delete extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskData: {},
		}
		this.confirmDelete = this.confirmDelete.bind(this);
		this.m4st3rB4t3r = this.m4st3rB4t3r.bind(this);
		
	}

	componentDidMount() {
		var taskId = this.props.match.params.taskId;
		$.getJSON(`http://localhost:3000/leetMaster/${taskId}`, (taskData)=>{
			this.setState({ taskData })
		})
	}

	confirmDelete(event) {
		var taskId = this.props.match.params.taskId;
		$.ajax({
			method: 'POST',
			url: 'http://localhost:3000/deleteTask',
			data: {
				taskId: taskId
			}
		}).done((data)=>{
			// console.log(this.props.history)
			this.props.history.push('/');
		})
	}

	m4st3rB4t3r() {

	}

	render(){
		
		return(
			<div className='container'>
				<h1>This is the D-1337 Page</h1>
				<h2> Are you sure you are El1t3 H4M 69?</h2>
				<h4> If yes, you won't {this.state.taskData.taskName} today. You fat fuck. </h4>
				<button onClick={this.confirmDelete} className='btn btn-danger'>YES!</button>
				<button onClick={this.m4st3rB4t3r} className='btn btn-warning'>Maybe...</button>
			</div>
		)
	}
}

export default Delete