require("dotenv").config();
const axios = require("axios");

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/deadbot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

const quotes = [
	"With great power comes great irresponsibility.",
	"I'm about to do to you what Limp Bizkit did to music in the late '90s.",
	"You may be wondering why the red suit. Well, that's so bad guys can't see me bleed.",
	"I'm Batman",
	"The name's Pool. Deadpool.",
	"Maximum effort!",
	"Four or five moments - that's all it takes to be a hero.",
	"I'm gonna do this the old-fashioned way, with two swords and maximum effort.",
	"Hey, its me!",
	"Sorry, Logan. You had to die to make this happen.",
	"It's like I made you in a computer!",
	"Fourth wall? What fourth wall?",
	"Cue the music.",
	"I can't tell you, but it does rhyme with 'Polverine'.",
	"I just disturb them.",
	"Wham!",
	"I smell what you're stepping in. The power in the Marvel Universe is about the change forever. I am the Messiah. I am Marvel Jesus",
	"Welcome to the MCU. You're joining at a bit of a low point.",
	"My brain could taste your fingers and they tasted like hate! And where in God's name is the intimacy coordinator?",
	"Fox killed him. Disney brought him back. They're gonna make him do this till he's 90.",
	"Who is your dialect coach? The Minions?",
	"I made an educated wish!",
	"You were droning on!",
	"Listen Al, if I never see you again, I want you to know that I love you very much. I also buried 1,600 kilos of cocaine somewhere in the apartment – right next to the cure for blindness. Good luck."
];

app.command("/deadbot-quote", async ({ ack, respond }) => {
  await ack();
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  await respond({ text: randomQuote });
});


app.command("/deadbot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/deadbot-ping - Check bot latency
/deadbot-help - The command you just used
/deadbot-quote - Get a random quote`
  });
});








(async () => {
  await app.start();
  console.log("bot is running!");
})();

