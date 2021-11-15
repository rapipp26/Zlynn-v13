<p align="center"><a href="https://nodei.co/npm/discord-error-handler/"><img src="https://nodei.co/npm/discord-error-handler.png"></a></p>
<p align="center"><img src="https://img.shields.io/npm/v/discord-mongodb-prefix"> <img src="https://img.shields.io/github/repo-size/meister03/discord-error-handler"> <img src="https://img.shields.io/npm/l/discord-error-handler"> <img src="https://img.shields.io/github/contributors/discord-error-handler">  <a href="https://discord.gg/YTdNBHh"><img src="https://discordapp.com/api/guilds/697129454761410600/widget.png" alt="Discord server"/></a></p>

# Discord-error-handler
A lightweight managing package,which catches and save discord errors and even send daily bot reports. Intelligent saving ways and good interface. Find every Bug in your Code!


**If you need help feel free to join our <a href="https://discord.gg/YTdNBHh ">discord server</a>. We will provied you all help ☺**
# Download
You can download it from npm:
```cli
Discord.js v13 Users:
npm i discord-error-handler

Discord.js v12  and below:
npm i discord-error-handler@1.3
```

# Setting Up
First we include the module into the project (into your main bot file).
```js
const Errorhandler = require("discord-error-handler");
const client = new Discord.Client();
const handle  = new Errorhandler(client, {
  webhook: {id: `Webhook id for error logging`, token: `Webhooktoken for error logging`}
})  // do not rename here something, or else Dx 
```
# Saving/ Logging Erorrs

*Following examples assume that your `Discord.Client` is called `client`.*

```js
client.on('message', async message => {
 try{
    if(message.author.bot) return;
    if(message.content === "!notwork") return message.chanel.send("ddd"); 

    // the error here is "chanel" , the right thing would be "channel" ==> this will now send a message in the log channel.
    //When the error happens again. It will not send the error again 
  }catch(error){
    handle.createrr(client, message.guild.id, message.content, error)
  }
});
```
# Get a Report of all Errors
```js
if(message.content === "!report") return handle.report(client , message); 
```
# Catch Unhandeld Error
```js
process.on('unhandledRejection', error => { 
  handle.createrr(client,undefined, undefined, error)
});
```
# Get Status of each Shards
```
//This Codes is just for sharded bots
const status = await handle.status(client);
console.log(status)
```
# Whole Code
```js
const Discord = require('discord.js');
const Errorhandler = require("discord-error-handler");
const { prefix, token  , url} = require('./config.json');
const client = new Discord.Client();
const handle  = new Errorhandler(client, {
  webhook: {id: `Webhook id for error logging`, token: `Webhooktoken for error logging`}
  stats: false, ///true when you want hourly stats
})  // do not rename here something, or else Dx 

client.once('ready', () => {
console.log('Ready! Logged in as ' + client.user.tag + " with Prefix: " + prefix);
});
client.on('message', async message => {
  try{
    if (message.author.bot) return;
    if(message.content === "!start") return message.chanel.send("ddd"); ///create a error
    if(message.content === "!report") return handle.report(client , message);
  }catch(error){  
    handle.createrr(client, message.guild.id, message.content, error)
  } 
});
client.login(token);
  process.on('unhandledRejection', error => { 
  handle.createrr(client,undefined, undefined, error)
});


```


**Have fun and feel free to contribute/suggest or contact me on my discord server or per dm on Meister#9667**

# Bugs, Glitches and Issues
If you encounter any problems feel free to open an issue in our <a href="https://github.com/meister03/discord-error-handler/issues">github repository or join the discord server.</a>.
