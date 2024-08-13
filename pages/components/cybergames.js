import React from 'react';

import cybergames from './data/cybergames.json';

class Cybergames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: cybergames
    };
  }
  render() {
    return (
      <div>
        <h2><a name="cybergames">Cybersecurity Games and Competitions</a></h2>
        <ul>
          {
            this.state.games.map( (game) => (
              <li><a href={game.url} rel="noreferrer" target="_blank">{game.description}</a></li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default Cybergames