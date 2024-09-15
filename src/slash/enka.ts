import { ChatInputCommandInteraction, Client, EmbedBuilder, Interaction, Message, SlashCommandBuilder } from 'discord.js';
import EnkaUtil, { Retcode, BriefDataStruct } from "../util/EnkaUtil"


export default async function execute(client: Client, interaction: ChatInputCommandInteraction) {

    await interaction.deferReply();

    const type = interaction.options.getString("type");
    const uid = interaction.options.getString("uid");

    if (type === "choice_detail") { 
        return interaction.followUp("not done"); 
    }

    const rsp = await EnkaUtil.getEnkaData(String(type), String(uid));

    if (rsp === Retcode.RET_UID_INVALID) {
        return interaction.followUp("Invalid UID");
    }
    if (rsp === Retcode.RET_ERR) {
        return interaction.followUp("oh");
    }
    if (rsp === Retcode.RET_MAINTENANCE) {
        return interaction.followUp("genshin died");
    }
    if (rsp === Retcode.RET_RATE_LIMIT) {
        return interaction.followUp("ermm");
    }

    const embed = EnkaUtil.makeEnkaBriefEmbed(rsp as BriefDataStruct);

    return interaction.followUp({ embeds: [embed] });
}
