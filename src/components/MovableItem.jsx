import {useDrag, useDrop} from "react-dnd";
import React, {useRef} from "react";

export const MovableItem = ({name, setItems, index, moveCardHandler}) => {

    const ref = useRef()

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



    const [, drop] = useDrop({
        accept: 'Our first type',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCardHandler(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });


    const [{isDragging}, drag] = useDrag({
        item: {name},
        type: 'Our first type',
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult && dropResult.name === 'Column 1') {
                changeItemColumn(item, 'Column 1')
            } else {
                changeItemColumn(item, 'Column 2')
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;
    drag(drop(ref))

    return (
        <div ref={ref} className='movable-item' style={{opacity}}>
            {name}
        </div>
    )
}


