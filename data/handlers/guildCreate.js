exports.run = (client, Discord, guildConfDir, guild) => {
	const fs = require('fs'); // 
	
	const guildName = guild.name; // Sets guild's name
	const guildID = guild.id; // Sets guild's ID
	console.log(`Joined Guild: '${guildName}'`) // Tells the console that it has joined a new guild
	let beJsonfore = { // make a json 
		guildName: guildName, // sets guildName as guildName
		guildID: guildID, // sets guildID as guildID
		passconfig: true // sets if the commands should not run, this will be changed when the user runs the setup command
	}
	const beJson = JSON.stringify(beJsonfore, null, 2) // set beJsonfore as a json string for file
	const guConDir = `${guildConfDir}${guildID}-config.json` // get the file name 
	fs.writeFile(guConDir, beJson, (err) => { // writes the file
		if (err) return console.log('Error: '+err) // if error return error
		console.log(`Created file: '${guConDir}'`) // says that it made a file
	})
}