import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';
import ReactToolTip from 'react-tooltip';

import '../../css/form.css';

import 'react-dropdown/style.css'; 

class DiceRoller extends Component {
  constructor(props) {
    super(props);

    this.state = {
        characteristic: 0,
        skill: 0,
    }
  }

  render() {
      return(
          <div className="diceArea">
            <p className=".head">Roll Dice</p>
            <div className="hexagonConatainer">
                <div className="hexagon"></div>
            </div>
          </div>
      )
  }
}

export default DiceRoller;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<DiceRoller />, wrapper) : false;