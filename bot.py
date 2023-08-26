import discord
import os
import random
import aiohttp
from discord.ext import commands
from discord import Embed
import os
from dotenv import load_dotenv


intents = discord.Intents.all()
intents.guilds = True
intents.messages = True
bot = commands.Bot(command_prefix='#', intents=intents)


@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name}')


@bot.command()
async def rand(ctx):
    rand_num = random.randint(1, 100)
    await ctx.reply(f'Your random number between 1 and 100 is {rand_num}')

@bot.command()
async def cfact(ctx):
    async with aiohttp.ClientSession() as session:
        async with session.get('https://catfact.ninja/facts') as response:
            data = await response.json()
            cat_fact = random.choice(data['data'])['fact']
            await ctx.reply(cat_fact)

@bot.command()
async def cimg(ctx):
    async with aiohttp.ClientSession() as session:
        async with session.get('https://api.thecatapi.com/v1/images/search') as response:
            data = await response.json()
            cat_image = data[0]['url']
            cats_embed = Embed(title="Here's your random cat/kitten pic 🐱!!!")
            cats_embed.set_image(url=cat_image)
            await ctx.send(embed=cats_embed)

@bot.command()
async def aquo(ctx):
    async with aiohttp.ClientSession() as session:
        async with session.get('https://kyoko.rei.my.id/api/quotes.php') as response:
            data = await response.json()
            anim_embed = Embed(title="Here's your anime quote!!!")
            anim_embed.add_field(name=data['apiResult'][0]['anime'], value=f"{data['apiResult'][0]['english']} ~ {data['apiResult'][0]['character']}")
            await ctx.send(embed=anim_embed)

@bot.command()
async def aimg(ctx):
    async with aiohttp.ClientSession() as session:
        async with session.get('https://api.waifu.im/search') as response:
            data = await response.json()
            waifu_image = data['images'][0]['url']
            waifu_embed = Embed(title="Here's your random waifu 🐱!!!")
            waifu_embed.set_image(url=waifu_image)
            await ctx.send(embed=waifu_embed)

@bot.command()
async def jokes(ctx):
    async with aiohttp.ClientSession() as session:
        async with session.get('https://v2.jokeapi.dev/joke/dark') as response:
            data = await response.json()
            if data['type'] == "single":
                await ctx.reply(data['joke'])
            else:
                joke_embed = Embed(title="Jokes for people going to HELL!")
                joke_embed.add_field(name=data['setup'], value=data['delivery'])
                await ctx.send(embed=joke_embed)
bot.remove_command("help")
@bot.command()
async def help(ctx):
    help_embed = Embed(title="How to use this bot?", description="Tips to use this bot!")
    help_embed.set_author(name="Kaguya-sama")
    help_embed.add_field(name="#rand", value="It gives a random number between 1 to 100", inline=False)
    help_embed.add_field(name="#cfact", value="It gives a random fact about cats", inline=False)
    help_embed.add_field(name="#cimg", value="It gives a random wholesome cat/kitten picture", inline=False)
    help_embed.add_field(name="#aquo", value="It gives a random anime quote", inline=False)
    help_embed.add_field(name="#jokes", value="It gives a random dark joke", inline=False)
    help_embed.add_field(name="#aimg", value="It gives a random waifu ( ͡° ͜ʖ ͡°)", inline=False)
    await ctx.send(embed=help_embed)

load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")
bot.run(TOKEN)
