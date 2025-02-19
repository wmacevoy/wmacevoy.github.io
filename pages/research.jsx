import React from 'react';
import Publication from './components/publication';
import Layout from './layout'

class Research extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'interests': ['Cryptography', 'Cryptocurrency', 'Simulation and Modeling', 'Languages','Theory of Computation']
    };
  }

  render() {
    return (
      <Layout {...this.props} currentPage="research">
        <div className="row" style={{ margin: "50px" }}>
          <div className="row">
            <div className="col-sm-4">
              <h2>Research</h2>
              <div>
                <img src={"/assets/research.jpg"} style={{ "width": "100%" }} alt="Research" />
              </div>
              <br />
              <h5>Research Interests</h5>
              <ul className="list-group">
                {
                    this.state.interests.map((interest,index) => (
                    <li className="list-group-item" key={index}>{interest}</li>
                  ))
                }
              </ul>
              <br />
              <h5><a href="https://scholar.google.com/citations?user=--sMoY0AAAAJ&amp;hl=en" target="_blank" rel="noreferrer">Google Scholar</a></h5>
              <h5><a href="https://www.researchgate.net/profile/Ram_Basnet2" target="_blank" rel="noreferrer">ResearchGate</a></h5>
              <h5><a href="http://conquer.cra.org/" target="_blank" rel="noreferrer">Ungergraduate CS Research</a></h5>
              <hr className="d-sm-none" />
            </div>
            <Publication />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Research;
