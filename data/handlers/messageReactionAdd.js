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
		// const message = reaction.message
		// try{
			
			// let emoji = reaction.emoji;
			
			// const guildID = emoji.guild.id;
			// const guild = message.guild
			const reactedUserID = user.id
			// const reactedUserUsername = message.member.user.username
			
			// delete require.cache[require.resolve(`./data/guildConfigs/${guildID}-config.json`)];
			// const SpefGuilJCnf = require(`./data/guildConfigs/${guildID}-config.json`)
			
		const channelID = SpefGuilJCnf.channelid
		const roleID = SpefGuilJCnf.roleid
		
		// // emoji.cliemt.channels
		
		const ayy = reaction.client.emojis.cache.get("772937494920036392");
		
		// console.log(ayy)
		
		if(emoji.name!==ayy.name) return reaction.remove(emoji.name);
		
		// if(emoji.name !== '<:ticket:772937494920036392>') return;
		
		if(reaction.message.channel.id === channelID){
			
			reaction.users.remove(user);
			
			const ticketnums = ticnum(SpefGuilJCnf)
			
			// fs.readFile(guConDir, 'utf-8', function (err, data) {
				// if (err) return console.log('Error: '+err);
				// var json = JSON.parse(data);
				
				// json.ticketnum = ticketnums
				
				// fs.writeFile(guConDir, JSON.stringify(json, null, 2), function(erro){
				  // if (erro) return console.log('Error: '+erro);
				  // console.log(`Added '"ticketnum": "${ticketnums}"' `);
				// });
			// })
			
			
			var newticket = `ticket-${ticketnums}`
			// console.log(newticket)
			
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
			
			console.log(reactedUserID)
			
			// reaction.remove(user.filter(u => !u.bot).first());
			
			// reaction.remove(user);
			// reaction.message.react('<:ticket:772937494920036392>')
			return;
			
		}
		
		
		
		// var rnnum = ranNum(10000,999999999)
		// var newticket1 = `${rnnum}-Ticket`
		// var rnnum2 = ranNum(10000,999999999)
		// var newticket2 = `${rnnum2}-Ticket`
		// var rnnum3 = ranNum(10000,999999999)
		// var newticket3 = `${rnnum3}-Ticket`
		// var newticket = newticket1
		// if(reaction.guild.channel.find(c => c.name === newticket1)) var newticket = newticket2
		// if(reaction.guild.channel.find(c => c.name === newticket2)) var newticket = newticket3
		
		// var newticket = `${newticket}-ticket`
		
		// message.guild.channels.create(newticket, {
			// type: "text",
			// permissionOverwrites: [
				// // {
					// // id: ROLEorUSERif, // Put Role or user id here, ex. id: 
					// // deny: [''], // say what they can't do
					// // allow: [''], // say what they can do
				// // },
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
		
		
		// reaction.remove(user);
		// reaction.add('<:ticket:772937494920036392>')
		// }catch(e){
			// console.log('Error: '+e)
		// }
	}catch(e){
		console.log(e)
		reaction.message.send(e)
	}
}