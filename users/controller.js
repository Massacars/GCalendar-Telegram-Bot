const { UserModel } = require('./model');

const userController = {
	create(userData, cb) {
		const model = new UserModel(userData);
		model
			.save()
			.then(res => {
				cb(res);
			})
			.catch(err => {
				console.log('Output: create -> err', err);
			});
	},
	find(_tgid, cb) {
		UserModel.findOne({ _tgid: _tgid })
			.then(res => {
				cb(res);
			})
			.catch(err => {
				console.log('Output: find -> err', err);
			});
	},
	update(_tgid, updateQuery) {
		UserModel.updateOne({ _tgid: _tgid }, updateQuery)
			.then()
			.catch(err => {
				console.log('Output: create -> update', err);
			});
	},
	delete(_tgid, cb) {
		UserModel.deleteOne({ _tgid: _tgid })
			.then(res => {
				console.log('Output: delete -> res', res);
				cb(res);
			})
			.catch(err => {
				console.log('Output: create -> delete', err);
			});
	}
};

module.exports = userController;
