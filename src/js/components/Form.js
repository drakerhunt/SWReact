import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';
import ReactToolTip from 'react-tooltip';

import '../../css/form.css';

import 'react-dropdown/style.css'; 
import DiceRoller from "./diceRoller";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {"value" : 0, "label" : 'DefaultName'},
      career: {"value" : 0, "label" : "DefaultCareer"},
      careers: [],
      character: [],
      characterName: 'DefaultName',
      characteristics: [],
      characteristicDescriptions: [],
      species: {"value" : 0, "label" : 'DefaultSpecies'},
      speciesName: '',
      speciesList: [],
      popout: false,
      isLoading: true,
      handleChange: null,
      speciesChange: null
    };

    this.careerChange = value => {
      this.setState({career : value});
    }

    this.handleChange = value => {
      this.setState({ value });
      console.log(this.state.value);
    }

    this.speciesChange = v => {
      console.log('species ', v);
      this.setState({species: v});
      this.updateCharacteristics(v.value);
    }

    this.updateCharacter = this.updateCharacter.bind(this);
  }

  updateCharacteristics(index) {
    var cList = [];
      for (var i = 0; i < 6; i++) {
        if (this.state.speciesList[index].characteristicsToSpecies[i].rank != null) {
          cList.push(this.state.speciesList[index].characteristicsToSpecies[i].rank);
        }
      }
      this.setState({characteristic: []});
      this.setState({characteristics : cList});
  }

  async componentDidMount() {
    console.log("Starting");
    try {
      // const res = await fetch('https://localhost:44389/api/Characters');
      // const json = await res.json();
      // this.setState({
      //   character: json
      // });

      const response = await fetch('https://localhost:44389/api/Species');
      const json2 = await response.json();
      this.setState({
        speciesList: json2
      });

      const res = await fetch('https://localhost:44389/api/Careers');
      const json = await res.json();
      this.setState({careers : json, isLoading: false});

      console.log(this.state.careers);

      // const response = await fetch('https://localhost:44389/api/characteristic');
      // const json2 = await response.json();
      // this.setState({
      //   characteristicDescriptions: json2, isLoading: false
      // });

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
              <button onClick={() => console.log("Rollin")}>ROLL</button>
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

  careersDropdown() {
    const options = [];
    for(var i = 0; i < this.state.careers.length; i++) {
      if (this.state.careers[i].name != null) {
        options.push({"value" : i, "label" : this.state.careers[i].name});
      }
    }

    return(
      <div>
        <Select value={this.state.career} onChange={this.careerChange} options={options} />
      </div>
    )
  }

  careerMap() {
    return(
      <span className="talentMap">
        {this.state.careers[0].talentTrees[0].talentMaps.map((c, index) => (

            <div className="talentContainer">
              <div className="talent">
                {c.talent.name}
              </div>
            </div>
        ))}
      </span>
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

  addSpeciesDropdown() {
    const sp = [];
    for(var i = 0; i < this.state.speciesList.length; i++) {
      if (this.state.speciesList[i].name != null) {
        sp.push({"value" : i, "label" : this.state.speciesList[i].name});
      }
    }

    return(
      <div className="dropDown">
        <Select value={this.state.species} onChange={this.speciesChange} options={sp} />
      </div>
    )
  }

  minus(e){
    console.log(this.state.characteristics[e]);
  }

  addSpeciesCharacteristics() {
      return(
        <div>
        {
          this.state.speciesList[this.state.species.value].characteristicsToSpecies.map((c, index) => (
          <div className="c">
            <h5>{this.state.characteristics[index]}</h5>
            <h5>{c.characteristicId}</h5>
            <input type="button" value="-" onClick={this.minus(index)}></input> <input type="button" value="+"></input>
          </div>
          ))}
        </div>
      )}

  updateCharacter(event) {
    this.setState({characterName : event.target.value});
  }

  characterInput() {
    return(
      <div className="input">
        <h1>Create Character</h1>
        
        <h5>Character Name: </h5>
        <input type="text" placeholder="name" required onChange={this.updateCharacter}></input>
        
        <h5>Species: </h5>
        <div>{this.addSpeciesDropdown()}</div>

        <h5>Base Characteristics: </h5>

        <div className="characteristics">

          <div>{this.addSpeciesCharacteristics()}</div>

        </div>

        <h5>Experience: </h5>

        <div>
          <h5>Starting: {this.state.speciesList[this.state.species.value].startingExp}</h5>
        </div>

        <input type="submit" value="Submit"></input>
      </div>
    )
  }

  renderCharacter() {
    return(
      <div>
        <h3>{this.state.characterName}</h3>
        <h3>{this.state.species.label}</h3>
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
        <form className="section">

        <div>{this.renderCharacter()}</div>

        <div>{this.characterInput()}</div>

        <div>{this.careersDropdown()}</div>

        <div>{this.careerMap()}</div>

        </form>
      );
    }
  }
}

export default Form;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Form />, wrapper) : false;