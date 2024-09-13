import { Client, EmbedBuilder, messageLink, MessageReaction, TextChannel } from "discord.js"
import Config from "../util/Config"


const stars: string[] = []


export default async function execute(client: Client, reaction: MessageReaction) {

    if (reaction.message.author?.bot) { return }

    if (reaction.partial) {
        await reaction.fetch();
    }

    const reactionMsg = reaction.message;
    const reactionId = reaction.emoji.id;
    const starboardConfig = Config.getStarboardConfig();

    if (reactionId === starboardConfig.starReactionId && reaction.count >= 3 && !stars.includes(reactionMsg.id)) {
        stars.push(reactionMsg.id)
        const starEmbed = new EmbedBuilder()
            .setTitle(`<:${reaction.emoji.name}:${reaction.emoji.id}> ${reaction.count} | ${reactionMsg.author?.username}`)
            .setThumbnail(reactionMsg.author!.displayAvatarURL())
            .setDescription("No message provided")
            .setColor(reactionMsg.author?.hexAccentColor || "Blurple");

            if (reactionMsg.content) {
                starEmbed.setDescription(reactionMsg.content)
            }

            let url = reactionMsg.url
            if (reactionMsg.attachments.size > 0) {
                const attachment = reactionMsg.attachments.first();
                if (attachment) {
                    if (attachment.contentType?.startsWith('image/')) {
                        starEmbed.setImage(attachment.url);
                    } else if (attachment.contentType?.startsWith('video/')) {
                        url += "\n"+attachment.url
                    }
                }
            }
            

        const channel = client.channels.cache.get(starboardConfig.starboardChannelId) as TextChannel;
        const msg = await channel.send({content: url, embeds: [starEmbed]});
        msg.react(starboardConfig.starReactionId)
    }
}
