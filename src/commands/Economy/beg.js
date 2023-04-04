const { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ecoSchema = require("../../Schemas.js/ecoSchema");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Beg for money!"),
    async execute (interaction) {
 
        const {user, guild} = interaction;
 
        let Data = await ecoSchema.findOne({ Guild: interaction.guild.id, User: interaction.user.id});
 
        let negative = Math.round((Math.random() * -300) -10)
        let positive = Math.round((Math.random() * 300) + 10)
 
        const posN =  [negative, positive];
 
        const amount = Math.round((Math.random() * posN.length));
        const value = posN[amount];
 
        if (!value) return await interaction.reply({ content: `No money for you!`, ephemeral: false });
 
        if (Data) {
            Data.Wallet += value;
            await Data.save();
        }
 
        if (value > 0) {
            const positiveChoices = [
                "Red gave you",
                "Someone gifted you",
                "You won the lottery, and got",
            ]
 
            const posName = Math.round((Math.random) * positiveChoices.length);
 
            const embed1 = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Beg Results")
            .addFields({ name: `Beg Result`, value: `${positiveChoices[[posName]]} $${value}`})
 
            await interaction.reply({ embeds: [embed1] });
        } else {
            const negativeChoices = [
                "You left your wallet on the bench, and lost",
                "Your bank got hacked, and the hackers took",
                "You got mugged and lost",
            ]
 
            const negName = Math.round((Math.random() * negativeChoices.length));
 
            const stringV = `${value}`;
 
            const nonSymbol = await stringV.slice(1);
 
            const embed2 = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Beg Result")
            .addFields({ name: `Beg Result`, value: `${negativeChoices[[negName]]} $${nonSymbol}`});
 
            await interaction.reply({ embeds: [embed2] });
        }
    }
}
