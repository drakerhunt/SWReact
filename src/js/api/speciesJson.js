export async function getSpecies() {
    console.log("Dropdown");
    try {
      const res = await fetch('https://localhost:44389/api/Species');
      const json = await res.json();
      this.setState({
        species: json, isLoading: false
      });


    } catch  (error) {
      this.setState({error, isLoading : false});
    }
  }