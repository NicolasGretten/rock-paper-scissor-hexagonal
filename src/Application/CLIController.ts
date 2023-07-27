import PlayerEntity from "src/Domain/Player.entity";
import GameService from "src/Domain/Game.service";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import {Command} from "commander";
import * as readline from "readline";
import {GameEnum} from "src/Domain/Game.enum";
import ICommand from "src/Application/ICommand";

export default class CLIController implements ICommand{
    playerOne: PlayerEntity;
    playerTwo: PlayerEntity;
    game: GameService;
    rl: any;

    constructor() {
        clear();

        const program = new Command();

        console.log(
            chalk.red(
                figlet.textSync('PIERRE-FEUILLE-CISEAUX-cli', { horizontalLayout: 'full' }),
            )
        );
        console.log("taper help pour connaitre les commandes pour joué")

        program
            .version('0.0.1')
            .description("An example CLI for ordering pizza's")
            .option('-p, --peppers', 'Add peppers')
            .parse(process.argv);

        const options = program.opts();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.rl.on('line', (input: string) => {
            this.handleInput(input);
        });
    }

    handleInput(input: string) {

        // Réagir en fonction de l'entrée de l'utilisateur
        switch (input.trim()) {
            case 'new game':
                this.playerOne = new PlayerEntity()
                this.playerTwo = new PlayerEntity()
                this.rl.question('Combien de round souhaitez-vous jouer ? ', (nbOfRounds: string) => {
                    this.game = new GameService(parseInt(nbOfRounds));
                    console.log("la partie est commencé, veuillez faire votre choix avec 'rock', 'paper' ou 'scissor'")
                });
                break;
            case 'rock':
                this.runRound(this.playerOne, this.playerTwo, this.game, GameEnum.ROCK)
                break;
            case 'paper':
                this.runRound(this.playerOne, this.playerTwo, this.game, GameEnum.PAPER)
                break;
            case 'scissor':
                this.runRound(this.playerOne, this.playerTwo, this.game, GameEnum.SCISSOR)
                break;
            case 'win history':
                if(this.game)console.log(this.game.getWinnerHistory())
                else console.log("veuillez démarrer une partie pour pouvoir consulter l'historique de victoire")
                break;
            case 'history':
                if(this.game)console.log(this.game.getHistory())
                else console.log("veuillez démarrer une partie pour pouvoir consulter l'historique")
                break;
            case 'help':
                console.log("new game : pour joué une nouvelle partie")
                console.log("rock / paper / scissor : faites votres choix et joué le round")
                console.log("win history : voir l'historique des manches gagné")
                // this.rl.close();
                // process.exit(0);
                break;
            default:
                console.log(`Unknown command: ${input}`);
                break;
        }
    }

    runRound(playerOne: PlayerEntity, playerTwo: PlayerEntity, game: GameService, choice: GameEnum) {
        if (game){
            if (playerOne) playerOne.setChoice(choice)
            if (playerTwo) playerTwo.setChoice()
            const round = game.playRound(playerOne, playerTwo);
            if(round.round){
                console.log(chalk.white(
                    figlet.textSync(round.round),
                ))
            }
            if(round.roundWinner){
                console.log(round.roundWinner)
            }
            if(round.winner){
                console.log(chalk.green(
                    figlet.textSync(round.winner),
                ))
            }

        } else {
            console.log("Veuillez lancé la partie en tapant 'new game' avant de faire votre choix")
        }
    }

}