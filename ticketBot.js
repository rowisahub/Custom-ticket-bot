const Discord = require('discord.js'); // 
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); // 
const fs = require('fs'); // 
const conf = require('./config/config.json')
const guildConfDir = './data/guildConfigs/'
const token = conf.token
const prefix = conf.prefix
const ticketemoji = conf.ticketemoji
console.clear()
if(prefix===''){
	console.log("Please put a prefix in the config file.") // checks to see if there is nothing in the prefix varible in the config
	setTimeout(function(){
		process.exit();
	}, 1);
	return
}
if(token===''){
	console.log("Please put a token in the config file.") // checks to see if there is nothing in the token varible in the config
	setTimeout(function(){
		process.exit();
	}, 1);
	return
}
if(ticketemoji===''){
	console.log("Please put the id of the emoji you want to use, EX. <:ticket:772937494920036392> | put it in the config just like that, '<:ticket:772937494920036392>'")
	setTimeout(function(){
		process.exit();
	}, 1)
}
client.once('ready', () => { 
	console.log(`Logged in as: ${client.user.tag}`);
	client.user.setActivity(`${prefix}help`);
});
client.on('guildCreate', guild => { // sets the json's for each server when it join's
	try{
		delete require.cache[require.resolve(`./data/handlers/guildCreate.js`)];
		let commandFile = require(`./data/handlers/guildCreate.js`);
		commandFile.run(client, Discord, guildConfDir, guild, fs);
	}catch(e){
		console.log('Error: '+e)
	}
})
client.on('message' , message => {
	const guildID = message.guild.id;
	const guild = message.guild
	if (!message.content.startsWith(prefix)) return;
	let args = message.content.slice(prefix.length).trim().split(' ');
	let cmd = args.shift().toLowerCase();
	if (message.author.bot) return;
	delete require.cache[require.resolve(`./data/guildConfigs/${guildID}-config.json`)];
	const SpefGuilJCnf = require(`./data/guildConfigs/${guildID}-config.json`)
	try {
		delete require.cache[require.resolve(`./commands/${cmd}.js`)];
		let commandFile = require(`./commands/${cmd}.js`);
		let ops = {
			conf: conf,
			guildConfDir: guildConfDir,
			prefix: prefix,
			guildID: guildID,
			SpefGuilJCnf: SpefGuilJCnf,
			guild: guild,
			ticketemoji: ticketemoji
		}
		commandFile.run(message, args, client, Discord, fs, ops);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
})
client.on('messageReactionAdd', async(reaction, user) => {
	if (user.bot) return;
	let emoji = reaction.emoji;
	const guildID = reaction.message.guild.id;
	delete require.cache[require.resolve(`./data/guildConfigs/${guildID}-config.json`)];
	const SpefGuilJCnf = require(`./data/guildConfigs/${guildID}-config.json`)
	delete require.cache[require.resolve(`./data/handlers/messageReactionAdd.js`)];
	let commandFile = require(`./data/handlers/messageReactionAdd.js`);
	commandFile.run(reaction, user, emoji, SpefGuilJCnf, client, guildID);
})
client.login(token);