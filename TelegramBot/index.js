require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `👋 Hi ${msg.chat.first_name}! Send me a city name to get the current weather.`
  );
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const city = msg.text;

  if (city.toLowerCase() === "/start") return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
  try {
    const response = await axios.get(url);
    const data = response.data;

    const weatherInfo = `
        🌍 *Weather in ${data.name}, ${data.sys.country}*
        🌡 Temperature: ${data.main.temp}°C
        🌤 Condition: ${data.weather[0].description}
    💧  Humidity: ${data.main.humidity}%
        🌬 Wind: ${data.wind.speed} m/s
        `;

    bot.sendMessage(chatId, weatherInfo, { parse_mode: "Markdown" });
  } catch (error) {
    bot.sendMessage(
      chatId,
      `❌ Could not fetch weather for "${city}". Please check the city name.`
    );
  }
});
