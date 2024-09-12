import CommandsJson from "../../resources/commands.json";

interface CommandsDataStruct {
    name: string;
    description: string;
    triggers: string[];
    module: string;
}

interface CommandsStruct {
    [command: string]: CommandsDataStruct;
}

const CommandsJsonData: CommandsStruct = CommandsJson;

export default class CommandsData {

    private constructor() { }

    public static getCommands(): CommandsStruct {
        return CommandsJsonData;
    }

    public static getCommandExist(trigger: string): { status: boolean, data?: CommandsDataStruct } {
        for (const i in CommandsJsonData) {
            if (CommandsJsonData[i].triggers.includes(trigger)) {
                return { status: true, data: CommandsJsonData[i] };
            }
        }
        return { status: false };
    }

    public static getCommandData(trigger: string): CommandsDataStruct | false {
        const result = this.getCommandExist(trigger);
        if (result.status && result.data) {
            return result.data;
        }
        return false;
    }
}
