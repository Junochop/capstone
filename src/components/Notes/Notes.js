import React from 'react';
import myRecipesRequests from '../../firebaseRequests/myRecipes';

class Notes extends React.Component {
  state = {
    recipes: {
      itemDescription: [{
        name: '',
        quantity: '',
        type: '',
      }],
      flag: '',
      itemImage: '',
      itemName: '',
      steps: [],
      uid: '',
    },
  }

  updateRecipeClick = () => {
    // const showIngredients = () => {

    //   const ingredientList = this.state.recipes.itemDescription;
    //   const ingredients = ingredientList.map((ingredient, index) =>
    //     <div key={index}>
    //       {ingredient.name}: {ingredient.quantity}
    //     </div>
    //   ); console.error('ho', ingredients);
    //   return ingredients;
    // };

    const firebaseId = this.props.match.params.id;
    console.error('firebaseId:', firebaseId);
    myRecipesRequests
      .getSingleRequest(firebaseId)
      .then((newRecipe) => {
        this.setState({ recipes: newRecipe });
        // showIngredients()
        //   .then((newIngredient) => {
        //     this.setState({ingredient: newIngredient});
        //   });
      })
      .catch((err) => {
        console.error('error in post', err);
      });
  }

  componentDidMount () {
    this.updateRecipeClick();
  }
  render () {
    const ingredientList = this.state.recipes.itemDescription;
    const ingredients = ingredientList.map((ingredient, index) =>
      <div key={index}>
        {ingredient.name}: {ingredient.quantity}
      </div>
    );
    console.error('ho ho', this.state.recipes.itemDescription[0]);
    console.error('ho ho', ingredients);
    return (
      <div className="Item thumbnail row">
        <div class="col-md-8">
          <img src={this.state.recipes.itemImage} alt={this.state.recipes.itemName} />
        </div>
        <div class="col-md-4">
          <li>{this.state.recipes.itemName}</li>
          <li>{ingredients}</li>
        </div>
      </div>
    );
  }
}

export default Notes;
