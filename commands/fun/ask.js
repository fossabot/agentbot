module.exports = {
    name: "ask",
    category: "fun",
    description: "Hỏi :)",
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply("Kêu tao lên đéo hỏi gì là tao tán vỡ mồm 😡")
        }
        const array = ["Hôm nay trời đẹp có sao , vì thế tao nói Không đó rồi sao??",
"Ngày rằm là ngày éo gì tao không biết nhưng tao biết 1 điều là : Không",
"Đụ má đang thất tình hỏi hỏi cc! Đéo!",
"Đáp án cuối cùng của tôi là : Đéo có đâu bạn",
"Trên trời có ngàn vì sao, ghép thành nhiều chữ : Hôm nay có sao thì tao nói Có này.",
"Mùa hè thì lạnh, Mùa đông thì không có, á đm Thằng Duy bảo tao trả lời là : Có..",
"Mình nghĩ là Có ý bạn, có gì like và follow mình nha",
"Đụ Má hỏi cc gì hỏi hoài hỏi cho lắm câu trả lời cũng sẽ là Yes thôi!!",
"Crush đã từ chối tao cho nên tao không biết suy nghĩ gì cả, đừng hỏi tao nữa",
"Trên trời có triệu vì sao, xếp thành vài chữ tại sao mày hỏi tao? Hỏi lằm hỏi lốn..",
"Mình xin lỗi nhưng việc thắc mắc của bạn không liên quan gì tới mình, Hỏi cc",
"Rosie is red, violet is blue.. đụ má hỏi nữa là tao cắt Cu!",
"Có!",
"Không",
"Tất nhiên là có",
"Tất nhiên là đéo rồi =))",
"Tao cần suy nghĩ lại về tình huống này",
"Hỏi mẹ mày ấy",
"Hỏi ba mày đi"]
        const random = array[Math.floor(Math.random() * array.length)];

        return message.reply(`${random}`);
    }
}