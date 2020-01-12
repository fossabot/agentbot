const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
    name: "warn",
    description: "Cảnh cáo mem",
    category: "moderation",
    usage: "_warn <tag> (chỉ có admin và mod)",
    run: (client, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Đéo có manage_member thì sao mà warn dc =))");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Không warn được vì là admin :((");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setAuthor(`Warn`)
  .setColor("#fc6400")
  .addField("Warned User", `${wUser}`)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason);

  let warnchannel = message.guild.channels.find(c=>c.name ==="📝log📝");
  if(!warnchannel) return message.reply("Couldn't find channel #log");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(role => role.name === "Muted");
    if(!muterole) return message.reply("You should create that role dude.");

    let mutetime = "30m";
    wUser.addRole(muterole);
    message.channel.send(`${wUser} has been temporarily muted \n Time: ${mutetime}`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`${wUser} has been unmuted.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).ban(reason);
    message.reply(`${wUser} has been banned.`)
  }

}
}
