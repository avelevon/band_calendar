import React, {PureComponent} from 'react'
import Calendar from "./Calendar";

import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import moment from 'moment'

class CalendarContainer extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            dates: []
        }
    }

    componentDidMount() {
        const {range} = this.props;
        this.setState({
            dates: this.calculateDates(range)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {range} = this.props;
        if (!isEqual(prevProps.range, range)) {
            this.setState({
                dates: this.calculateDates(range)
            })
        }
    }

    calculateDates = (range = [10, 10]) => {
        let start = range[0]
        let end = range[1]

        if (range[0] === -1) {
            start = moment().dayOfYear() - 1
        }

        if (range[1] === -1) {
            const year = moment().year()
            end = moment(`${year}-12-31`).dayOfYear() - moment().dayOfYear()
        }

        const arr = [];
        for (let i = -start; i < end + 1; i++) {
            arr.push(moment().add(i, 'days').startOf('day'))
        }
        return arr
    }

    static getDates(range) {
       return new this().calculateDates(range)
    }

    render() {
        const {dates} = this.state
        const {homeNode, range, dayMinWidth, firstTdWidth, scrollToToday} = this.props;

        return (
            !isEmpty(dates) && <Calendar
                dates={dates}
                homeNode={homeNode}
                range={range}
                dayMinWidth={dayMinWidth}
                firstTdWidth={firstTdWidth}
                scrollToToday={scrollToToday}
            />
        )
    }
}

export default CalendarContainer