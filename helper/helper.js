module.exports = {
	isPrivatChat(msg) {
		return msg.chat.type === 'private' ? true : false;
	},
	checkEnvVars(env) {
		return ['BOT_TOKEN', 'MONGO_DB', 'ADMIN', 'NODE_ENV'].some((element) => {
			return env[element] === '' || env[element] === undefined;
		});
	},
};
