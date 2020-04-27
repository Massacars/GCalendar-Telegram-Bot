const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const userCommands = require('./users/commands');
const helper = require('./helper/helper');
const keyboards = require('./keyboards/keyboards');
const buttons = require('./keyboards/keyboards_buttons');

module.exports = () => {
	bot.onText(/\/ping/, msg => {
		console.log('Output: msg', msg);
		bot.sendMessage(msg.chat.id, `Chat data: ${JSON.stringify(msg, null, 2)}`);
	});

	bot.onText(/\/start/, msg => {
		if (helper.isPrivatChat(msg)) {
			const { from } = msg;
			bot.sendMessage(from.id, 'Hello!', {
				reply_markup: keyboards.mainKeyboard
			});
		}
	});

	bot.on('message', msg => {
		const { id } = msg.from;
		if (helper.isPrivatChat(msg)) {
			switch (msg.text) {
				case buttons.main.me:
					bot.sendMessage(id, 'Me menu:', {
						reply_markup: keyboards.meKeyboard
					});
					break;
				case buttons.main.calendars:
					bot.sendMessage(id, 'Calendars menu:', {
						reply_markup: keyboards.calendarsKeyboard
					});
					break;
				case buttons.main.settings:
					bot.sendMessage(id, 'Settings menu:', {
						reply_markup: keyboards.settingsKeyboard
					});
					break;
				case buttons.me.register:
					userCommands.registerUser(bot, msg);
					break;
				case buttons.me.info:
					userCommands.getUserInfo(bot, msg);
					break;
				case buttons.me.remove:
					userCommands.deleteUser(bot, msg);
					break;
				case 'Back':
					bot.sendMessage(id, 'Main menu:', {
						reply_markup: keyboards.mainKeyboard
					});
					break;
				default:
					break;
			}
		}
	});
};
