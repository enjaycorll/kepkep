const axios = require('axios');

module.exports.config = {
  name: 'verse',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['verse', 'randomverse'],
  description: "Get a random Bible verse",
  usage: "bibleverse",
  credits: 'Jaylorence U Opiar',
  cooldown: 3,
};

module.exports.run = async function({ api, event }) {
  api.sendMessage('Fetching random Bible verse...', event.threadID, async (err, msgInfo) => {
    try {
      const response = await axios.get('https://labs.bible.org/api/?passage=random&type=json');
      const { bookname, chapter, verse, text } = response.data[0];
      const verseMessage = `${bookname} ${chapter}:${verse}\n\n${text}`;
      api.sendMessage(verseMessage, event.threadID, msgInfo.messageID);
    } catch (error) {
      api.sendMessage('An error occurred while fetching the Bible verse.', event.threadID, msgInfo.messageID);
    }
  });
};
