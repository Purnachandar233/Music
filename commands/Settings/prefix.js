const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `prefix`,
  aliases: [`prefix`],
  category: `Settings`,
  description: `Let's you change the Prefix of the BOT`,
  usage: `prefix <NEW PREFIX>`,
  memberpermissions: [`MANAGE_CHANNELS`],
  run: async (client, message, args, guildData, player, prefix) => {
    try {
      //get the current prefix from the database
      let prefix = guildData.prefix;
      //if not in the database for some reason use the default prefix
      if (prefix === null) prefix = config.prefix;
      //if no args return error
      if (!args[0]) {
        const yyy = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} | Please provide a new prefix!\nCurrent prefix: \`${prefix}\``)
        return message.reply ({embeds: [yyy], allowedMentions: { repliedUser: false }})
      }
      //if there are multiple arguments
      if (args[1]) {
        const op = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} | The prefix can\'t have two spaces`)
        return message.reply({embeds: [op], allowedMentions: { repliedUser: false }});
      }
      //if the prefix is too long
      if (args[0].length > 5) {
        const ttt = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} | The prefix can\'t be Longer then \`5\``)
        return message.reply ({embeds: [ttt], allowedMentions: { repliedUser: false }})
      }
      //set the new prefix
      guildData.prefix = args[0]
      guildData.save()
      //return success embed
      const opopo = new MessageEmbed()
      .setColor(ee.color)
      .setAuthor(`${message.author.tag} - Prefix`, message.author.displayAvatarURL( { dynamic: true } ))
      .setDescription(`${emoji.msg.SUCCESS} | Set new prefix to **\`${args[0]}\`**`)
      return message.reply ({embeds: [opopo], allowedMentions: { repliedUser: false }});
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

