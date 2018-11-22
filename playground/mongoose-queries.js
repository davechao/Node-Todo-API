const {mongoose} = require('./../server/db/mongoose');
var {Todo}= require('./../server/models/todo');
var {User}= require('./../server/models/user');

var todoId = '5bf6b6a5f7320535b66aef42';
var userId = '5bf4267488e6bc236d54331f';

Todo.find({
	_id: todoId
}).then((todos) => {
	console.log('Todos', todos);
});

Todo.findOne({
	_id: todoId
}).then((todo) => {
	console.log('Todo', todo);
});

Todo.findById(todoId).then((todo) => {
	if(!todo) {
		return console.log('Todo Id not found');
	}
	console.log('Todo By Id', todo);
}).catch((e) => {
	console.log(e);
});

User.findById(userId).then((user) => {
	if(!user) {
		return console.log('Unable to find user');
	}
	console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
	console.log(e);
});