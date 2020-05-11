import './Calendar.scss'
import React, {Fragment, useEffect, useRef, useState, useMemo, useCallback} from 'react';

import TimeLine from "./TimeLine";
import Hours from "./Hours";

import moment from "moment";
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

const Calendar = props => {
    const {
        homeNode,
        range,
        dayMinWidth = '200px',
        firstTdWidth = '200px',
        scrollToToday = true,
        dates,
    } = props;

    const [todayNode, setTodayNode] = useState()
    // const [dates, setDates] = useState([])
    const timeLineRef = useRef();
    const [refMonth, setRefMonth] = useState([]);
    const [refText, setRefText] = useState([]);

    const innerText = useRef();

    let interval;
    let today = moment();

    // useEffect(() => {
    //     let start = range[0]
    //     let end = range[1]
    //
    //     if (range[0] === -1) {
    //         start = moment().dayOfYear() - 1
    //     }
    //
    //     if (range[1] === -1) {
    //         const year = moment().year()
    //         end = moment(`${year}-12-31`).dayOfYear() - moment().dayOfYear()
    //     }
    //
    //     setDates(() => {
    //         const arr = [];
    //         for (let i = -start; i < end + 1; i++) {
    //             arr.push(moment().add(i, 'days').startOf('day'))
    //         }
    //         return arr
    //     })
    // }, [range])

    useEffect(() => {
        homeNode && !isEmpty(refMonth) && !isEmpty(refText) ? homeNode.addEventListener('scroll', monthPositionHandler) : null
        return () => homeNode.removeEventListener('scroll', monthPositionHandler)
    }, [homeNode, refMonth, refText])

    useEffect(() => {
        if (todayNode && homeNode && scrollToToday) {
            scrollToTodayFun();
            calcTimeLine();
        }
        // interval = setInterval(() => {
        //     calcTimeLine();
        //     !moment().isSame(today, 'day') ? window.location.reload() : null;
        // }, 60000);
        // monthPositionHandler();
        // monthTextRef();
        // return () => {
        //     clearInterval(interval);
        // }
    }, [todayNode, homeNode, scrollToToday]);

    const scrollToTodayFun = () => {
        if (homeNode && todayNode) {
            homeNode.scrollTo(todayNode.offsetLeft - (window.innerWidth / 2) + (todayNode.clientWidth / 2), 0);
        }
    };

    const calcTimeLine = () => {
        const date = moment();
        const dateZero = moment().startOf('days');
        let timePercent = Math.round((date.valueOf() - dateZero.valueOf()) * 10000 / 86400000);
        timeLineRef.current ? timeLineRef.current.style.left = timePercent / 100 + '%' : null;
    };

    const monthsSpan = useMemo(() => dates.filter((date, i, arr) => i > 0 ? date.month() !== arr[i - 1].month() : true), [dates]);

    const weeksSpan = dates.filter((date, i, arr) => {
        if (i > 0) {
            return date.week() !== arr[i - 1].week()
        }
        return true;
    });

    const setMonthRef = useCallback(ref => {
        if (ref !== null) {
            setRefMonth(prevState => prevState.concat(ref))
        }
    }, []);

    const setTextRef = useCallback(ref => {
        if (ref !== null) {
            setRefText(prevState => prevState.concat(ref))
        }
    }, []);


    const monthPositionHandler = () => {
        monthsSpan.forEach((item, i) => {
            if (refMonth[i]) {
                const refPos = refMonth[i].getBoundingClientRect();
                let pos = -refPos.left + homeNode.clientWidth / 2 - (refText[i].clientWidth / 2);
                if (-refPos.left + homeNode.clientWidth / 2 > refPos.width - refText[i].clientWidth / 2) {
                    pos = refPos.width - refText[i].clientWidth;
                }
                if (refPos.right - homeNode.clientWidth / 2 > refPos.width - refText[i].clientWidth / 2) {
                    pos = 0;
                }

                innerText.current = {
                    ...innerText.current,
                    [refMonth[i].innerText]: pos,
                };
            }
            refText[i] && !isEmpty(innerText.current) ? refText[i].style.left = innerText.current[refText[i].innerText] + 'px' : null;
        })
    };

    // console.log('calendar render', todayNode)
    return (
        <Fragment>
            <tr className="months">
                <td>Month</td>
                {monthsSpan.map((item, index) => <td key={index}
                                                     ref={setMonthRef}
                                                     colSpan={index !== monthsSpan.length - 1 ? item.daysInMonth() - (item.date() - 1) : dates[dates.length - 1].date()}>
                    <div className="month-position"
                         ref={setTextRef}
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
                    minWidth: firstTdWidth
                }}>Day
                </td>
                {dates.map((date, index) => <td key={date.format() + index}
                                                ref={moment().isSame(date, 'day') ? node => setTodayNode(node) : null}
                                                className={moment().isSame(date, 'day') ? 'today' : null}
                                                style={{
                                                    minWidth: dayMinWidth
                                                }}
                >
                    <div style={todayNode && todayNode.clientWidth > 100 ? {marginBottom: '24px'} : null}>{date.date()} / {date.format('dd')}</div>
                    {todayNode && todayNode.clientWidth > 100 ? <Hours scale={todayNode.clientWidth}/> : null}
                    {moment().isSame(date, 'day') ? <TimeLine ref={timeLineRef}/> : null}

                </td>)}
            </tr>
        </Fragment>
    )
}

export default React.memo(Calendar)