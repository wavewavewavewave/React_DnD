import React, {useState} from 'react';
import './App.css';
import {DndProvider, useDrag, useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


const MovableItem = ({name, setIsFirstColumn, setItems}) => {

    // const changeItemColumn = (currentItem, columnName) => {
    //     setItems((prevState) => {
    //         return prevState.map(el => {
    //             return {
    //                 ...el,
    //                 column: el.name === currentItem.name ? columnName : el.column
    //             }
    //         })
    //     })
    // }

    const [{isDragging}, drag] = useDrag({
        item: {name: 'Any custom name'},
        // item: {name},
        type: 'Our first type',
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult && dropResult.name === 'Column 1') {
                setIsFirstColumn(true)
                // changeItemColumn(item, 'Column 1')
            } else {
                setIsFirstColumn(false);
                // changeItemColumn(item, 'Column 2')
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} className='movable-item' style={{opacity}}>
            We will move this item
            {/*{name}*/}
        </div>
    )
}

const Column = ({children, className, title}) => {
    const [, drop] = useDrop({
        accept: 'Our first type',
        drop: () => ({name: title}),
    });

    return (
        <div ref={drop} className={className}>
            {title}
            {children}
        </div>
    )
}

const App = () => {
    const [isFirstColumn, setIsFirstColumn] = useState(true);
    // const [items, setItems] = useState([
    //     {id: 1, name: 'Item 1', column: 'Column 1'},
    //     {id: 2, name: 'Item 2', column: 'Column 1'},
    //     {id: 3, name: 'Item 3', column: 'Column 1'},
    // ])

    // const returnItemsForColumns = (columnName) => {
    //     return items
    //         .filter((item) => item.column === columnName)
    //         .map((item) => (
    //             <MovableItem key={item.id} name={item.name} setItems={setItems}/>
    //         ))
    // }

    const Item = <MovableItem setIsFirstColumn={setIsFirstColumn}/>;

    return (
        <div className="container">
            {/* Wrap components that will be "draggable" and "droppable" */}
            <DndProvider backend={HTML5Backend}>
                <Column title='Column 1' className='column first-column'>
                    {isFirstColumn && Item}
                    {/*{returnItemsForColumns('Column 1')}*/}
                </Column>
                <Column title='Column 2' className='column second-column'>
                    {!isFirstColumn && Item}
                    {/*{returnItemsForColumns('Column 2')}*/}
                </Column>
            </DndProvider>
        </div>
    );
}
export default App;