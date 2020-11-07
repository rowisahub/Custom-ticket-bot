exports.run = (message, args, client, fs, ops) => {
	try{
		const Discord = require('discord.js')
		const conf = ops.conf
		const guildConfDir = ops.guildConfDir
		const prefix = ops.prefix
		var guildID = message.guild.id;
		delete require.cache[require.resolve(`../data/guildConfigs/${guildID}-config.json`)];
		const SpefGuilJCnf = require(`../data/guildConfigs/${guildID}-config.json`)
		const embedcolor = '#00D166';
		const passconfig = SpefGuilJCnf.passconfig
		if(passconfig===true) return message.channel.send("You need to use the setup command")
		var channelID = SpefGuilJCnf.channelid
		var roleID = SpefGuilJCnf.roleid
		var ticketnum = SpefGuilJCnf.ticketnum
		if(!ticketnum) var senticketnum = 'There are no tickert that were created'
		var senticketnum = 'There is `'+ticketnum+'` tickets that were created'
		var senchannelID = 'The ID for the text channel the ticket creater is in: `'+channelID+'`'
		var senroleID = 'The ID for the role that gets added to the ticket to help: `'+roleID+'`'
		const sdd = new Discord.MessageEmbed()
			.setAuthor('Ticketinfo', client.user.displayAvatarURL(), 'https://rowisabeast.com')
			.setDescription(senticketnum+'\n'+senchannelID+'\n'+senroleID)
			.setFooter("TICKETINFO")
			.setTimestamp()
		message.channel.send(sdd)
	}catch(e){
		console.log(e)
		message.channel.send('Error: '+e)
	}
}