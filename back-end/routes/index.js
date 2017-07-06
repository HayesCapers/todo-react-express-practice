var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'x',
	password: 'x',
	database: 'todo'
});

connection.connect()


router.get('/getTasks', function(req, res, next) {
	connection.query('SELECT * FROM tasks',(error,results)=>{
		console.log(results)
		if (error) throw error;
		res.json(results);
	})
	// res.json({
	// 	students: [
	// 		'Marissa',
	// 		'Merilee',
	// 		'Chris',
	// 		'Stephen',
	// 		'Shane',
	// 		'Chad',
	// 		'Yingrong',
	// 		'Drew'
	// 	]
	// })
});

router.post('/addTask', (req,res)=>{
	var taskName = req.body.task
	var taskDate = req.body.date
	var insertQuery = 'INSERT INTO tasks (taskName,taskDate) VALUE (?,?)'
	connection.query(insertQuery,[taskName,taskDate],(error,result)=>{
		if (error) throw error;
		connection.query('SELECT * FROM tasks',(error2,result2)=>{
			if (error) throw error2;
			res.json(result2);
		});
	});
});

router.get('/leetMaster/:taskId', (req,res)=>{
	var taskId = req.params.taskId;
	var query = `SELECT * FROM tasks WHERE id=${taskId}`
	connection.query(query,(error,results)=>{
		if (results.length === 0){
			res.json({msg: 'no result'})
		}else{
			res.json(results[0])
		}	
	})
})

router.post('/deleteTask', (req,res)=>{
	var taskId = req.body.taskId
	connection.query(`DELETE FROM tasks WHERE id=${taskId}`,(error,results)=>{
		if (error)throw error;
		res.json({
			msg: 'success'
		})
	})
})

router.get('/editTask/:taskId', (req,res)=>{
	var taskId = req.params.taskId;
	var query = `SELECT * FROM tasks WHERE id=${taskId}`
	connection.query(query,(error,results)=>{
		if (results.length === 0){
			res.json({msg: 'no result'})
		}else{
			res.json(results[0])
		}	
	})
})

router.post('/updateTask', (req,res)=>{
	var taskId = req.body.taskId
	var taskDate = req.body.taskDate
	var taskName = req.body.taskName
	connection.query(`UPDATE tasks SET taskName=?, taskDate=? WHERE id=?`,[taskName,taskDate,taskId],(error,results)=>{
		if (error)throw error;
		res.json({
			msg: 'success'
		})
	})
})

module.exports = router;
