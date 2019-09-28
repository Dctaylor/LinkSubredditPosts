// require the discord.js module
const Discord = require('discord.js');

//grab config file
const auth = require('./auth.json');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// login to Discord with your app's token
client.login(auth.token);


//listen for message
client.on('message', message => {
    //Only react 30% of the time
    if(Math.floor(Math.random() * 10) < 4) {
        //Get all custom server emojis
        const temp = message.guild.emojis.map((e, x) => e.name);
        const emojiList = [];
        for(const e of temp.values()) {
            emojiList.push(e);
        }

        //Get a randomly selected custom emoji
        var chosenEmoji = emojiList[Math.floor((Math.random() * 6) - 1)];

        //Find the selected emoji by name
        const emoji = message.guild.emojis.find(emoji => emoji.name === chosenEmoji);

        //React to the message
        message.react(emoji);
    }    
});