import Board from "./Board";
import NumPicker from "./NumPicker";
import Controls from "./Controls";
import './css/Game.css'
const Game = () => {
    return ( <div className="Game">
        <Board></Board>
        <div className="buttons">
            <Controls></Controls>
            <br></br>
            <NumPicker></NumPicker>
        </div>    
    </div> );
}
 
export default Game;