import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from 'react-select';

import 'react-dropdown/style.css'; 

export function DBConnectionGet() {
    console.log("got here");
    try {
      const res = await fetch('https://localhost:44389/api/character');
      const json = await res.json();

    } catch  (error) {
      this.setState({error, isLoading : false});
    }
}

export function DBConnectionPost(NewCharacterDTO) {
    try {
        const res = await fetch('https://localhost:44389/api/character');
        const json = await res.json();
  
      } catch  (error) {
        this.setState({error, isLoading : false});
      }
}