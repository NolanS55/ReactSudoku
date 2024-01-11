import { useState} from 'react'

const placeNumber = (num) => {
    return num
}

const generateBoard = () => {
    
}

const Board = () => {

    var colorOne = '#ede6d3'
    var colorTwo = '#d1c097'

    const [sudokuBoard] = useState(['1','','','','','','','','',
    '','','','','','','','','',
    '','','','','','','','','',
    '','','','','','','','','',
    '','','','','','','','','',
    '','','','','','','','','',
    '','','','','','','','','',
    '','','','','','','','','',
    '','','','','','','','',''])

    return ( 
    <div className="sudokuBoard">
    {
        sudokuBoard.map((tile, index) => {
            let oldCone = colorOne//fix this
            let oldCtwo = colorTwo
            
            return <div className="sqaure" style={(index % 2 === 0) ? {backgroundColor : oldCone} : {backgroundColor : oldCtwo}} key={index}>
                <button onClick={() => (placeNumber(index))}><a>{tile}</a></button>
            </div>
            
        })        
    }
    </div> 
    );
}
 
export default Board;