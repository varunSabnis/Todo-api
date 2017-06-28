var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [];

var todoNextId = 1;

app.use(bodyParser.json());
app.get('/', function(req,res){
   res.send('TODO API root');
});

app.get('/todos',function(req,res){
	res.json(todos);
});
app.get('/todos/:id',function(req,res){
	
	var todoid = parseInt(req.params.id,10);
	var matchedTodo = _.findwhere(todos, {id: todoId});
    if(matchedTodo){
    	res.json(matchedTodo);
    }
    else
    {
    	res.status(404).send();
    }
});
app.post('/todos',function(req,res){

	var body = _.pick(req.body,'description','completed');
	if(!_.isBoolean(body.completed) || !_.isString(body.description)|| body.description.trim().length ===0)
	{
		return res.status(400).send();
	}
     body.description=body.description.trim();	
  
	console.log('Description :' + body.description);
	body.id=todoNextId;
	todoNextId++;
    todos.push(body);
	res.send(body);

});
app.listen(PORT,function(){
  console.log('App listening at port ' + PORT);
});