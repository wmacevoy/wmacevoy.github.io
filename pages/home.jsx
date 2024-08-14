
import React from "react";
import Background from './components/background'
import Layout from './layout'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <Layout {...this.props} currentPage="home">
            <div className="row" style={{margin: "50px"}}>
                <div className="col-sm-4">
                    <h2>About Me</h2>
                    <h5><a href="https://www.coloradomesa.edu/directory/computer-science-engineering/warren-macevoy.html" target="_blank" rel="noreferrer">CMU Profile</a></h5>
                    <h5><a href="https://www.linkedin.com/in/warrenmacevoy/" target="_blank" rel="noreferrer"> LinkedIn Profile</a></h5>
                    <div id="profileImg">
                        <img src={ "/assets/warren_macevoy_egypt.png"} style={{"width":"100%"}} alt="Profile pic"/>
                    </div>
                    <p>I am a professor of Computer Science at <a href="http://www.coloradomesa.edu" target="_blank" rel="noreferrer">Colorado Mesa University (CMU)</a> in the department of <a href="https://www.coloradomesa.edu/computer-science-engineering/index.html">Computer Scinece and Engineering</a>.</p>
                    <hr className="d-sm-none" />
                </div>
                <div className="col-sm-8">
                    <h2>SCHEDULE</h2>
                    <h5><a href="/teaching">This Semester's Schedule</a></h5>
                    <br />
                    <h2>BACKGROUND</h2>
                    <Background />
                </div>
            </div>
        </Layout>
    );
  }
}

export default Home;
