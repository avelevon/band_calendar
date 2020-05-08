import './Hours.scss'
import React, {Fragment, PureComponent} from 'react';

const Hours = props => {
    const width = props.scale;

    const period3 = [0, 1, 2, 3, 4, 5, 6, 7];
    const period24 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    return (
        <div className="Hours">
            {width <= 600 ? period3.map((a) => <div key={a} className="hours3">
                    {/*<div className="working-hours3"></div>*/}
                    <div className="hours1"></div>
                    <div className="hours1"></div>
                    <div className="hours1"></div>
                </div>
                ) :
                period24.map((a) => <div key={a} className="hours24">
                    {width >= 1000 ? <Fragment>
                        <div className="hours60"></div>
                        <div className="hours60"></div>
                        <div className="hours60"></div>
                        <div className="hours60"></div>
                    </Fragment> : null}
                </div>)
            }
        </div>
    )
}

export default Hours;