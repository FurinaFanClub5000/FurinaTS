import { ActionRowBuilder, ActionRowComponent, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, Embed, EmbedBuilder, GuildTextBasedChannel, Interaction, MessageComponentInteraction, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js"
import { MatchState } from "../tcg/enums"
import { TCGUtil } from "../util/TCG"
import { matchBattleData } from "../tcg/battle"
import TCGBattle from "../tcg/tcgbattle"

function LineupEmbed() {
    let characters = ""
    TCGUtil.getCardDataFromType("Card_Avatar").forEach(s => {
        if (s.release == true) {
            characters += ` ${s.name}`
        }
    })
    const embed = new EmbedBuilder()
    .setTitle("Available Characters")
    .setDescription(characters)
    return embed
}

export class TCGMatchData {
    public static matches: TCGMatch[] = []

    public static getMatchFromUserId(user: string) {
        return this.matches.find(s => s.challengerId === user || s.playerId === user)
    }

    public static getMatchFromId(id: string) {
        return this.matches.find(s => s.matchId === id)
    }

    public static addMatch(match: TCGMatch) {
        this.matches.push(match)
    }

    public static removeMatch(matchId: string) {
        this.matches = this.matches.filter(s => s.matchId !== matchId)
    }
}

export class TCGMatch {

    public matchId: string
    public challengerId: string
    public playerId: string
    public state: MatchState = MatchState.None

    public readyStatus: string[] = []
    // @ts-ignore
    public battleModule: TCGBattle
    // @ts-ignore
    public matchData: matchBattleData = {}

    public constructor(matchId: string, challenger: string, player: string) {
        this.matchId = matchId
        this.challengerId = challenger
        this.playerId = player
    }

    public init() {
        this.state = MatchState.Matching
        TCGMatchData.addMatch(this)
        this.matchData[this.challengerId] = {
            lineup: [],
            summon: []
        }
        this.matchData[this.playerId] = {
            lineup: [],
            summon: []
        }
    }

    public setLineup(modalInteraction: ModalSubmitInteraction) {
        const lineupSubmit = modalInteraction.fields.getTextInputValue(`LineupRow`)
        const lineupNameData = lineupSubmit.split(" ")
        if (lineupNameData.length < 3 || lineupNameData.length > 3) {
            return modalInteraction.reply({content: "Invalid length, please put 3 characters", ephemeral: true})
        }
        lineupNameData.forEach(s => {
            const data = TCGUtil.getCardDataFromName(s)
            if (data.id === -1) {
                return modalInteraction.reply({content: "Invalid character(s)", ephemeral: true})
            }
            this.matchData[modalInteraction.user.id].lineup.push({
                characterId: data.id,
                maxHp: 10,
                curHp: 10,
                sp: 0,
                equipId: 0,
                relicId: 0,
                buffs: []
            })
        })
        modalInteraction.reply({content: "Done!", ephemeral: true})
        console.log(this.matchData)
    }

    public start(buttonInteraction: ButtonInteraction) {
        this.state = MatchState.Lineup
        const channel = buttonInteraction.message.channel as GuildTextBasedChannel
        const intervalEmbed = new EmbedBuilder()
        .setTitle("Interval: Lineup")
        .setColor("#1B203C")
        .setDescription("Please choose your characters")

        const LineupButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setCustomId(`Ready`).setStyle(ButtonStyle.Danger).setLabel("Ready (0/2)"),
            new ButtonBuilder().setCustomId(`Lineup`).setStyle(ButtonStyle.Secondary).setLabel("Edit Lineup"),
        )

        channel.send({embeds: [intervalEmbed]})
        channel.send({embeds: [LineupEmbed()], components: [LineupButton]})
    }

    public ready(buttonInteraction: ButtonInteraction) {
        if (this.readyStatus.includes(buttonInteraction.user.id)) {
            return
        }
        if (this.matchData[buttonInteraction.user.id].lineup.length !== 3) {
            buttonInteraction.reply({content: "Incomplete lineup , cannot ready.", ephemeral: true})
        }
        this.readyStatus.push(buttonInteraction.user.id)
        const LineupButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setCustomId(`Ready`).setStyle(ButtonStyle.Danger).setLabel(`Ready (${this.readyStatus.length}/2)`),
            new ButtonBuilder().setCustomId(`Lineup`).setStyle(ButtonStyle.Secondary).setLabel("Edit Lineup"),
        )
        buttonInteraction.update({embeds: [LineupEmbed()], components: [LineupButton]})
        if (this.readyStatus.length >= 2) {
            if (this.matchData[this.challengerId].lineup.length === 0 || this.matchData[this.playerId].lineup.length === 0) {
                return (buttonInteraction.channel as GuildTextBasedChannel).send("huh")
            }
            buttonInteraction.update({embeds: [LineupEmbed()]})
            const battle = new TCGBattle(this.matchId, this.challengerId, this.playerId, this.matchData)
            this.battleModule = battle
            this.battleModule.init()
        }

    }

    public showLineupModal(interaction: ButtonInteraction) {
        const modal = new ModalBuilder()
        .setCustomId("LineupModal_"+this.matchId)
        .setTitle("Edit Lineup")

        const row = new TextInputBuilder()
        .setCustomId("LineupRow")
        .setLabel("Set Lineup, Use space to seperate.")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder("Furina Dayvid Mayesha")
        modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(row))

        interaction.showModal(modal)
    }

    public AOD(status: string, buttonInteraction: ButtonInteraction) {
        if (buttonInteraction.user.id !== this.playerId) {
            return buttonInteraction.reply({content: "Not your match", ephemeral: true})
        }
        if (status === "accept") {
            buttonInteraction.message.edit({content: "Request Accepted", components: []})
            this.start(buttonInteraction)
        } else {
            buttonInteraction.message.edit({content: "Request Declined", components: []})
            TCGMatchData.removeMatch(this.matchId)
        }
    }
}