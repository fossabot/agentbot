module.exports = {
    name: "dui",
    category: "ạt role cho dui :) ",
    run: async(client, message, args) => {
        if (message.author.id == '455935236262592512') {
            const quocgia_role = '663984586757505034'
            const gioitinh_role = '663977844371619873'
            const status_role = '668691327701090314'
            const game_role = '663990034868994048'
            const sail = '664126775382507547'
            const us = '663984613152260113'
            const nam = '663976426609049601'
            const baobinh = '675194097207738369'
            const dontreachme = '668691531577688077'
            const csgo = '663976219473346560'
            message.mentions.members.first().addRoles([quocgia_role, gioitinh_role, status_role, game_role])
            message.reply(`Đã add tất cả role!`)
        }
    }
}