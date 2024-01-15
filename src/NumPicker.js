import { numAtom } from '../src/store'
import { useAtom } from 'jotai'
import './css/NumPicker.css'

const NumPicker = () => {
    const numbers = [1,2,3,4,5,6,7,8,9]
    const [num, setNum] = useAtom(numAtom)

    return ( 
    <div className='numberPicker'>
        {
            numbers.map((number) => {
                return (<button onClick={() => setNum(number)} style={(number === num) ? {color:'white', backgroundColor: 'black'} : {color:'black', backgroundColor: 'white'}} key={number}>{number}</button>)
            })
        }
    </div> 
    );
}
 
export default NumPicker;