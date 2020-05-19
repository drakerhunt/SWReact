import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';
import ReactToolTip from 'react-tooltip';

import '../../css/form.css';

import 'react-dropdown/style.css'; 

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {"value" : 0, "label" : 'Default'},
      character: [],
      characteristicDescriptions: [],
      isLoading: true,
      handleChange: null
    };

    this.handleChange = value => {
      this.setState({ value });
      console.log(this.state.value);
    }
  }

  async componentDidMount() {
    console.log("got here");
    try {
      const res = await fetch('https://localhost:44389/api/character');
      const json = await res.json();
      this.setState({
        character: json
      });

      const response = await fetch('https://localhost:44389/api/characteristic');
      const json2 = await response.json();
      this.setState({
        characteristicDescriptions: json2, isLoading: false
      });

      console.log(this.state.characteristicDescriptions[1].description);


    } catch  (error) {
      this.setState({error, isLoading : false});
    }
  }

  //Map the skills
  addSkills() {
    var i = this.state.value.value;
    return( 
      <div class="skills">
        <p class="head">Skills: </p> {this.state.character[i].skillsToCharacters.map((s)=>{
          return(
            <span class="skillSpan">
              <p class="skill" data-tip={s.skill.description} >{s.skill.skillName}</p><p>({s.skill.characteristic.name.substring(0, 2)})</p><p class="skillRank">{s.rank}</p>
            </span>
          )
        })}
      </div>
    )
  }

  addCharacteristics() {
    var i = this.state.value.value;
    return( 
      <div class="characteristics">
        <p class="head">Characteristics </p> {this.state.character[i].characteristicsToCharacters.map((c, k)=>{
          return(
            <span class="charSpan">
              <p class="char" data-tip={this.state.characteristicDescriptions[k + 1].description}>{c.characteristic.name} <p class="charValues">{c.rank}</p><ReactToolTip multiLine={true}/></p>
            </span>
          )
        })}
      </div>
    )
  }

  addDropdown() {
    const options = [];
    for(var i = 0; i < this.state.character.length; i++) {
      if (this.state.character[i].characterName != null) {
        options.push({"value" : i, "label" : this.state.character[i].characterName});
      }
    }

    return(
      <div>
        <Select value={this.state.value} onChange={this.handleChange} options={options} />
      </div>
    )
  }

  renderCharacter() {
    var i = this.state.value.value;
    
    return(
      <div>
        <h3>{this.state.character[i].characterName}</h3>
        <h4>{this.state.character[i].playerName}</h4>
        <textarea placeholder="Wounds"></textarea>
      </div>
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <form>
          <h1>Loading...</h1>
        </form>)
    } else {
      return (
        <form class="section">
        
        <div>{this.addDropdown()}</div>
        <div>{this.renderCharacter()}</div>
        <div>{this.addCharacteristics()}</div>
        <div>{this.addSkills()}</div>

        </form>
      );
    }
  }
}

export default Form;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Form />, wrapper) : false;