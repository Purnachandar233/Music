 const {
  MessageEmbed
} = require(`discord.js`)
const config = require("../../botconfig/config.json");
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const levels = {
    none: 0.5,
    low: 0.20,
    medium: 0.35,
    high: 0.50,
    earrape: 0.75,
  };
  
  module.exports = {
        name: "bassboost",
        aliases: ['bb'],
        category:"Filter",
        usage:"bassboost <none/low/medium/high/earrape>",
        description:"Sets the Bass Boost Level to <none/low/medium/high/earrape> Makes The Song Bass",
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
        cooldown:"0.2",
 run: async(client, message, args) => {
      const player = message.client.manager.players.get(message.guild.id); //player property

  
      if(!args) return message.channel.send(`You need to provide me a bassboost level.\n Avaiable Bass Levels Are \`none, low, medium, high, earrape\`.`) //if the user do not provide args [arguments]

      let level = "none";
      if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();
  
      player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));
   
  const done = new MessageEmbed()
.setColor(ee.color)
   .setAuthor(`${message.author.tag} - Bassboost`, message.author.displayAvatarURL( { dynamic: true } ))
   .setDescription(`${emoji.msg.SUCCESS} | Bassboost is Now Set to : \`${level}\``)
   .setFooter(`Tip : Use Clearfilters If you disable`)
   return message.reply({embeds: [done], allowedMentions: { repliedUser: false }});
    }
  }