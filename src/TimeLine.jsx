import './TimeLine.scss'
import React from 'react';

const TimeLine = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}
             className="TimeLine">
        </div>
    )
})

export default TimeLine;