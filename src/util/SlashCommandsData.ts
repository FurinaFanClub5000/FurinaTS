import SlashCommandsJson from "../../resources/slash.json";

interface SlashCommandsStruct {
    name: string;
    description: string;
    module: string;
}

const SlashCommandsJsonData: SlashCommandsStruct[] = SlashCommandsJson;

export default class SlashCommandsData {

    private constructor() { }

    public static getSlashCommands(): SlashCommandsStruct[] {
        return SlashCommandsJsonData;
    }

    public static getSlashCommand(name: string): SlashCommandsStruct | false {
        const command = SlashCommandsJsonData.find(s => s.name === name);
        return command || false;
    }
    
}
