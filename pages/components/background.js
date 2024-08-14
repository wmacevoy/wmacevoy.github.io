import React from 'react';
import background from './data/background.json';

class Background extends React.Component {
  constructor(props) {
    super(props);
    // Ensure background is an array for proper usage in map
    this.state = { data: Array.isArray(background) ? background : [] };
  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((b, index) => (
            <tr key={index}>
              <td>{b.date}</td>
              <td>{b.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Background;
