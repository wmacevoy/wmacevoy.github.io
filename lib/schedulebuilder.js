// schedulebuilder.js
import React from 'react';
import TableBuilder from './tablebuilder';
import { formatTime, parseTime, formatDay, parseDay } from './daytime';

export default class ScheduleBuilder {
  constructor(state) {
    this.state = state;
    this.tableBuilder = new TableBuilder({ class: "table table-sm table-bordered" });
    this.iStartTime = parseTime(this.state.time[0]);
    this.iEndTime   = parseTime(this.state.time[1]);
    const iTimes = [];
    for (let iTime = this.iStartTime; iTime <= this.iEndTime; iTime += 30) {
        iTimes.push(iTime);
    }
    this.iTimes = iTimes;
    this.iStartDay  = parseDay(this.state.day[0]);
    this.iEndDay    = parseDay(this.state.day[1]);
    const iDays = [];
    for (let iDay = this.iStartDay; iDay <= this.iEndDay; ++iDay) {
        iDays.push(iDay);
    }
    this.iDays = iDays;
  }

  timeRow(iTime) {
    if (iTime < this.iStartTime || iTime >= this.iEndTime) {
        throw new Error(`timeRow(${iTime}) is not valid`);
    }
    // 5 - minute fidelity is adequate, row 0 is header row
    const row = 1+Math.floor((iTime - this.iStartTime)/5);
    return row;
  }

  // column index for a given day
  dayColumn(iDay) {
    // iDays is an array, we want the index of iDay in it
    const idx = this.iDays.indexOf(iDay);
    if (idx < 0) {
      throw new Error(`Invalid day: ${iDay}`);
    }
    // column 0 is for times
    return idx + 1;
  }

  // Builds the time column (first column)
  buildTimesColumn() {
    // let’s assume column #1 is the time column
    const timeCol = 0;
    this.tableBuilder.header(0, 0, timeCol, timeCol, {width: "9%"}, "Time");

    const times = this.iTimes;
    for (let i = 0; i < times.length-1; i++) {
        const startTime = times[i];
        const endTime = times[i+1] - 1;
        const startRow = this.timeRow(startTime);
        const endRow = this.timeRow(endTime);
        const text = `${formatTime(startTime)}`;
        this.tableBuilder.addCell(startRow, endRow, timeCol, timeCol, {}, text);
    }
  }

  buildDayHeaders() {
    for (let iDay of this.iDays) {
        const col = this.dayColumn(iDay);
        const text = formatDay(iDay);
        this.tableBuilder.header(0,0,col,col,{width:"18%"},text);
    }
  }


  buildItem(item) {
    // item = { name, loc, days, time: [start, end], ... }
    const iStart = parseTime(item.time[0]);
    const iEnd   = parseTime(item.time[1]);
    const startRow = this.timeRow(iStart);
    const endRow   = this.timeRow(iEnd-1);

    // We want to place the item in each day it occupies
    for (let d of item.days) {
      const iDay  = parseDay(d);
      const col   = this.dayColumn(iDay);
      const attrs = { className: "bg-success schedule" };
      const text  = (
        <div>
          <div>{item.name}</div>
          <div>{item.loc}</div>
          <div>{formatTime(iStart)} - {formatTime(iEnd)}</div>
        </div>
      );
      this.tableBuilder.addCell(startRow, endRow, col, col, attrs, text);
    }
  }

  render() {
    // build structure
    this.buildTimesColumn();
    this.buildDayHeaders();
    this.state.items.forEach((item) => this.buildItem(item));

    // Once we’ve populated `this.table`, we get back a <table> 
    const table = this.tableBuilder.generate();

    return (
      <div className="col-sm-8">
        <h2>{this.state.semester.toUpperCase()}</h2>
        {table}
      </div>
    );
  }
}