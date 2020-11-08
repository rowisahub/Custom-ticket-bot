exports.run = async(reaction, user, emoji, SpefGuilJCnf, client, guildID) => {
	try{
		function ticnum(SpefGuilJCnfsg){
			if(!SpefGuilJCnfsg.ticketnum){
				fs.readFile(guConDir, 'utf-8', function (err, data) {
					if (err) return console.log('Error: '+err);
					var json = JSON.parse(data);
					json.ticketnum = 1
					fs.writeFile(guConDir, JSON.stringify(json, null, 2), function(erro){
					  if (erro) return console.log('Error: '+erro);
					  console.log(`Added '"ticketnum": "1"' `);
					});
				})
				return 1
			}else{
				var ticketnums = SpefGuilJCnfsg.ticketnum+1
				fs.readFile(guConDir, 'utf-8', function (err, data) {
					if (err) return console.log('Error: '+err);
					var json = JSON.parse(data);
					json.ticketnum = SpefGuilJCnfsg.ticketnum+1
					fs.writeFile(guConDir, JSON.stringify(json, null, 2), function(erro){
					  if (erro) return console.log('Error: '+erro);
					  console.log(`Edited '"ticketnum": "${ticketnums}"' `);
					});
				})
				return SpefGuilJCnfsg.ticketnum+1
			}
		}
		function ranNum(min, max){
			return Math.floor(Math.random()*max)+min
		}
		const fs = require('fs'); // 
		const guConDir = `./data/guildConfigs/${guildID}-config.json`
		if (reaction.partial) {
			try {
				await reaction.fetch();
			} catch (error) {
				console.error('Something went wrong when fetching the message: ', error);
				return;
			}
		}
		const reactedUserID = user.id
		const channelID = SpefGuilJCnf.channelid
		const roleID = SpefGuilJCnf.roleid
		const ayy = reaction.client.emojis.cache.get("772937494920036392");
		if(emoji.name!==ayy.name) return reaction.remove(emoji.name);
		if(reaction.message.channel.id === channelID){
			reaction.users.remove(user);
			const ticketnums = ticnum(SpefGuilJCnf)
			var newticket = `ticket-${ticketnums}`
			reaction.message.guild.channels.create(newticket, {
				type: "text",
				permissionOverwrites: [
					// {
						// id: ROLEorUSERif, // Put Role or user id here, ex. id: 
						// deny: [''], // say what they can't do
						// allow: [''], // say what they can do
					// },
					{
						id: reaction.message.guild.roles.everyone.id,
						deny: ['VIEW_CHANNEL','SEND_MESSAGES','ADD_REACTIONS'],
					},
					{
						id: reactedUserID,
						allow: ['VIEW_CHANNEL','SEND_MESSAGES','ADD_REACTIONS'],
					},
					{
						id: roleID,
						allow: ['VIEW_CHANNEL','SEND_MESSAGES','ADD_REACTIONS'],
					},
				],
			});
			return;
		}
	}catch(e){
		console.log(e)
		reaction.message.send(e)
	}
}
