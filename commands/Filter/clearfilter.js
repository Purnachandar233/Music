const {
  MessageEmbed
} = require(`discord.js`);
const DBL = require('@top-gg/sdk');
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `reset`,
  category: `Filter`,
  aliases: ["cf", "clearfilter","clear filters", "clearfilters"],
  description: `Clears the Equalizer`,
  usage: `clearfilter`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, guildData, player, prefix) => {

    try {

        const isPermGuild = require("../../models/premiumGuild");

      const isPremium = await isPermGuild.findOne({
             GuildID: message.guild.id,
           });
     
           
            
      player.clearEQ();
      player.node.send({
        op: "filters",
        guildId: message.guild.id,
        equalizer: player.bands.map((gain, index) => {
            var Obj = {
              "band": 0,
              "gain": 0,
            };
            Obj.band = Number(index);
            Obj.gain = Number(gain)
            return Obj;
          }),
      });
      const isdfr = new MessageEmbed()
      .setColor(ee.color)
      .setAuthor(`${message.author.tag} - Clearfilter`, message.author.displayAvatarURL( { dynamic: true } ))
      .setDescription(`${emoji.msg.SUCCESS}| Successfully \`Cleared\` All The Filter`);
      return message.reply({embeds: [isdfr], allowedMentions: { repliedUser: false }});
            
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setAuthor(`An Error Occurred`)
      .setDescription(`\`\`\`${e.message}\`\`\``);
      return message.channel.send({embeds: [emesdf]})
    }
  }
};