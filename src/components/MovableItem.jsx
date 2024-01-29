import {useDrag} from "react-dnd";
import React from "react";

export const MovableItem = ({name ,setIsFirstColumn, setItems}) => {

    const changeItemColumn = (currentItem, columnName) => {
        setItems((prevState) => {
            return prevState.map(el => {
                return {
                    ...el,
                    column: el.name === currentItem.name ? columnName : el.column
                }
            })
        })
    }

    const [{isDragging}, drag] = useDrag({
        item: {name},
        type: 'Our first type',
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult && dropResult.name === 'Column 1') {
                // setIsFirstColumn(true)
                changeItemColumn(item, 'Column 1')
            } else {
                // setIsFirstColumn(false);
                changeItemColumn(item, 'Column 2')
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });




    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} className='movable-item' style={{opacity}}>
            {/*We will move this item*/}
            {name}
        </div>
    )
}


