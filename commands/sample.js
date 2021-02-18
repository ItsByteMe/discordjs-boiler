module.exports = {
    name: "sample",
    description: "A sample command.",
    aliases: ['smpl'], //This is for any other things you'd like for users to be able to call your command with, for example if it was a help command you could put '?', and 'cmds' in here, or common typos.
    async execute(message, args) {
        message.channel.send('sample');
    }
};