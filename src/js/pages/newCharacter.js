import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';

import 'react-dropdown/style.css'; 

class NewCharacter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return(
          <div>New Character!</div>
      )
  }
}

export default Form;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<NewCharacter />, wrapper) : false;