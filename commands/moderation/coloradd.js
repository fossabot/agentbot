module.exports = {
    name: "coloradd",
    description:"Add role with color",
    usage:"_coloradd <hexcolor or r,g,b> <name>",
    run: (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));
    if (!args[0])
      return message.reply("Không chọn màu thì kêu tao làm gì")
    if (!args[1])
      return message.reply("Không đặt tên role tao tạo bằng niềm tin").then(m => m.delete(5000))
    let name = args.slice(1).join(" ")
        message.guild.createRole({
            name: name,
            color: args[0],
            position: '43',
          })
        return message.reply("Done!")
    }
    }
