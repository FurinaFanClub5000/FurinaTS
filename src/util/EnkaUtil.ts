import axios from "axios"
import { EmbedBuilder } from "discord.js"

export enum Retcode {
    RET_UID_INVALID = 400,
    RET_MAINTENANCE = 424,
    RET_RATE_LIMIT = 429,
    RET_ERR = 1,
}

export interface ShowAvatarInfoListStruct {
    avatarId: number,
    level: number,
    energyType: number
}

export interface BriefDataStruct {
    playerInfo: {
        nickname: string,
        level: number,
        signature: string,
        worldLevel: number,
        nameCardId: number,
        finishAchievementNum: number,
        towerFloorIndex: number,
        towerLevelIndex: number,
        showAvatarInfoList?: ShowAvatarInfoListStruct[]
        showNameCardIdList?: number[]
        profilePicture: {
            avatarId: number
        },
        fetterCount: number,
        ttl: number,
        uid: number
    }
}

export default class EnkaUtil {

    public static async getEnkaData(type: string, uid: string): Promise<BriefDataStruct | Retcode> { // Now returns a Promise
        let apiUrl = type === "choice_brief" 
            ? `https://enka.network/api/uid/${uid}/` 
            : `https://enka.network/api/uid/${uid}/?info`;

        try {
            const response = await axios.get(apiUrl);

            if (response.status === 400 || response.status === 404) {
                return Retcode.RET_UID_INVALID;
            }

            // Return the actual data if the response is successful
            return response.data;
        } catch (error) {
            console.error(error);
            return Retcode.RET_ERR;
        }
    }

    public static makeEnkaBriefEmbed(data: BriefDataStruct): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setTitle(`${data.playerInfo.nickname} - lv${data.playerInfo.level}`)
            .setDescription(data.playerInfo.signature)
            .setThumbnail(`https://enka.network/ui/${data.playerInfo.profilePicture.avatarId}.png`)
            .setImage(`https://enka.network/ui/${data.playerInfo.nameCardId}.png`)
            .addFields(
                { name: "Worldlevel", value: data.playerInfo.worldLevel.toString() },
                { name: "Achievements", value: data.playerInfo.finishAchievementNum.toString() },
                { name: "Spiral Abyss", value: `${data.playerInfo.towerFloorIndex.toString()}/${data.playerInfo.towerLevelIndex.toString()}` },
                { name: "Friendships", value: data.playerInfo.fetterCount.toString() },
            );

        return embed;
    }
}
