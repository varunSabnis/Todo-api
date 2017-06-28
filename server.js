var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
	id: 1,
	description: 'Practice coding!',
	completed: false
}, {
	id: 2,
	description: 'Read C++',
	completed: false
}];

app.get('/', function(req,res){
   res.send('TODO API root');
});

app.get('/todos',function(req,res){
	res.json(todos);
});
app.get('/todos/:id',function(req,res){
	
	var todoid = parseInt(req.params.id,10);
	var matchedTodo;
	todos.forEach(function(todo){
      if(todoid===todo.id)
      {
         matchedTodo=todo;
      }
	});
    if(matchedTodo){
    	res.json(matchedTodo);
    }
    else
    {
    	res.status(404).send();
    }
});
app.listen(PORT,function(){
  console.log('App listening at port ' +PORT);
});