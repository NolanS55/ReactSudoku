import { useAtom } from "jotai";
import { sudokuAtom } from "./store";
import './css/Controls.css'



const Controls = () => {
    const [sudokuBoard, setSudokuBoard] = useAtom(sudokuAtom)

    const randInt = (max) => {
        return Math.floor(Math.random() * max)
    }

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

    const clearBoard = () => {
        setSudokuBoard([['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','','']])
    }


    const getNums = (rowIndex, index, board)  => {
        let nums = [];
        for(let i = 1; i < 10; i++) {
            if(rowCheck(rowIndex, board, i) && colCheck(index, board,i) && boxCheck(rowIndex, index, board, i)) {
                nums.push(i)
            }
        }
        return nums
    }

    const getEmpty = (rowIndex, index, board) => {
        let tempIndex = index;
        for(let i = rowIndex; i < 9; i++) {
            for(let j = tempIndex; j < 9; j++) {
                if(board[i][j] === '') {
                    return [i, j]
                }
            }
            tempIndex = 0
        }
        return [-1,-1]
    }


    const solve = (rowIndex, index, board) => {
        let curIndxs = getEmpty(rowIndex, index, board)
        rowIndex = curIndxs[0]
        index = curIndxs[1]
        if(rowIndex === -1) {
            return true
        }

        let nums = getNums(rowIndex, index, board);
        for(let m of nums) {
            board[rowIndex][index] = m
            if(index + 1 === 9) {
                index = 0
                if(solve(rowIndex + 1,index, board)) {
                    return true
                }
            }
            else {
                if(solve(rowIndex, index + 1, board)) {
                    return true
                }
            }
            
        }
        board[rowIndex][index] = ''
        return false
    }

    const solveBoard = (rowIndex, index, board) => {
        let tempBoard = [...board]
        if(solve(rowIndex,index, tempBoard) !== false) {
            setSudokuBoard(tempBoard)
        }
    }
    
    const setEmpty = (board) => {
        for(let i = 0; i < 9; i++) {
            for(let j =  0; j < 9; j++) {
                if(board[i][j] === undefined) {
                    board[i][j] = ''
                }
            }
        }
    }

    const generateBoard = () => {
        let tempBoard = [['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','','']]

        for(let k = 0; k < 9; k++) {
            let nums = getNums(0,k,tempBoard)
            tempBoard[0][k] = nums[randInt(nums.length)]
        }
        setEmpty(tempBoard)
        solve(0,0,tempBoard)
        for(let i = 0; i < 55; i++) {
            let rowRand = randInt(9)
            let colRand = randInt(9)
            if(rowRand !== '' && colRand !== '') {
                tempBoard[rowRand][colRand] = ''
            }
        }
        

        setSudokuBoard(tempBoard)


    }



    return ( 
    <div className="controls">
        <button onClick={clearBoard}>Clear Board</button>
        <button onClick={() => solveBoard(0, 0, sudokuBoard)}>Solve Board</button>
        <button onClick={generateBoard}>New Puzzle</button>
    </div> );
}
 
export default Controls;