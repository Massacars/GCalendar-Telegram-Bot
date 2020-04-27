const userController = require('./controller');

const userCommands = {
	registerUser(bot, msg) {
		const { from } = msg;
		const userData = {
			_tgid: from.id,
			firstName: from.first_name,
			lastName: from.last_name,
			username: `@${from.username}`
		};
		userController.find(from.id, res => {
			if (res === null) {
				userController.create(userData, res => {
					if (res !== null) {
						bot.sendMessage(
							msg.chat.id,
							`User ${from.first_name} added successfuly!`
						);
					}
				});
			} else {
				bot.sendMessage(msg.chat.id, `User ${from.first_name} already added!`);
			}
		});
	},
	getUserInfo(bot, msg) {
		const { id } = msg.from;
		userController.find(id, res => {
			if (res === null) {
				bot.sendMessage(
					msg.chat.id,
					`User ${msg.from.first_name} not found. Plz hit register button first!`
				);
			} else {
				const text = `tgid: ${res.id}\nfirstName: ${res.firstName}\nlastName: ${res.lastName}\nusername: ${res.username}`;
				bot.sendMessage(msg.chat.id, text, { parse_mode: 'markdown' });
			}
		});
	},
	deleteUser(bot, msg) {
		const { from } = msg;
		userController.delete(from.id, res => {
			if (res.n > 0) {
				bot.sendMessage(
					msg.chat.id,
					`User ${from.first_name} removed successfuly!`
				);
			} else {
				bot.sendMessage(
					msg.chat.id,
					`User ${from.first_name} not found. Press Register button first!`
				);
			}
		});
	}
	// updateUser(bot, msg) {

	// }
};

module.exports = userCommands;
// module.exports = bot => {
// 	// Users operations

// 	bot.onText(/Info/, msg => {
// 		if (msg.chat.type === 'private') {
// 			const from = msg.from;

// 			userController.find(from.id, res => {
// 				if (res === null) {
// 					bot.sendMessage(
// 						msg.chat.id,
// 						`User ${from.first_name} not found. Plz hit register button first!`
// 					);
// 				} else {
// 					const text = `tgid: ${res.id}\nfirstName: ${res.firstName}\nlastName: ${res.lastName}\nusername: ${res.username}`;
// 					bot.sendMessage(msg.chat.id, text, { parse_mode: 'markdown' });
// 				}
// 			});
// 		}
// 	});

// 	bot.onText(/Register/, msg => {
// 		if (msg.chat.type === 'private') {
// 			const from = msg.from;
// 			const userData = {
// 				_tgid: from.id,
// 				firstName: from.first_name,
// 				lastName: from.last_name,
// 				username: `@${from.username}`
// 			};
// 			userController.find(from.id, res => {
// 				if (res === null) {
// 					userController.create(userData, res => {
// 						if (res !== null) {
// 							bot.sendMessage(
// 								msg.chat.id,
// 								`User ${from.first_name} added successfuly!`
// 							);
// 						}
// 					});
// 				} else {
// 					bot.sendMessage(
// 						msg.chat.id,
// 						`User ${from.first_name} already added!`
// 					);
// 				}
// 			});
// 		}
// 	});

// 	bot.onText(/Remove/, msg => {
// 		if (msg.chat.type === 'private') {
// 			const from = msg.from;
// 			userController.delete(from.id, res => {
// 				if (typeof res !== 'undefined' && res.n > 0) {
// 					bot.sendMessage(
// 						msg.chat.id,
// 						`User ${from.first_name} removed successfuly!`
// 					);
// 				} else {
// 					bot.sendMessage(
// 						msg.chat.id,
// 						`User ${from.first_name} not found. Press Register button first!`
// 					);
// 				}
// 			});
// 		}
// 	});

// 	bot.onText(/\/add_calendar (.*)/, (msg, match) => {
// 		if (msg.chat.type === 'private') {
// 			const from = msg.from;
// 			userController.find(from.id, res => {
// 				if (res !== null) {
// 					const calendarsArr = res.calendars;
// 					if (calendarsArr.length !== 0) {
// 						const thisCalendar = calendarsArr.filter(calendar => {
// 							return calendar === match[1];
// 						});
// 						if (thisCalendar.length === 0) {
// 							userController.update(from.id, {
// 								$push: { calendars: match[1] }
// 							});
// 							bot.sendMessage(msg.chat.id, 'Calendar added');
// 						} else {
// 							bot.sendMessage(msg.chat.id, 'Calendar already added');
// 						}
// 					} else {
// 						userController.update(from.id, {
// 							$push: { calendars: match[1] }
// 						});
// 						bot.sendMessage(msg.chat.id, 'Calendar added');
// 					}
// 				} else {
// 					bot.sendMessage(
// 						msg.chat.id,
// 						`User ${from.first_name} not found. User /start command!`
// 					);
// 				}
// 			});
// 		}
// 	});

// 	// Create
// 	// const userData = {
// 	// 	_tgid: 12,
// 	// 	firstName: 'Ruslan',
// 	// 	secondName: 'Massacars',
// 	// 	username: '@massacars',
// 	// 	active: true
// 	// };
// 	// userController.create(userData, res => {
// 	// 	console.log('Output: res', res);
// 	// });
// 	// Check
// 	// userController.find(11, (err, status) => {
// 	// 	console.log('Output: err', err);query
// 	// Update
// 	// const data = {
// 	// 	firstName: 'Vatman',
// 	// 	secondName: 'Massacars',
// 	// 	username: '@vatman',
// 	// 	active: false
// 	// };
// 	// userController.update(12, data, res => {
// 	// 	console.log('Output: res', res);
// 	// });
// 	// Delete
// 	// userController.delete(125, res => {
// 	// 	console.log('Output: res', res);
// 	// });
// 	// };
// };
