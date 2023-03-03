const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "ping",
  category: "Info",
  aliases: ["latency"],
  cooldown: 2,
  usage: "ping",
  description: "Gives you information on how fast the Bot can respond to you",
  run: async (client, message, args, guildData, player, prefix) => {
    try {
        
      const embed = new MessageEmbed()
      .setDescription('`loading...`')
      .setColor(ee.color);    
      const msg = await message.reply ({embeds: [embed], allowedMentions: { repliedUser: false }});
      const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp; // Check if edited
      const latency = `${Math.floor(msg.createdTimestamp - timestamp)} ms`;
      const apiLatency = `${Math.round(message.client.ws.ping)} ms`;
      embed.setAuthor(`Speed`,  message.author.displayAvatarURL({ dynamic: true }))
      embed.setDescription(`\`\`\`PING: ${apiLatency}\`\`\``)
      
      msg.edit({embeds: [embed]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
			const emesdf = new MessageEmbed()
			.setColor(ee.wrongcolor)
			.setAuthor(`An Error Occurred`)
			.setDescription(`\`\`\`${e.message}\`\`\``);
			return message.reply({embeds: [emesdf], allowedMentions: { repliedUser: false }});
    }
  }
}