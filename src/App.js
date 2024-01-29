import React, {useState} from 'react';
import './App.css';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {MovableItem} from "./components/MovableItem";
import {Column} from "./components/Column";


const App = () => {
    const [isFirstColumn, setIsFirstColumn] = useState(true);
    const [items, setItems] = useState([
        {id: 1, name: 'Item 1', column: 'Column 1'},
        {id: 2, name: 'Item 2', column: 'Column 1'},
        {id: 3, name: 'Item 3', column: 'Column 1'},
    ])

    const returnItemsForColumns = (columnName) => {
        return items
            .filter((item) => item.column === columnName)
            .map((item) => (
                <MovableItem key={item.id} name={item.name} setItems={setItems}/>
            ))
    }

    // const Item = <MovableItem name={items} setIsFirstColumn={setIsFirstColumn} setItems={setItems}/>;

    return (
        <div className="container">
            <DndProvider backend={HTML5Backend}>
                <Column title='Column 1' className='column first-column'>
                    {/*{isFirstColumn && Item}*/}
                    {returnItemsForColumns('Column 1')}
                </Column>
                <Column title='Column 2' className='column second-column'>
                    {/*{!isFirstColumn && Item}*/}
                    {returnItemsForColumns('Column 2')}
                </Column>
            </DndProvider>
        </div>
    );
}
export default App;
