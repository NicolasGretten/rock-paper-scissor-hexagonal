import {GameEnum} from "src/Domain/Game.enum";
import GameService from "src/Domain/Game.service";

export default class PlayerEntity{
    choice: GameEnum = GameService.randChoice()

    getChoice(): GameEnum{
        return <GameEnum>this.choice
    }

    setChoice(choice: GameEnum | null  = null): GameEnum{
        if(choice){
            return this.choice = choice
        } else {
            return this.choice = GameService.randChoice();
        }
    }
}