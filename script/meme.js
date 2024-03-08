const fs = require('fs');
const axios = require('axios');
const path = require('path');

const apiUrl = 'https://meme-api.com/gimme';
const cacheFolder = path.join('./cache');

if (!fs.existsSync(cacheFolder)) {
  fs.mkdirSync(cacheFolder);
}

async function fetchMeme() {
  try {
    const response = await axios.get(apiUrl);
    const memeData = response.data;

    const imageUrl = memeData.url;
    const title = memeData.title;
    const imagePath = path.join(cacheFolder, path.basename(imageUrl));

    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(imagePath, imageResponse.data);

    const result = {
      body: title,
      attachment: imagePath
    };

    console.log(JSON.stringify(result));
    return result;
  } catch (error) {
    console.error('Error fetching meme:', error.message);
    throw error;
  }
}

module.exports.config = {
  name: 'meme',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['memes', 'randommeme'],
  description: "Get a random meme",
  usage: "meme",
  credits: 'Jaylorence U Opiar',
  cooldown: 3,
};

module.exports.run = async function({ api, event }) {
  api.sendMessage('Fetching random meme...', event.threadID, async (err, msgInfo) => {
    try {
      const memeData = await fetchMeme();
      api.sendMessage(memeData.body, event.threadID, msgInfo.messageID);
      api.sendMessage({
        attachment: fs.createReadStream(memeData.attachment)
      }, event.threadID, () => {
        fs.unlinkSync(memeData.attachment); // Delete the meme file after sending
      });
    } catch (error) {
      api.sendMessage('An error occurred while fetching the meme.', event.threadID, msgInfo.messageID);
    }
  });
};
