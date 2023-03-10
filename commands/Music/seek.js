const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `seek`,
  category: `Music`,
  aliases: [`sek`],
  description: `Changes the position(seek) of the Song`,
  usage: `seek <Duration in Seconds>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, guildData, player, prefix) => {
    try{
      //if number is out of range return error
      if (!player.queue.current) {
        const no = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} |  Currently Not Playing anything`)
        return message.reply ({embeds: [no], allowedMentions: { repliedUser: false }})
      }
      if (Number(args[0]) < 0 || Number(args[0]) >= player.queue.current.duration / 1000 || isNaN(args[0])) {
        const ttt = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} | You may seek from \`0\` - \`${player.queue.current.duration / 1000}\` seconds`)
        return message.reply({embeds: [ttt], allowedMentions: { repliedUser: false }});
      }
      //seek to the position
      player.seek(Number(args[0]) * 1000);
      //send success message
      const pp = new MessageEmbed()
      .setAuthor(`${message.author.tag} - Seek`, message.author.displayAvatarURL( { dynamic: true } ))
     .setDescription(`${emoji.msg.SUCCESS} | Successfully Seeked song to: ${format(Number(args[0]) * 1000)}`)
      .setColor(ee.color)
      return message.reply({embeds: [pp], allowedMentions: { repliedUser: false }});
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
