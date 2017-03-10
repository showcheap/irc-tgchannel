const irc = require('irc')
const Telegraf = require('telegraf')
const express = require('express')

const app = express()
const telebot = new Telegraf(process.env.TELEGRAM_TOKEN)


const client = new irc.Client('irc.freenode.net','tgchannel', {
    channels: ['#ubuntu-indonesia','#bgli','#blankon'],
    debug: false,
    password: process.env.IRC_PASSWORD
})

client.addListener('message', (from, to, message) => {
    console.log(`${from} => ${to} : ${message}`)
    
    if( to == "#ubuntu-indonesia"){
    
        telebot.telegram.sendMessage(
            '@ubuntuindonesia_arsip',
            `*@${from}* : ${message}`,
            {
                parse_mode: 'MarkDown'
            }
        )
    
    }else if( to == "#blankon" ){
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

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)