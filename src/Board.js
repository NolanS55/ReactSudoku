import { numAtom, sudokuAtom } from '../src/store'
import { useAtom } from 'jotai'
import './css/Board.css'

const Board = () => {
    const [num] = useAtom(numAtom)
    var colorOne = '#ede6d3'
    var colorTwo = '#d1c097'
    var hold = ''

    const rowCheck = (rowIndex, board, number) => {
        if(board[rowIndex].indexOf(number) !== -1) {
            return false
        }
        return true
    }

    const colCheck = (index, board, number) => {
        for(let i = 0; i < 9; i++) {
            if(board[i][index] === number) {
                return false
            }
        }
        return true
    }

    const boxCheck = (rowIndex, index, board, number) => {
        let rowBox = Math.ceil((rowIndex + 1) / 3)
        let colBox = Math.ceil((index + 1) /3)
        for(let i = 0; i < 9; i++) {
            if(rowBox === Math.ceil((i + 1) / 3)) {
                for(let j = 0; j < 9; j++) {
                    if(colBox === Math.ceil((j + 1) / 3)) {
                        if(board[i][j] === number) {
                            return false
                        }
                    }
                }
            }
        }
        return true
    }

    const [sudokuBoard, setSudokuBoard] = useAtom(sudokuAtom)

    const placeNumber = (rowIndex, index, number) => {
        let tempBoard = [...sudokuBoard]
        if(rowCheck(rowIndex, tempBoard, number) && colCheck(index, tempBoard,number) && boxCheck(rowIndex, index, tempBoard, number)) {
            tempBoard[rowIndex][index] = number
            setSudokuBoard(tempBoard)
        }
    }


    return (
    <div className="sudokuBoard">
    {
        
        sudokuBoard.map((row, rowIndex) => {
            hold = colorOne//fix this
            colorOne = colorTwo
            colorTwo = hold
            return (
                row.map((tile, index) => {
                    if((rowIndex + 1) % 3 === 0 && rowIndex < 6) {
                        if((index + 1) % 3  === 0 && index < 6) {
                            return <div className="sqaure" id="bottomRightLine" style={(index % 2 === 0) ? {backgroundColor : colorOne} : {backgroundColor: colorTwo}} key={index}>
                            <button className='tile' onClick={() => placeNumber(rowIndex, index, num)}>{tile}</button>
                            </div>
                        }
                        else {
                            return <div className="sqaure" id="bottomLine" style={(index % 2 === 0) ? {backgroundColor : colorOne} : {backgroundColor: colorTwo}} key={index}>
                            <button className='tile' onClick={() => placeNumber(rowIndex, index, num)}>{tile}</button>
                            </div>
                        }
                    }
                    else if((index + 1) % 3  === 0 && index < 6) {
                        return <div className="sqaure" id="rightLine" style={(index % 2 === 0) ? {backgroundColor : colorOne} : {backgroundColor: colorTwo}} key={index}>
                        <button className='tile' onClick={() => placeNumber(rowIndex, index, num)}>{tile}</button>
                        </div>
                    }
                    else {
                        return <div className="sqaure" id="borderLess" style={(index % 2 === 0) ? {backgroundColor : colorOne} : {backgroundColor: colorTwo}} key={index}>
                        <button className='tile' onClick={() => placeNumber(rowIndex, index, num)}>{tile}</button>
                        </div>
                    }
                    
                    
                })
            )
        })        
    }
    </div> 
    );
}
 
export default Board;