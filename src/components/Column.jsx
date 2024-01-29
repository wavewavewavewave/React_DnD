import {useDrop} from "react-dnd";
import React from "react";

export const Column = ({children, className, title}) => {
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