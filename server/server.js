var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true} );

var Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

var otherTodo = new Todo({
	text: true,
	completed: true
});

otherTodo.save().then((doc) => {
	console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
	console.log('Unable to save todo', e);
});


var User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
});

var user = new User({
	email: 'dave@gmail.com'
})

user.save().then((doc) => {
	console.log('User saved', doc);
}, (e) => {
	console.log('Unable to save user', e);
})









