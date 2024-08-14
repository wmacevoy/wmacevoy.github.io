import React from 'react';
import Layout from './layout';
import Cybergames from './components/cybergames'

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout {...this.props} currentPage="resources">
        <div className="row" style={{ margin: "50px" }}>
          <div className="row">
            <div className="col-sm-4">
              <h2>Resources</h2>
              <div className="profileImg">
                <img src={"/assets/resources.jpg"} style={{ "width": "100%" }} alt="Resources" />
              </div>
              <br />
              <hr className="d-sm-none" />
            </div>
            <div className="col-sm-8">
              <h2><a name="funding">Scholarships and Funding Opportunities </a></h2>
              <ul>
                <li><a href="http://www.nsf.gov/funding/pgm_list.jsp?org=DUE" target="_blank" rel="noreferrer">NSF Undergraduate Education (DUE) Active Funding Opportunities</a>
                </li>
                <li><a href="http://www.nsf.gov/funding/pgm_list.jsp?org=DUE" target="_blank" rel="noreferrer">Cybersecurity Scholarship - CyberCorps: Scholarship for Service (SFS)</a>
                </li>
                <li><a href="http://www.nsf.gov/funding/pgm_summ.jsp?pims_id=5517" target="_blank" rel="noreferrer">NSF - Research Experiences for Undergraduates (REU) </a>
                </li>
              </ul>
              <br />
              <h2><a name="icpc">ICPC Resources / Programming Concepts</a></h2>
              <ul>
                <li><a href="https://open.kattis.com/" target="_blank" rel="noreferrer">Kattis online judge</a></li>
                <li><a href="https://icpcarchive.ecs.baylor.edu/" target="_blank" rel="noreferrer">ACM - Live icpc archive</a></li>
                <li><a href="http://www.geeksforgeeks.org/" target="_blank" rel="noreferrer">GeeksforGeeks - Computer Science portal</a></li>
                <li><a href="http://www.spoj.com/" target="_blank" rel="noreferrer">Sphere online judge</a></li>
                <li><a href="http://codeforces.com/" target="_blank" rel="noreferrer">Code forces</a></li>
                <li><a href="http://topcoder.com/" target="_blank" rel="noreferrer">Topcoder</a></li>
              </ul>
              <br />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Resources;
