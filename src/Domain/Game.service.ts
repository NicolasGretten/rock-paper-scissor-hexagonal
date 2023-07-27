import PlayerEntity from "src/Domain/Player.entity";
import {GameEnum} from "src/Domain/Game.enum";
import DbAdapter from "src/Persistence/DbAdapter";

export default class GameService{
    whoIsWinner: any[] = [];
    history: any[] = [];
    matchIsOver = false;
    nbOfRounds = 0;
    actualRound = 0;
    private dbAdapter: DbAdapter


    constructor(
            nbOfRounds: number,
        ) {
        this.dbAdapter = new DbAdapter();
        this.nbOfRounds = nbOfRounds;
        this.history.push([{
            nbOfRounds: nbOfRounds
        }])
    }

    getWinnerHistory(){
        return this.whoIsWinner;
    }

    getHistory(){
        return this.history;
    }

    playRound(playerOne: PlayerEntity, playerTwo: PlayerEntity){

        if(!this.matchIsOver && this.actualRound !== this.nbOfRounds){
            this.actualRound++;
            if (playerOne.getChoice() === GameEnum.ROCK && playerTwo.getChoice() === GameEnum.PAPER) {
                this.mapResultInHistory(playerOne, playerTwo)
                this.whoIsWinner.push({
                    "choice": playerTwo.getChoice(),
                    "name": "Player Two"
                });
            } else if (playerOne.getChoice() === GameEnum.ROCK && playerTwo.getChoice() === GameEnum.SCISSOR) {
                this.mapResultInHistory(playerOne, playerTwo)
                this.whoIsWinner.push({
                    "choice": playerOne.getChoice(),
                    "name": "Player One"
                });
            } else if (playerOne.getChoice() === GameEnum.PAPER && playerTwo.getChoice() === GameEnum.ROCK) {
                this.mapResultInHistory(playerOne, playerTwo)
                this.whoIsWinner.push({
                    "choice": playerOne.getChoice(),
                    "name": "Player One"
                });
            } else if (playerOne.getChoice() === GameEnum.PAPER && playerTwo.getChoice() === GameEnum.SCISSOR) {
                this.mapResultInHistory(playerOne, playerTwo)
                this.whoIsWinner.push({
                    "choice": playerTwo.getChoice(),
                    "name": "Player Two"
                });
            } else if (playerOne.getChoice() === GameEnum.SCISSOR && playerTwo.getChoice() === GameEnum.ROCK) {
                this.mapResultInHistory(playerOne, playerTwo)
                this.whoIsWinner.push({
                    "choice": playerTwo.getChoice(),
                    "name": "Player Two"
                });
            } else if (playerOne.getChoice() === GameEnum.SCISSOR && playerTwo.getChoice() === GameEnum.PAPER) {
                this.mapResultInHistory(playerOne, playerTwo)
                this.whoIsWinner.push({
                    "choice": playerOne.getChoice(),
                    "name": "Player One"
                });
            } else if (playerOne.getChoice() === playerTwo.getChoice()) {
                this.mapResultInHistory(playerOne, playerTwo)
                this.whoIsWinner.push({
                    "choice": null,
                    "name": "match Null"
                });
            }
        }

        if(this.actualRound === this.nbOfRounds){
            this.dbAdapter.write(this.history)
        }

        return {
            round: `ROUND ${this.actualRound}  of  ${this.nbOfRounds}`,
            roundWinner: this.returnTheRoundWinner(),
            winner: this.actualRound === this.nbOfRounds ? this.returnTheWinner() : null
        }
    }

    returnTheWinner(){
        const one = this.whoIsWinner.filter(player => player.name === "Player One")
        const two = this.whoIsWinner.filter(player => player.name === "Player Two")

        this.matchIsOver = true;
        if(one.length > two.length) {
            return `PLAYER 1 WIN THE GAME`;
        }
        else {
            return `PLAYER 2 WIN THE GAME`;
        }
    }

    returnTheRoundWinner(){
        const name = this.whoIsWinner[this.actualRound - 1 ].name
        if(name === "match Null"){
            this.nbOfRounds++;
            return "Match Null vous pouvez rejouer le Round"
        } else {
            return `${this.whoIsWinner[this.actualRound - 1 ].name} WIN the Round`
        }
    }

    mapResultInHistory(playerOne: PlayerEntity, playerTwo: PlayerEntity){
        const playerOneResult = {
            "choice": playerOne.getChoice(),
            "name": "Player One",
            "round": this.actualRound
        }

        const playerTwoResult = {
            "choice": playerTwo.getChoice(),
            "name": "Player Two",
            "round": this.actualRound
        }

        this.history.push([playerOneResult, playerTwoResult]);

    }

    static randChoice(){
        const gameChoices = Object.values(GameEnum);
        const randomIndex = Math.floor(Math.random() * gameChoices.length);
        return GameEnum[gameChoices[randomIndex]];
    }
}