import { ChatInputCommandInteraction, Client, EmbedBuilder, Interaction, Message, SlashCommandBuilder } from 'discord.js';
import EnkaUtil, { Retcode, BriefDataStruct } from "../util/EnkaUtil"


export default async function execute(client: Client, interaction: ChatInputCommandInteraction) {

    const uid = interaction.options.getString("uid");

    const rsp = await EnkaUtil.getEnkaData(String(uid));

    if (rsp === Retcode.RET_UID_INVALID) {
        return interaction.followUp("Invalid UID");
    }
    if (rsp === Retcode.RET_ERR) {
        return interaction.followUp("oh");
    }
    if (rsp === Retcode.RET_MAINTENANCE) {
        return interaction.followUp("Genshin is on Maintenance");
    }
    if (rsp === Retcode.RET_RATE_LIMIT) {
        return interaction.followUp("API is rate limited, Try again later");
    }

    const embed = EnkaUtil.makeEnkaBriefEmbed(rsp as BriefDataStruct);

    return interaction.followUp({ embeds: [embed] });
}
