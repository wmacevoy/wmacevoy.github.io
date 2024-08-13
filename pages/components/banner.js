import React from 'react';
import ReactDOM from 'react-dom';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Dr. Ram Basnet",
      title: "Professor of Computer Science and Cybersecurity",
      univer_url: 'http://www.coloradomesa.edu',
      univer_logo: '/assets/cmu-logo.png',
      hide_logo: false
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let currentHideLogo = (window.innerWidth <= 760);
    if (currentHideLogo !== this.state.hide_logo) {
      this.setState({ hide_logo: window.innerWidth <= 760 });
      if (this.state.hide_logo)
        document.getElementById('logo').style.display = "none";
      else
        document.getElementById('logo').style.display = "block";
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  render() {
    const imgStyle = {
      position: "absolute",
      top: "5px",
      left: "10px",
      height: "75px",
    };

    return (
      <div>
        <a href={this.state.univer_url} target="_blank" rel="noreferrer">
          <img id="logo" src={this.state.univer_logo} style={imgStyle} alt="University Logo" />
        </a>
        <h1>{this.state.name}</h1>
        <p>{this.state.title}</p>
      </div>
    );
  }
}

export default Banner;