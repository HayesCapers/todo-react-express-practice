import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
	super(props);
	this.state = {
	  theClass: []
	}

	this.addStudent = this.addStudent.bind(this)
  }

  componentDidMount() {
  	$.getJSON('http://localhost:3000/getStudents', (studentsFromApi)=> {
  		// console.log(studentsFromApi)
  		this.setState({
  		theClass: studentsFromApi
  		})
  	});

  }

  addStudent(event) {
  	var studentToAdd = event.target.parentNode.childNodes[0].value
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
  		url: 'http://localhost:3000/addStudent',
  		data: {name: studentToAdd}
  	}).done((studentsArray)=>{
  		this.setState({
  			theClass: studentsArray
  		})
  	})
  }

  render() {

	var theClassArray = [];
	this.state.theClass.map((student,index) => {
	  theClassArray.push(<li key={index}>{student.name}</li>)
	});

	return (
	  <div className="App">
		<div className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h2>Welcome to React</h2>
		</div>
		<p className="App-intro">
			To get started, edit <code>src/App.js</code> and save to reload.
		</p>
		<div className='add-box'>
			<input type='text' id='newStudent' />
			<button onClick={this.addStudent}>Add Student</button>
		</div>	
		<p className="App-intro">
			{theClassArray}
		</p>
	  </div>
	);
  }
}

export default App;
