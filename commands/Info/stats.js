const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const bytes = require('bytes');
const prettyMilliseconds = require("pretty-ms")
const Discord  = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  getRandomInt
} = require("../../handlers/functions")
module.exports = {
  name: "stats",
  category: "Miscellaneous",
  aliases: ["musicstats"],
  cooldown: 10,
  usage: "stats",
  description: "Shows music Stats, like amount of Commands and played Songs etc.",
  run: async (client, message, args, guildData, player, prefix) => {
    
    try {
      try {
        const dbl = new DBL.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5ODU1NTk0NDAyNjM4NjQ2MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjM3NDIxMzk5fQ.nXYEAaHxfEjdIv12QZldm7yCoa3O-l6r0ZbHjZdhUMc", client);
        let voted = await dbl.hasVoted(message.author.id);
        if(!voted) {
          const vote = new MessageEmbed()
          .setTitle("Vote required!")
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.color)
          .setTimestamp()
          .setDescription(`${emoji.msg.ERROR} you must vote me [here](https://top.gg/bot/898555944026386462/vote) to use this command\n [**Click Here**](https://top.gg/bot/898555944026386462/vote)`)
          return message.channel.send({embeds: [vote]});
        }
      } catch {/** */}
      let totalSeconds = message.client.uptime / 1000;
      let days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);
      
      let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
  


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
      const { totalMemMb, usedMemMb } = await mem.info();
        
        const memusage = process.memoryUsage();
        
      const clmao = stripIndent`
↳ version           ::${Discord.js.version }
↳ Platform          :: ${await os.oos()}
↳ CPU               :: ${cpu.model()}
↳ Servers           :: ${message.client.guilds.cache.size.toLocaleString()}
↳ Users             :: ${users.toLocaleString()}
↳ Players           :: ${connectedchannelsamount}
↳ Ping              :: ${client.ws.ping}ms
↳ Memory            :: ${Math.round(memusage.heapUsed / 1024 / 1024)}/${Math.round(memusage.heapTotal / 1024 / 1024)}mb
↳ Node Version      :: V16.1.0
↳ streams   :: Playing Music In ${connectedchannelsamount} Servers 



  `;

      const statsEmbed = new Discord.MessageEmbed()
      .setColor(ee.color)
.setDescription(`\`\`\`asciidoc\n${clmao}\n\`\`\``)
.setAuthor(`**JOKER MUSIC STATS**`,  message.author.displayAvatarURL({ dynamic: true }),config.links.server)
      message.reply({embeds: [statsEmbed], allowedMentions: { repliedUser: false }});

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
