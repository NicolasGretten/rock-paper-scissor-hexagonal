import PlayerEntity from "src/Domain/Player.entity";
import GameService from "src/Domain/Game.service";
import {GameEnum} from "src/Domain/Game.enum";

export default interface ICommand {
    handleInput(input: string);
    runRound(playerOne: PlayerEntity, playerTwo: PlayerEntity, game: GameService, choice: GameEnum);
}