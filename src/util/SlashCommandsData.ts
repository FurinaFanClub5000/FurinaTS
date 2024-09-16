import { SlashCommandBuilder } from "discord.js";
import SlashCommandsJson from "../../resources/SlashCommandData.json";

interface ChoiceListStruct {
    name: string;
    value: string;
}

interface OptionsListStruct {
    name: string;
    description: string;
    type: string;
    required: boolean;
    choiceList?: ChoiceListStruct[];
}

interface SlashCommandsStruct {
    name: string;
    description: string;
    optionsList?: OptionsListStruct[];
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

    public static makeSlashCommand(data: SlashCommandsStruct): SlashCommandBuilder {
        const SlashCommand = new SlashCommandBuilder()
            .setName(data.name)
            .setDescription(data.description);

        if (data.optionsList) {
            for (const option of data.optionsList) {
                switch (option.type) {
                    case "choice":
                        SlashCommand.addStringOption((opt) =>
                            opt.setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                                .addChoices(
                                    ...(option.choiceList?.map(choice => ({ name: choice.name, value: choice.value })) || [])
                                )
                        );
                        break;
                    case "string":
                        SlashCommand.addStringOption((opt) =>
                            opt.setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
                    case "boolean":
                        SlashCommand.addBooleanOption((opt) =>
                            opt.setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
                    case "integer":
                        SlashCommand.addIntegerOption((opt) =>
                            opt.setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
                    case "number":
                        SlashCommand.addNumberOption((opt) =>
                            opt.setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
                    case "user":
                        SlashCommand.addUserOption((opt) =>
                            opt.setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
                    case "channel":
                        SlashCommand.addChannelOption((opt) =>
                            opt.setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
                    case "role":
                        SlashCommand.addRoleOption((opt) =>
                            opt.setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
                    case "mentionable":
                        SlashCommand.addMentionableOption((opt) =>
                            opt.setName(option.name)
                                .setDescription(option.description)
                                .setRequired(option.required)
                        );
                        break;
                }
                
            }
        }

    return SlashCommand;
}

    
}
