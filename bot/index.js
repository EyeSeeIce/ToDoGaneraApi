const TelegramBot = require('node-telegram-bot-api')

const token = '5483712384:AAFrDx19brsdX0vHTS6spJFL1MX-KkDMsm0';

const bot = new TelegramBot(token, {polling: true});


bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, JSON.stringify(msg, 4));
});

module.exports = bot