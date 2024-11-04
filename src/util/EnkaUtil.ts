import axios from "axios"
import { EmbedBuilder, EmbedFooterOptions } from "discord.js"
import ProfilePictureJsonData from "../../resources/enka/ProfilePicture.json"
import NamecardJsonData from "../../resources/enka/Namecard.json"

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
            avatarId?: number
            id?: number
        },
        theaterActIndex?: number,
        theaterModeIndex?: number,
        theaterStarIndex?: number,
        fetterCount: number,
    }
    uid: number,
    ttl: number
}
export default class EnkaUtil {

    public static async getEnkaData(uid: string): Promise<BriefDataStruct | Retcode> {
        let apiUrl = `https://enka.network/api/uid/${uid}/?info`;

        try {
            const response = await axios.get(apiUrl);

            if (response.status === 400 || response.status === 404) {
                return Retcode.RET_UID_INVALID;
            }

            return response.data;
        } catch (error) {
            console.error(error);
            return Retcode.RET_ERR;
        }
    }

    public static makeEnkaBriefEmbed(data: BriefDataStruct): EmbedBuilder {
        const profilePicture = EnkaResources.getProfilePicture(data.playerInfo.profilePicture.id ?? data.playerInfo.profilePicture.avatarId ?? 0) // Get the profile picture
        const namecard = EnkaResources.getNamecard(data.playerInfo.nameCardId) // Get the namecard 
        const embed = new EmbedBuilder()
            .setTitle(`${data.playerInfo.nickname} - lv${data.playerInfo.level}`)
            .setDescription(data.playerInfo.signature || "No signature")
            .setThumbnail(`https://enka.network/ui/${profilePicture}.png`)
            .setImage(`https://enka.network/ui/${namecard}.png`)
            .addFields(
                { name: "Worldlevel", value: data.playerInfo.worldLevel.toString() },
                { name: "Achievements", value: data.playerInfo.finishAchievementNum.toString() },
                { name: "Spiral Abyss", value: `${data.playerInfo.towerFloorIndex.toString()}/${data.playerInfo.towerLevelIndex.toString()}` || "Not yet participated" },
                { name: "Schizo Theater", value: `Act ${data.playerInfo.theaterActIndex} / Mode ${data.playerInfo.theaterModeIndex} / ${data.playerInfo.theaterStarIndex} Stars` || "Not yet participated" },
                { name: "Friendships", value: data.playerInfo.fetterCount.toString() },
            )
            .setFooter({text: `UID: ${data.uid}`})

        return embed;
    }
}

export class EnkaResources {

    public static getProfilePictureData(): {[id: string]: string} {
        return ProfilePictureJsonData
    }

    public static getNamecardData(): {[id: string]: string} {
        return NamecardJsonData
    }

    public static getProfilePicture(id: string | number): string {
        if (typeof id === 'number') {
            id = id.toString()
        }
        if (id in ProfilePictureJsonData) {
            return ProfilePictureJsonData[id as keyof typeof ProfilePictureJsonData] // idk what im doing
        }
        return ""
    }
    

    public static getNamecard(id: string | number): string {
        if (typeof id === 'number') {
            id = id.toString()
        }
        if (id in NamecardJsonData) {
            return NamecardJsonData[id as keyof typeof NamecardJsonData]
        }
        return ""
    }

}
