const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
	if(err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID('5bf17876be4015ae8f351793')
	}, {
		$set: {
			completed: true
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5bf16612d5de8c10f0861a28')
	}, {
		$set: {
			name: 'Android'
		},
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	client.close();
});