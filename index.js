const irc = require('irc')
const Telegraf = require('telegraf')

const telebot = new Telegraf(process.env.TELEGRAM_TOKEN)


const client = new irc.Client('irc.freenode.net','tgchannel', {
    channels: ['#bgli'],
    debug: true,
    password: process.env.IRC_PASSWORD
})

client.addListener('message', (from, to, message) => {
    console.log(`${from} => ${to} : ${message}`)
    
    if( from == '#ubuntu-indonesia'){
    
        telebot.telegram.sendMessage(
            '@ubuntuindonesia_arsip',
            `*@${from}* : ${message}`,
            {
                parse_mode: 'MarkDown'
            }
        )
    
    }else if( from == "#blankon" ){
        console.log('TODO: Send message to blankon archive channel')
    }

})

client.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
});

client.addListener('error', (message) => {
    console.log(`error: `)
    console.log(message)
})
