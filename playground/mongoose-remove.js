const {mongoose} = require('./../server/db/mongoose');
var {Todo}= require('./../server/models/todo');
var {User}= require('./../server/models/user');

var todoId = '5bf6b6a5f7320535b66aef42';
var userId = '5bf4267488e6bc236d54331f';

Todo.remove({}).then((result) => {
	console.log(result);
});

Todo.findOneAndRemove({_id: '5bf9431c4d4ad150cb01ee5f'}).then((todo) => {
	console.log(todo);
});

Todo.findByIdAndRemove('5bf9431c4d4ad150cb01ee5f').then((todo) => {
	console.log(todo);
});
