import React, { Fragment, useEffect, useRef, useState, useMemo, useCallback} from 'react';

import moment from "moment";
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

const Calendar = (props) => {
    const {onPause, offPause, incrementBack, incrementForward, homeRef, setScrollCanTrigger} = props;


    const [dates, setDates] = useState([])
    const todayRef = useRef();
    const timeLineRef = useRef();
    const [scrollFlag, setScrollFlag] = useState(true);
    const [oldWidth, setOldWidth] = useState(0);
    const [refMonth, setRefMonth] = useState([]);
    const [refText, setRefText] = useState([]);

    const scale = {
        width: 200,
        height: 60
    }

    const innerText = useRef();

    let interval;
    let today = moment();

    useEffect(() => {
        setDates(() => {
            const arr = [];
            const range = 10;
            for (let i = -range; i < range + 1; i++) {
                arr.push(moment().add(i, 'days').startOf('day'))
            }
            return arr
        })
    }, [])

    // useEffect(() => {
    //     scrollToToday();
    //     interval = setInterval(() => {
    //         calcTimeLine();
    //         !moment().isSame(today, 'day') ? window.location.reload() : null;
    //     }, 60000);
    //     monthPositionHandler();
    //     monthTextRef();
    //     return () => {
    //         clearInterval(interval);
    //     }
    // }, []);

    // useEffect(() => {
    //     calcTimeLine();
    //     if (oldWidth < homeRef.firstChild.clientWidth) {
    //         scrollToRightAfterBack(oldWidth, homeRef.firstChild.clientWidth);
    //         setOldWidth(homeRef.firstChild.clientWidth);
    //     }
    // });

    // const scrollToRightAfterBack = (oldWidth, newWidth) => {
    //     if (homeRef.scrollLeft < 10) {
    //         homeRef.scrollTo(newWidth - oldWidth, 0);
    //     }
    // };

    // const scrollToToday = () => {
    //     let shift = 0;
    //     timeLineRef.current ? shift = timeLineRef.current.offsetLeft - (window.innerWidth / 5) : null;
    //     if (homeRef && todayRef.current) {
    //         homeRef.scrollTo(todayRef.current.offsetLeft - (window.innerWidth / 5) + shift, 0);
    //         homeRef.addEventListener('scroll', () => {
    //             setScrollFlag(false)
    //         });
    //     }
    // };

    // const loadMoreDatesHandler = ({cycleBack, cycleForward, scrollCanTrigger}) => {
    //     if (homeRef.firstChild.clientWidth - homeRef.clientWidth + 1 - homeRef.scrollLeft < 10) {
    //         if (scrollCanTrigger) {
    //             setScrollCanTrigger(false)
    //             onPause();
    //             loadMoreDates('forward', config.TASK_RANGE);
    //             loadMoreTasks('forward', cycleForward, config.TASK_RANGE, () => {
    //                 incrementForward();
    //                 offPause();
    //             });
    //         }
    //     }
    //     if (homeRef.scrollLeft < 10) {
    //         if (scrollCanTrigger) {
    //             setScrollCanTrigger(false)
    //             onPause();
    //             loadMoreDates('back', config.TASK_RANGE);
    //             loadMoreTasks('back', cycleBack, config.TASK_RANGE, () => {
    //                 incrementBack();
    //                 offPause();
    //             });
    //         }
    //     }
    //
    //     if (homeRef.scrollLeft > 10 && homeRef.firstChild.clientWidth - homeRef.clientWidth + 1 - homeRef.scrollLeft > 10) {
    //         setScrollCanTrigger(true)
    //     }
    // };

    // const calcTimeLine = () => {
    //     const date = moment();
    //     const dateZero = moment().startOf('days');
    //     let timePercent = Math.round((date.valueOf() - dateZero.valueOf()) * 10000 / 86400000);
    //     timeLineRef.current ? timeLineRef.current.style.left = timePercent / 100 + '%' : null;
    // };

    const monthsSpan = useMemo(() => {
        return dates.filter((date, i, arr) => {
            if (i > 0) {
                // console.log('monthSpan calculate')
                return date.month() !== arr[i - 1].month()
            }
            // console.log('monthSpan calculate')
            return true;

        })

    }, [dates]);

    const weeksSpan = dates.filter((date, i, arr) => {
        if (i > 0) {
            return date.week() !== arr[i - 1].week()
        }
        return true;
    });

    // const setMonthRef = useCallback(ref => {
    //     if (ref !== null) {
    //         monthsSpan.map(() => {
    //             if (!refMonth.find(item => item.innerText === ref.innerText)) {
    //                 setRefMonth(prevState => prevState.concat(ref))
    //             }
    //         })
    //     }
    // }, []);
    //
    // const setTextRef = useCallback(ref => {
    //     if (ref !== null) {
    //         monthsSpan.map(() => {
    //             if (!refText.find(item => item.innerText === ref.innerText)) {
    //                 setRefText(prevState => prevState.concat(ref))
    //             }
    //         })
    //     }
    // }, []);
    //
    //
    // const monthPositionHandler = () => {
    //     monthsSpan.forEach((item, i) => {
    //         if (refMonth[i*2]) {
    //             const refPos = refMonth[i*2].getBoundingClientRect();
    //             let pos = -refPos.left + homeRef.clientWidth / 2;
    //             if (-refPos.left + homeRef.clientWidth / 2 > refPos.width - 130) {
    //                 pos = refPos.width - 130;
    //             }
    //             if (refPos.right - homeRef.clientWidth / 2 > refPos.width - 20) {
    //                 pos = 20;
    //             }
    //
    //             innerText.current = {
    //                 ...innerText.current,
    //                 [refMonth[i*2].innerText]: pos,
    //             };
    //         }
    //     })
    //
    // };
    //
    // const monthTextRef = () => {
    //     monthsSpan.forEach((item, i) => {
    //         refText[i*2] && !isEmpty(innerText.current) ? refText[i*2].style.left = innerText.current[refText[i*2].innerText] + 'px' : null;
    //     })
    // };

    // console.log('calendar render')
    return (
        <Fragment>
            <tr className="months">
                <td>Month</td>
                {monthsSpan.map((item, index) => <td key={index}
                                                     // ref={setMonthRef}
                                                     colSpan={index !== monthsSpan.length - 1 ? item.daysInMonth() - (item.date() - 1) : dates[dates.length - 1].date()}>
                    <div className="month-position"
                         // ref={setTextRef}
                         style={{
                             position: 'absolute',
                             top: 0,
                         }}
                    >{item.format('MMMM')} / {item.format('YYYY')}</div>
                </td>)}
            </tr>
            <tr className="weeks">
                <td>Week</td>
                {weeksSpan.map((item, index) => <td key={item.weekday() + item.format()}
                                                    colSpan={index !== weeksSpan.length - 1 ? 8 - (item.weekday() + 1) : dates[dates.length - 1].weekday() + 1}>
                    {item.week()}</td>)}
            </tr>
            <tr className="days">
                <td style={{
                    minWidth: '200px'
                }}>Day
                </td>
                {dates.map((date, index) => <td key={date.format() + index}
                                                ref={moment().isSame(date, 'day') ? todayRef : null}
                                                className={moment().isSame(date, 'day') ? 'today' : null}
                                                style={{
                                                    minWidth: scale.width + 'px'
                                                }}
                >
                    <div>{date.date()} / {date.format('dd')}</div>
                    {/*{scale.width > 100 ? <Hours scale={scale}/> : null}*/}
                    {/*{moment().isSame(date, 'day') ? <TimeLine ref={timeLineRef}/> : null}*/}

                </td>)}
            </tr>
        </Fragment>
    )
}

export default React.memo(Calendar)