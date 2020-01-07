module.exports = {
    name: "test",
    description:"Create Role",
    run: (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));
    if (!args[0])
      return message.reply("Invalid")
        message.guild.createRole({
            name: args.join(' '),
            position: '12',
            hoist: 'true',
          })
        return message.reply("Done!")
    }
    }