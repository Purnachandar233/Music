const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);

const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const DBL = require('@top-gg/sdk');
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
  name: `soundcloud`,
  category: `Music`,
  aliases: [`sc`],
  description: `Plays a song from soundcloud`,
  usage: `play <Song / URL>`,
  parameters: {"type":"music", "activeplayer": false, "previoussong": false},
  run: async (client, message, args, guildData, player, prefix) => {
    try{
        
      try {
        if(/(open.spotify.com\/(track|playlist)\/+)/i.test(message.content)) {
        }
      } catch {/** */}


      //if no args return error
      if (!args[0]) {
        const ppp = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDe| scription(`${emoji.msg.ERROR} You needlink`)
   return message.reply({embeds: [ppp], allowedMentions: { repliedUser: false }});channel.send({embeds: [ppp]});
      }

      try {
        message.react(emoji.msg.SUCCESS).catch((_) => { })
      } catch {/* */}
  
      //play the SONG from YOUTUBE
      playermanager(client, message, args, `song:soundcloud`);

    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
			.setColor(ee.wrongcolor)
			.setAuthor(`An Error Occurred`)
			.setDescription(`\`\`\`${e.message}\`\`\``);
			return message.channel.send({embeds: [emesdf]});
    }
  }
};
