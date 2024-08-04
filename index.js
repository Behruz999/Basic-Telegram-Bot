const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();
const token = process.env.TOKEN;
const chats = {}

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
      [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
      [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
      [{text: '0', callback_data: '0'}]
    ]
  })
}

const startGame = async (chatId) => {
  bot.sendMessage(chatId, 'from 0 till 9 choosen number');
  const randomNumber = Math.floor( Math.random() * 10 );
  chats[chatId] = randomNumber;
    return bot.sendMessage(chatId, 'guess the random number :', gameOptions);
}

const bot = new TelegramBot(token, { polling: true });
bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  bot.setMyCommands([
    { command: "/start", description: "start chatting this bot" },
    { command: "/info", description: "about you" },
    { command: "/game", description: "play game" }
  ]);

  

  // console.log(msg);

  if (text === "/start")
    return bot.sendMessage(chatId, `we started listening to you....`);
  else if (
    text === "hello" ||
    text === "hi" ||
    text === "Hi" ||
    text === "Hello"
  )
    return (
      await bot.sendSticker(
        chatId,
        "https://stickerswiki.ams3.cdn.digitaloceanspaces.com/MemeS1ick3r/429750.512.mp4"
      ),
      bot.sendMessage(chatId, `hello, ${msg.from.first_name}`)
    );
  else if (
    text === "Fuck you" ||
    text === "Fuck" ||
    text === "Fak" ||
    text === "Fuk" ||
    text === "Motherfucker"
  )
    return (
      await bot.sendSticker(
        chatId,
        "https://stickerswiki.ams3.cdn.digitaloceanspaces.com/MemeS1ick3r/429755.160.gif"
      ),
      bot.sendMessage(chatId, "don't insult! 😡")
    );
  else if (text === "/info")
    return await bot.sendMessage(
      chatId,
      `your name is ${msg.from.first_name}, and also we can find you by your email @${msg.from.username}`
    );
  else if(text === '/game'){
    return startGame(chatId);
  }
  else return bot.sendMessage(chatId, `couldn't understand ⁉️ `);
});



bot.on("callback_query", async msg => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  console.log(chats[chatId]);
  
  const restartOption = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{text: 'restart', callback_data: '/restart'}]
      ]
    })
  }

  if(data === '/restart'){
    return startGame(chatId);
  }

  if(data == chats[chatId])
    return await bot.sendMessage(chatId, `congratulations🎉, random number was ${chats[chatId]}`);

  else {
    return await bot.sendMessage(chatId, `wrong answer! ❌ ${data}`, restartOption);
  }
});

console.log("bot working...");