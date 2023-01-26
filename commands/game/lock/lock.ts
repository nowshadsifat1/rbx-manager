import Discord from 'discord.js';

import BotClient from '../../../utils/classes/BotClient';
import CommandFile from '../../../utils/interfaces/CommandFile';
import MessagingService from '../../../utils/classes/MessagingService';

import config from '../../../config';

const messaging = new MessagingService(config);

const command: CommandFile = {
    run: async(interaction: Discord.CommandInteraction<Discord.CacheType>, client: BotClient, args: any): Promise<any> => {      
        let jobID = args["jobid"];
        let reason = args["reason"];
        try {
            await messaging.sendMessage("Lock", {
                jobID: jobID,
                reason: reason
            });
        } catch(e) {
            let embed = client.embedMaker({title: "Error", description: `There was an error while trying to send the lock request to the server: ${e}`, type: "error", author: interaction.user});
            return await interaction.editReply({embeds: [embed]});
        }
        await client.logAction(`<@${interaction.user.id}> has locked the server with the job id of **${jobID}** for the reason of **${reason}**`);
        let embed = client.embedMaker({title: "Success", description: "You've successfully locked the inputted server", type: "success", author: interaction.user})
        await interaction.editReply({embeds: [embed]});
    },
    slashData: new Discord.SlashCommandBuilder()
    .setName("lock")
    .setDescription("Locks the inputted server")
    .addStringOption(o => o.setName("jobid").setDescription("The job ID of the server you wish to lock").setRequired(true))
    .addStringOption(o => o.setName("reason").setDescription("The reason of why you want to lock the supplied server").setRequired(true)) as Discord.SlashCommandBuilder,
    commandData: {
        category: "Lock",
        permissions: config.permissions.game.lock
    }
}

export default command;