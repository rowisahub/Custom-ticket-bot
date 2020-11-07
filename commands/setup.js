exports.run = (message, args, client, Discord, fs, ops) => {
	var nonya =client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
	const guild = ops.guild
	const guildID = ops.guildID
	const conf = ops.conf
	const guildConfDir = ops.guildConfDir
	const prefix = ops.prefix
	const SpefGuilJCnf = ops.SpefGuilJCnf
	const passconfig = SpefGuilJCnf.passconfig
	const ticketemoji = ops.ticketemoji
	const guConDir = `./data/guildConfigs/${guildID}-config.json`
	if(passconfig===false) return message.channel.send("The config is already set up. if you need to change something use the change/replace command")
	if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You need to have administrator permissions to use this')
	if(args[0]) return message.channel.send("Please don't use any args with the start/setup command. I will ask questions, Please redo the start command")
	message.channel.send("Starting...").then(m => {
		message.guild.roles.create({
			data: {
				name: 'Ticket Admin',
				color: 'BLUE',
			},
			reason: "Made by A ticket bot. You can change the color, the name, and the permissions. This role doesn't add or remove any guild permissions",
		})
			.then(console.log)
			.catch(console.error);
		message.guild.channels.create("Ticket-Master", {
			type: "text",
			permissionOverwrites: [
				{
					id: message.guild.roles.everyone.id,
					deny: ['SEND_MESSAGES'],
					allow: ['ADD_REACTIONS'],
				},
			],
		});
		setTimeout(function(){
			var roleID = message.guild.roles.cache.find(r => r.name === "Ticket Admin");
			var roleID = roleID.toString()
			var roleID = roleID.replace("<","")
			var roleID = roleID.replace("@","")
			var roleID = roleID.replace("&","")
			var roleID = roleID.replace(">","")
			fs.readFile(guConDir, 'utf-8', function (err, data) {
				if (err) return console.log('Error: '+err);
				var json = JSON.parse(data);
				json.roleid = roleID
				fs.writeFile(guConDir, JSON.stringify(json, null, 2), function(erro){
				  if (erro) return console.log('Error: '+erro);
				  console.log(`Added '"roleid": "${roleID}"' `);
				});
			})
			setTimeout(function(){
				var channelID = message.guild.channels.cache.find(c => c.name === "ticket-master");
				var channelID = channelID.toString()
				var channelID = channelID.replace("<","")
				var channelID = channelID.replace("#","")
				var channelID = channelID.replace(">","")
				fs.readFile(guConDir, 'utf-8', function (err, data) {
					if (err) return console.log('Error: '+err);
					var json = JSON.parse(data);
					json.channelid = channelID
					json.passconfig = false
					fs.writeFile(guConDir, JSON.stringify(json, null, 2), function(erro){
					  if (erro) return console.log('Error: '+erro);
					  console.log(`Added '"channelid": "${channelID}"'`);
					  console.log(`Changed 'passconfig' from 'true' to 'false'`);
					});
				})
				m.edit("It worked successfly!")
			}, 3000);
		}, 1000);
	})
}
