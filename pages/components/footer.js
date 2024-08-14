import React from 'react';
import ReactDOM from 'react-dom';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav_text: ['Home', 'Teaching', 'Research', 'Resources', 'Contact'],
      current_nav: 0 //current navigation id
    };
    this.year = new Date();
    this.year = this.year.getFullYear();
  }

  render() {
    return (
      <p className="text-center">
        <span>|</span>
        {
          this.state.nav_text.map((text, index) =>
            <span>&nbsp;<a href={text.toLowerCase()}>{text}</a>&nbsp;|</span>
          )}
        <span> &nbsp;&nbsp; &copy; {this.year}</span>
      </p>
    );
  }
}
export default Footer;
