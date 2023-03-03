const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "info",
  category: "Info",
  aliases: ["about"],
  cooldown: 2,
  usage: "About Bot Owners Information",
  description: "This is the About Owner Details",
  run: async (client, message, args, guildData, player, prefix) => {
    try {
      let connectedchannelsamount = 0;
      let guilds = client.guilds.cache.map((guild) => guild);
      for (let i = 0; i < guilds.length; i++) {
        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
      }
      if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

      let users = 0;
      client.guilds.cache.forEach(guild => {
        users += guild.memberCount;
      })
                                  const apiLatency = `${Math.round(message.client.ws.ping)} ms`; 
      const memusage = process.memoryUsage()
        
      const embed = new MessageEmbed()
      .setAuthor(`TEAM `, message.author.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL ())
      .addField(`Dev Team`, `Team Crypts`)
        .addField(`RAM Usage`,`${Math.round(memusage.heapUsed / 1024 / 1024)}/${Math.round(memusage.heapTotal / 1024 / 1024)}mb`)        
      .addField(`Ping`, `${apiLatency}`)
        .addField(`Guild Id`, `${message.guild.id } `)

       
        .addField(`Servers`,`${client.guilds.cache.size.toLocaleString()}`)
      .setColor(ee.color);    
      return message.reply({embeds: [embed], allowedMentions: { repliedUser: false }});
      
    } catch (e) {
      console.log(String(e.stack).bgRed)
			const emesdf = new MessageEmbed()
			.setColor(ee.wrongcolor)
			.setAuthor(`An Error Occurred`)
			.setDescription(`\`\`\`${e.message}\`\`\``);
			return message.channel.send({embeds: [emesdf]});
    }
  }
}