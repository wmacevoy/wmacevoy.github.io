import React from 'react';
import ScheduleBuilder from '../../lib/schedulebuilder';

export default class Schedule extends React.Component {
    // times: 9:45 am, 12:00 noon, 3:00 pm
    // days: Sun,Mon,Tue,Wed,Thu,Fri,Sat
    constructor(props) {
        super(props);
        this.state = {
            semester: "Fall 2026 Schedule",
            time: ["8:00 am","2:00 pm"], // time range for schedule
            day: ["Mon","Fri"], // day range for schedule
            items: [
                {
                    name: "Office Hour",
                    loc: "CH 308",
                    days: ["Mon"],
                    time: ["9:00 am","10:50 am"],
                },
                {
                    name: "Office Hour",
                    loc: "CH 308",
                    days: ["Wed","Fri"],
                    time: ["9:00 am","9:50 am"],
                },
                {
                    name: "Office Hour",
                    loc: "CH 308",
                    days: ["Thu"],
                    time: ["11:00 am","11:50 am"],
                },
                {
                    name: "CSCI 330 Programming Languages",
                    loc: "CH 310",
                    days: ["Mon","Wed","Fri"],
                    time: ["8:00 am", "8:50 am"],
                    links: {
                        syllabus: "https://docs.google.com/document/d/1uztH2pD29lwaXzIQBSs1vFfpnYMHJkzqXKFy9YRFF7I/edit?usp=sharing",
                        assignments: "https://d2l.coloradomesa.edu/d2l/home/275488",
                        repo: "https://github.com/wmacevoy/languages-wmacevoy-fall-2026",
                    },
                },
                {
                    name: "CSCI 470 Operating Systems Design",
                    loc: "CH 110",
                    days: ["Mon","Wed","Fri"],
                    time: ["1:00 pm","1:50 pm"],
                    links: {
                        syllabus: "https://docs.google.com/document/d/1lAVm-9Gnbx-30UHQTxWOIWjkhL_PgvptIUmgvP8F3OA/edit?usp=sharing",
                        assignments: "https://d2l.coloradomesa.edu/d2l/home/276713",
                        repo: "https://github.com/wmacevoy/os-wmacevoy-fall-2026",
                    },
                },
                {
                    name: "CSCI 490 Software Engineering",
                    loc: "CH 305",
                    days: ["Tue","Thu"],
                    time: ["8:00 am","9:15 am"],
                    links: {
                        syllabus: "https://docs.google.com/document/d/1eP04Cv5pm57zAtam6JOm2xsyaSdCltMoFHcmHFBv56I/edit?usp=sharing",
                        assignments: "https://d2l.coloradomesa.edu/d2l/home/276049",
                        repo: "https://github.com/wmacevoy/software-engineering-wmacevoy-fall-2026",
                    },
                },
                {
                    name: "CSCI 365 Data Mining",
                    loc: "CH 110",
                    days: ["Tue","Thu"],
                    time: ["9:30 am","10:45 am"],
                    links: {
                        syllabus: "https://docs.google.com/document/d/1SpP-VlnN-O3R5KEcj2Wu9-Qg1JzOpiKp1sHBNp3PIyo/edit?usp=sharing",
                        assignments: "https://d2l.coloradomesa.edu/d2l/home/276943",
                        repo: "https://github.com/wmacevoy/data-mining-wmacevoy-fall-2026",
                    },
                },
            ]
        };
    }

    render() {
        const builder = new ScheduleBuilder({ ...this.state, printOnly: this.props.printOnly });
        return builder.render();
    }
}

