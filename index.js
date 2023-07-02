const discord = require('discord.js');
require('dotenv').config()
const { MessageAttachment,MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

const client = new discord.Client({
    intents:[
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready",()=>{
    console.log(`Logged in with ${client.user.tag}`)
})
client.on("messageCreate",(message)=>{
    if(message.content === "#rand"){
        const rand = Math.floor(Math.random()*100)+1
        message.reply(`Your random number between 1 and 100 is ${rand}`)
    }
    else if(message.content === "#cfact"){
        fetch('https://catfact.ninja/facts')
        .then((res)=>{
            return res.json();
        })
        .then((d)=>{
            message.reply(d.data[Math.floor(Math.random()*9)+1].fact);
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    else if(message.content === "#cimg"){
        const image = async ()=>{
            const res = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await res.json();
            //  console.log(data[0].url);

             const cats = {
                title: "Here's your random cat/kitten pic🐱!!!",
                image: {
                    url: data[0].url,
                },
            };
            message.channel.send({ embeds: [cats] });
        }
        image();
    }
    else if(message.content === "#aquo")
    {
        fetch('https://animechan.vercel.app/api/random')
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            // console.log(data);
            const anim = new MessageEmbed()
                .setTitle("Here's your anime quote!!!")
                .addFields(
                { name: data.anime, value: `${data.quote} ~ ${data.character}`})
            message.channel.send({ embeds: [anim]});
        })
    }
    else if(message.content === "#aimg"){
        const image = async ()=>{
            const res = await fetch('https://api.waifu.im/search');
            const data = await res.json();
            //  console.log(data.images[0].url);

             const cats = {
                title: "Here's your random waifu🐱!!!",
                image: {
                    url: data.images[0].url,
                },
            };
            message.channel.send({ embeds: [cats] });
        }
        image();
    }
    else if(message.content === "#jokes"){
        
        fetch("https://v2.jokeapi.dev/joke/dark")
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                if(data.type === "single"){
                    message.reply(`${data.joke}`);
                }
                else{
                    const joke = new MessageEmbed()
                .setTitle("Jokes for people going to HELL!")
                .addFields({name:data.setup,value:`${data.delivery}`});
                message.channel.send({embeds:[joke]})
                }
                
            })
    }
    else if(message.content === "#help"){
             const help = 
            {
                title: "How to use this bot?",
                author: {
                name: "Kaguya-sama will guide you",
            },
            fields: [
                {
                    name: '#rand',
                    value: "It gives a random number between 1 to 100",
                },
                {
                    name: '#cfact',
                    value: "It gives a random fact about cats",
                    inline: false,
                },
                {
                    name: '#cimg',
                    value: "It gives a random wholesome cat/kitten picture",
                    inline: true,
                },
                
                {
                    name: '#aquo',
                    value: "It gives a random anime quote",
                    inline: true,
                },
                {
                    name: '#jokes',
                    value: "It gives a random dark joke",
                    inline: true,
                },
                {
                    name: '#aimg',
                    value: "It gives a random waifu ( ͡° ͜ʖ ͡°)",
                    inline: true,
                }
                
            ],
            };
            message.channel.send({ embeds: [help]});
    }
    
})

client.login(process.env.TOKEN);
