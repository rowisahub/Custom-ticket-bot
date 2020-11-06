exports.run = (message, args, client, Discord, fs, ops) => {
	try{
		const guild = ops.guildID
		const guildID = ops.guildID
		const conf = ops.conf
		const guildConfDir = ops.guildConfDir
		const prefix = ops.prefix
		const SpefGuilJCnf = ops.SpefGuilJCnf
		const embedcolor = '#00D166';
		const guildName = guild.name; // Sets guild's name
		const guConDir = `${guildConfDir}${guildID}-config.json`
		const roleID = SpefGuilJCnf.roleid
		const channelID = SpefGuilJCnf.channelid
		const passconfig = SpefGuilJCnf.passconfig
		if(passconfig===true) return message.channel.send("You need to use the setup command")
		if(message.channel.id !== channelID) return message.channel.send("Only use this command in the text channel this bot setup.")
		if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You need to have administrator permissions to use this')
		const ticketEM = new Discord.MessageEmbed()
			.setColor(embedcolor)
			.setAuthor('TICKET', client.user.displayAvatarURL(), 'https://rowisabeast.com')
			.setDescription('React to <:ticket:772937494920036392> to create a ticket')
			.setFooter("Ticket")
			.setTimestamp()
		message.channel.send({ embed: ticketEM }).then(embedMessage => {
			embedMessage.react('<:ticket:772937494920036392>')
		})
	}catch(e){
		message.channel.send('Error: '+e)
	}
}
