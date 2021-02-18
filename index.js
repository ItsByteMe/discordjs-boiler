const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require("fs");

dotenv.config();
const prefix = process.env.BOT_PREFIX;
const token = process.env.BOT_TOKEN;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

console.log('Commands Loaded:');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(command.name);
    client.commands.set(command.name, command);
}

client.on('ready', async () => {
    console.log("\n\n\nConnected as " + client.user.tag);
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
    }
});

client.login(token);