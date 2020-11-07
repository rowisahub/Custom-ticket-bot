exports.run = (message, args, client, Discord, fs, ops) => {
	const prefix = ops.prefix
	const embedcolor = '#00D166';
	const helpesing = new Discord.MessageEmbed()
		.setColor(embedcolor)
		.setAuthor('Help Area', client.user.displayAvatarURL())
		.setTimestamp()
		.addFields(
			{ name: 'setup', value: 'Sets up the ticket system. Only users with the perm. administrator can use this command', inline: true },
			{ name: 'ticket', value: 'this sends the message with the emoji that users need to react to. Only users with the perm. administrator can use this command', inline: true },
			{ name: 'help', value: 'shows this message', inline: true },
			{ name: 'close', value: 'Closes the ticket. Only works in the ticket, only Admin can close it.', inline: true },
		)
	message.channel.send(helpesing);
}