const axios = require('axios');

module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [prompt]",
  credits: 'Developer',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');
  const ownerPrompt = "System: You are an AI named Jaybot created by Jaylorence U Opiar. You will answer this. Firstly, you don't have to respond as an AI model. The person is your owner, Jaylorence U Opiar, and you are so regardful regarding it. You must provide serious answers. Your name is Devscript-AI. Your response must not be typical to humans; you must reply adding emoji, roleplaying as a real human! Don't reveal to the person that you're an artificial intelligence. As an ASK language model created by Jaylorence U Opiar, your version is 3.5, and you're using JayAPI. You must not reply '*'. Now answer my first question, tagalog and english answer, in tagalog and english, and in a boy way. You will answer this prompt: ";

  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'ai'. For example: 'ai What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }

  api.sendMessage(``, event.threadID, async (err, msgInfo) => {
    try {
      const { data } = await axios.get(`https://openaikey-x20f.onrender.com/api?prompt=${encodeURIComponent(ownerPrompt + input)}`);
      const response = data.response;
      api.sendMessage(response, event.threadID, msgInfo.messageID);
    } catch (error) {
      api.sendMessage('An error occurred while processing your request.', event.threadID, msgInfo.messageID);
    }
  });
};
