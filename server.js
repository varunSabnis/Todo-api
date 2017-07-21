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
    var queryparams = req.query;
	var filteredtodos = todos;
	if(queryparams.hasOwnProperty('completed') && queryparams.completed==='true')
    {
       filteredtodos = _.where(todos,{'completed' : true});

    }
    if(queryparams.hasOwnProperty('completed') && queryparams.completed==='false')
    {
    	filteredtodos = _.where(todos,{'completed': false});
    }

	res.json(filteredtodos);
});
app.get('/todos/:id',function(req,res){
	
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
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
app.delete('/todos/:id',function(req,res){
    var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	if(!matchedTodo)
    {
    	res.status(404).json({"error":"no todo found with that id"});
    }
    else
    {
    	todos = _.without(todos,matchedTodo);
    	res.json(matchedTodo);
	    console.log('Successfully removed');
	}
});
app.put('/todos/:id',function(req,res){
var body = _.pick(req.body,'description','completed');
var validAttributes = {};
 var todoId = parseInt(req.params.id,10);
var matchedTodo = _.findWhere(todos, {id: todoId});
if(!matchedTodo)
{
  return res.status(404).json({"error":"no todo found with that id"});
}
 
  if(body.hasOwnProperty('completed') && _.isBoolean(body.completed))
  {
   validAttributes.completed=body.completed;
   
  }
  else if(body.hasOwnProperty('completed')) 
  {
	res.status(400).send('Invalid Update');
  }

 if(body.hasOwnProperty('description')&& _.isString(body.description)&&body.description.trim().length >0)
 {
	validAttributes.description=body.description;

 }
 else if(body.hasOwnProperty('description'))
 {
  return res.status(400).send('Invalid update');	
  }
   matchedTodo = _.extend(matchedTodo, validAttributes);
   res.json(matchedTodo);
});

app.listen(PORT,function(){
  console.log('App listening at port ' + PORT);
});