import { matchBattleData } from "./battle"
import { MatchState } from "./enums"

export default class TCGBattle {

    public matchId: string
    public challengerId: string
    public playerId: string
    public state: MatchState = MatchState.Battle
    public matchData: matchBattleData

    public curTurn: number = 0

    public constructor(matchId: string, challenger: string, player: string, matchData: matchBattleData) {
        this.matchId = matchId
        this.challengerId = challenger
        this.playerId = player
        this.matchData = matchData
    }

    public init() {
        
    }

}