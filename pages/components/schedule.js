import React from 'react';
import ScheduleBuilder from '../../lib/schedulebuilder';

export default class Schedule extends React.Component {
    // times: 9:45 am, 12:00 noon, 3:00 pm
    // days: Sun,Mon,Tue,Wed,Thu,Fri,Sat
    constructor(props) {
        super(props);
        this.state = {
            semester: "Spring 2025 Schedule",
            time: ["8:00 am","2:00 pm"], // time range for schedule
            day: ["Mon","Fri"], // day range for schedule
            items: [
                {
                    name: "Office Hour",
                    loc: "CH 308",
                    days: ["Mon","Wed"],
                    time: ["9:00 am","10:45 am"],
                },
                {
                    name: "Office Hour",
                    loc: "CH 308",
                    days: ["Tue","Thu"],
                    time: ["11:00 am","11:50 am"],
                },
                {
                    name: "CSCI 337-001 40728 User Interface Design",
                    loc: "CH 310",
                    days: ["Mon", "Wed", "Fri"],
                    time: ["8:00 am", "8:50 am"],
                },
                {
                    name: "CSCI 470-001 40048 Operating Systems",
                    loc: "CH 310",
                    days: ["Mon","Wed","Fri"],
                    time: ["11:00 am","11:50 am"],
                },
                {
                    name: "CSCI 490-001 40263 Software Engineering",
                    loc: "CH 315",
                    days: ["Tue","Thu"],
                    time: ["8:00 am","9:15 am"],
                },
                {
                    name: "CSCI 330-001 41557 Programming Languages",
                    loc: "CH 315",
                    days: ["Tue","Thu"],
                    time: ["9:30 am","10:45 am"],
                },
            ]
        };
    }

    render() {
        const builder = new ScheduleBuilder(this.state);
        return builder.render();
    }
}

