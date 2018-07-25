import React from 'react';
import myRecipesRequests from '../../firebaseRequests/myRecipes';

class Notes extends React.Component {
  state = {
    recipes: [],
  }

  updateRecipeClick = () => {
    const firebaseId = this.props.match.params.id;
    console.error('firebaseId:', firebaseId);
    myRecipesRequests
      .getSingleRequest(firebaseId)
      .then((newRecipe) => {
        this.setState({ recipes: newRecipe });
      })
      .catch((err) => {
        console.error('error in post', err);
      });
  }

  componentDidMount () {
    this.updateRecipeClick();
  }

  render () {
    console.error(this.state.recipes);
    return (
      <div className="Item thumbnail row">
        <div class="col-md-8">
          <img src={this.state.recipes.itemImage} alt={this.state.recipes.itemName} />
        </div>
        <div class="col-md-4">
          <li>{this.state.recipes.itemName}</li>

        </div>
      </div>
    );
  }
}

export default Notes;
