exports.run = (message, args, client, ops) => {
	var guildID = message.guild.id;
	delete require.cache[require.resolve(`../data/guildConfigs/${guildID}-config.json`)];
	const SpefGuilJCnf = require(`../data/guildConfigs/${guildID}-config.json`)
	// const SpefGuilJCnf = ops.SpefGuilJCnf
	const roleID = SpefGuilJCnf.roleid
	const channelID = SpefGuilJCnf.channelid
	const passconfig = SpefGuilJCnf.passconfig
	if(passconfig===true) return message.channel.send("You need to use the setup command");
	var ticnum = SpefGuilJCnf.ticketnum
	if(!ticnum) return message.channel.send("Please use this in a ticket channel");
	var messchanName = message.channel.name
	if(messchanName==='ticket-master') return;
	if(!message.member.roles.cache.has(roleID)) return message.channel.send("You need to have The Ticket Admin role to use this");
	if(messchanName.startsWith('ticket')) {
		message.channel.delete(messchanName)
	}
}