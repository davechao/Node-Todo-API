const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo}= require('./models/todo');
const {User}= require('./models/user');
const {authenticate}= require('./middleware/authenticate');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.post('/todos', authenticate, async (req, res) => {
	try {
		const todo = new Todo({
			text: req.body.text,
			_creator: req.user._id
		});
		const doc = await todo.save();
		res.send(doc);
	} catch(e) {
		res.status(400).send(e);
	}
});

app.get('/todos', authenticate, async (req, res) => {
	try {
		const todo = await Todo.find({
			_creator: req.user._id
		});
		res.send(todo);
	} catch(e) {
		res.status(400).send(e);
	}
});

app.get('/todos/:id', authenticate, async (req, res) => {
	try {
		const id = req.params.id;
		const todo = await Todo.findById({
			_id: id,
			_creator: req.user._id
		});
		if(!todo) {
			return res.status(404).send();
		}
		res.send(todo);
	} catch(e) {
		res.status(400).send(e);
	}
});

app.delete('/todos/:id', authenticate, async (req, res) => {
	try {
		const id = req.params.id;
		const todo = await Todo.findOneAndRemove({
			_id: id,
			_creator: req.user._id
		});
		if(!todo) {
			return res.status(404).send();
		}
		res.send(todo);
	} catch(e) {
		return res.status(400).send();
	}
});

app.patch('/todos/:id', authenticate, async (req, res) => {
	try {
		const id = req.params.id;
		const body = _.pick(req.body, ['text', 'completed']);
		if(_.isBoolean(body.completed) && body.completed) {
			body.completedAt = new Date().getTime();
		} else {
			body.completed = false;
			body.completedAt = null;
		}
		const todo = await Todo.findOneAndUpdate({
			_id: id,
			_creator: req.user._id
		}, {$set: body}, {new: true});
		res.send(todo);
	} catch(e) {
		return res.status(400).send();
	}
});

app.post('/users', async (req, res) => {
	try {
		const body = _.pick(req.body, ['email', 'password']);
		const user = new User(body);
		await user.save()
		const token = await user.generateAuthToken();
		res.header('x-auth', token).send(user);
	} catch(e) {
		res.status(400).send(e);
	}
});

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

app.post('/users/login', async (req, res) => {
	try {
		const body = _.pick(req.body, ['email', 'password']);
		const user = await User.findByCredentials(body.email, body.password);
		const token = await user.generateAuthToken();
		res.header('x-auth', token).send(user);
	} catch(e) {
		res.status(400).send(e);
	}
})

app.delete('/users/me/token', authenticate, async (req, res) => {
	try {
		await User.removeToken(req.token)
		res.status(200).send();
	} catch(e) {
		res.status(400).send();
	}
});

app.listen(port, () => {
	console.log(`Started up at port ${port}`);
});
