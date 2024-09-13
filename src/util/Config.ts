import ConfigJson from "../../resources/config.json";

interface ConfigStruct {
    starboardConfig: {
        starboardChannelId: string,
        starReactionId: string
    },
}

const ConfigJsonData:ConfigStruct = ConfigJson

export default class Config {

    public static getStarboardConfig() {
        return ConfigJsonData.starboardConfig
    }

}