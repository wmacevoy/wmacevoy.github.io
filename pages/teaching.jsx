import React from 'react';
import Schedule from './components/schedule';
import Courses from './components/courses';
import Layout from './layout'

class Teaching extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  };

  render() {
    return (
      <Layout {...this.props} currentPage="teaching">
        <div className="row" style={{ margin: "50px" }}>
          <div className="row">
            <Courses />
            <Schedule />
            <hr class="d-sm-none" />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Teaching;
