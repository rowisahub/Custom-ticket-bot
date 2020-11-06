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
			.setURL('https://discord.com/oauth2/authorize?client_id=750720968720252979&scope=bot&permissions=2146958847')
			.setAuthor('TICKET', client.user.displayAvatarURL(), 'https://rowisabeast.com')
			.setTitle('Invite This Bot!')
			.setDescription('React to <:ticket:772937494920036392> to create a ticket')
			.setFooter("Ticket")
			.setTimestamp()
		
		message.channel.send({ embed: ticketEM }).then(embedMessage => {
			
			
			// const reactTicket = (reaction, user) => {
				// return ['<:ticket:772937494920036392>'].includes(reaction.emoji.name)
			// };
			// <:ticket:772937494920036392>
			// reaction.emoji.name
			
			embedMessage.react('<:ticket:772937494920036392>')
						// message.channel.send("reacted")
						// const reactedUserID = user.id
						
						// var rnnum = ranNum(10000,999999999)
						// var newticket1 = `${rnnum}-Ticket`
						// var rnnum2 = ranNum(10000,999999999)
						// var newticket2 = `${rnnum2}-Ticket`
						// var rnnum3 = ranNum(10000,999999999)
						// var newticket3 = `${rnnum3}-Ticket`
						// var newticket = newticket1
						// if(message.guild.channel.find(c => c.name === newticket1)) var newticket = newticket2
						// if(message.guild.channel.find(c => c.name === newticket2)) var newticket = newticket3
						
						// message.guild.channels.create(newticket, {
							// type: "text",
							// permissionOverwrites: [
								// {
									// id: message.guild.roles.everyone.id,
									// deny: ['VIEW_CHANNEL'],
								// },
								// {
									// id: reactedUserID,
									// allow: ['VIEW_CHANNEL','SEND_MESSAGES','ADD_REACTIONS'],
								// },
								// {
									// id: roleID,
									// allow: ['VIEW_CHANNEL','SEND_MESSAGES','ADD_REACTIONS'],
								// },
							// ],
						// });
		})
	}catch(e){
		message.channel.send('Error: '+e)
	}
}