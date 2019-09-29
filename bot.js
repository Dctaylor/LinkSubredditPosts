// require the discord.js module
const Discord = require('discord.js');

//grab config file
const config = require('./config.json');

var CronJob = require('cron').CronJob;


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
new CronJob('00 43 10 * * *', function() {
    try {
        r.getSubreddit('Animemes').getTop({time: 'day'}, {limit: 10}).then(myListing => {
            var index = Math.floor(Math.random() * 10);
            const channel = client.channels.get(config.channelId);
            channel.send(myListing[index].url);

            //listens for messages sent, if it detects the bot has sent its post, it logs the bot out
            client.on('message', message => {
                //checks if the message is in the correct channel
                if(message.channel == channel)
                    //checks if the author of the message is our bot
                    if(message.author.id === client.user.id)
                        //logs the bot out of discord
                        client.destroy();
            })
        })
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    }
}, null, true, 'America/Los_Angeles');

//Lets us know the bot has disconnected and kills the process
client.on("disconnect", function(event){
    console.log('Bot disconnecting');
    process.exit();
});
    