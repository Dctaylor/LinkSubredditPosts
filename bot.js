// require the discord.js module
const Discord = require('discord.js');

//grab config file
const config = require('./config.json');

const cron = require('node-cron');

// create a new Discord client
const client = new Discord.Client();

const snoowrap = require('snoowrap');

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// login to Discord with your app's token
client.login(config.token);

//setup oAuth for Reddit Api calls
const r = new snoowrap({
    userAgent: "A Discord Bot that ocassionally posts content links from given subreddits to Discord (by u/ShadowAssassin96",
    clientId: config.clientId,
    clientSecret: config.secret,
    username: config.username,
    password: config.password
  });


  
//Get posts from subreddit and posts it to the correct channel
cron.schedule('* 19 * * *', () => {
    try {
        var post = r.getSubreddit('Animemes').getTop({time: 'day'}, {limit: 10}).then(myListing => {
            var index = Math.floor((Math.random() * 10) - 1);
            const channel = client.channels.get(config.clientId);
            channel.send(myListing[index].url);
        })
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    }
});

    

//post the link
/*cron.schedule('* 19 * * *', () => {
    client.channels.get(config.channelId).send('My Message');
});*/
