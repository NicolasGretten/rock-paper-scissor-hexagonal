import ICommand from "src/Application/ICommand";
import PlayerEntity from "src/Domain/Player.entity";
import {GameEnum} from "src/Domain/Game.enum";
import GameService from "src/Domain/Game.service";

export default class HttpController implements ICommand{
    handleInput(input: string) {
    }

    runRound(playerOne: PlayerEntity, playerTwo: PlayerEntity, game: GameService, choice: GameEnum) {
    }

}