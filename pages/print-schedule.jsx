import React from 'react';
import Head from 'next/head';
import Schedule from './components/schedule';

class PrintSchedule extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Print Schedule</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div style={{ margin: "20px" }}>
          <button
            className="btn btn-primary print-hide"
            style={{ marginBottom: "20px" }}
            onClick={() => window.print()}
          >
            Print
          </button>
          <Schedule printOnly />
        </div>
      </React.Fragment>
    );
  }
}

export default PrintSchedule;
