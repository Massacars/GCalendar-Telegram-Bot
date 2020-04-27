const buttons = require('./keyboards_buttons');

module.exports = {
	mainKeyboard: {
		keyboard: [
			[buttons.main.events, buttons.main.calendars],
			[buttons.main.me, buttons.main.settings]
		],
		resize_keyboard: true
	},
	calendarsKeyboard: {
		keyboard: [
			[buttons.calendars.list, buttons.calendars.add],
			[buttons.calendars.back]
		],
		resize_keyboard: true
	},
	meKeyboard: {
		keyboard: [
			[buttons.me.register, buttons.me.remove],
			[buttons.me.info, buttons.me.back]
		],
		resize_keyboard: true
	},
	settingsKeyboard: {
		keyboard: [
			[buttons.settings.notifications, buttons.settings.amount],
			[buttons.settings.back]
		],
		resize_keyboard: true
	}
};
