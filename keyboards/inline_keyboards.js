module.exports = {
	meKeyboard: {
		inline_keyboard: [
			[{ text: 'Info', callback_data: 'info' }],
			[{ text: 'Register', callback_data: 'register' }],
			[{ text: 'Remove', callback_data: 'stop' }]
		],
		resize_keyboard: true
	}
};
