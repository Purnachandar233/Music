const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `remove`,
  category: `Music`,
  aliases: [`rt`, `removetrack`],
  description: `Removes a track from the Queue`,
  usage: `remove <track number>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, guildData, player, prefix) => {
    try{
      //if no args return error
      if (!args[0]) {
        const ddd = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} Please add the Track you want to remove!\n\nExample: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        return message.reply({embeds: [ddd], allowedMentions: { repliedUser: false }})
      }
      //if the Number is not a valid Number return error
      if (isNaN(args[0])) {
        const tttt = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} It has to be a valid Queue Number!\n\nExample: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        return message.reply({embeds: [tttt], allowedMentions: { repliedUser: false }})
      }
      //if the Number is too big return error
      if (Number(args[0]) > player.queue.size) {
        const yyy = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} | Your Song must be in the Queue!\n\nExample: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        return message.reply ({embeds: [yyy], allowedMentions: { repliedUser: false }})
      }
      //remove the Song from the QUEUE
      player.queue.remove(Number(args[0]) - 1);
      //Send Success Message
      const ppp = new MessageEmbed()
      .setAuthor(`${message.author.tag} - Remove`, message.author.displayAvatarURL( { dynamic: true } ))
     .setDescription(`${emoji.msg.SUCCESS} | I removed the track at position: \`${Number(args[0])}\``)
      .setColor(ee.color)
      return message.reply({embeds: [ppp], allowedMentions: { repliedUser: false }});
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