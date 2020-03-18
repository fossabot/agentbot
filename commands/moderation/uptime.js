module.exports = {
    name: "uptime",
    category: "moderation",
    description: "Show uptime",
    usage: "_uptime",
    run: async(bot, message, args) => {
        function duration(ms) {
            var sec = Math.floor((ms / 1000) % 60).toString()
            var min = Math.floor((ms / (1000 * 60)) % 60).toString()
            var hrs = Math.floor((ms / (1000 * 60 * 60)) % 60)
            while (hrs > 24) {
                var hrs = (hrs - 24).toString()
            }
            var day = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
            return `${day.padStart(1,'0')} ngày, ${hrs.toString().padStart(2,'0')} giờ, ${min.padStart(2,'0')} phút, ${sec.padStart(2,'0')} giây.`
        }
        message.channel.send(`Mình đã online được: ${duration(bot.uptime)}`)
    }
}