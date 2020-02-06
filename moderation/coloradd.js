module.exports = {
    name: "coloradd",
    aliases: ["addcolor"],
    category: "moderation",
    description:"Add role with color",
    usage:"_coloradd <hexcolor or r,g,b> <name>",
    run: (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));  
    if (!args[0])
      return message.reply("Không chọn màu thì kêu tao làm gì").then(m => m.delete(5000))
    if (!args[1])
      return message.reply("Không đặt tên role tao tạo bằng niềm tin").then(m => m.delete(5000))
    var color = args[0];
    let lowest_role = message.guild.roles.get('663988046009466880')
    let position = lowest_role.calculatedPosition
    let name = args.slice(1).join(" ")
        message.guild.createRole({
            name: name,
            color: color,
            position: position,
          })
        return message.channel.send(`Đã tạo role màu: **${name}** với hex code **${color}** ở vị trí **${position}**`)
    }
    }