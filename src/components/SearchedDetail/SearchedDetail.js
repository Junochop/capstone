import React from 'react';

const API_KEY = '6ab20a5cd7b25def23b11b775d1ac383';

class SearchedDetail extends React.Component {

  state = {
    activeRecipe: [],
  }

  componentDidMount = async () => {
    const title = this.props.location.state.recipe;
    console.log('hidd', this.props.location.state.recipe);
    const request = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${title}`);
    const resolve =  await request.json();

    this.setState({ activeRecipes: resolve.recipes[0] });
    console.log(resolve);
  }

  render () {

    return (
      <div>
        <p>hi</p>
      </div>

    );
  }
};

export default SearchedDetail;
