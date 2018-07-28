import React from 'react';
import myRecipesRequests from '../../firebaseRequests/myRecipes';
import CommentBox from '../CommentBox/CommentBox';

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
    const ingredientList = this.state.recipes.itemDescription;
    const stepsList = this.state.recipes.steps;
    const ingredients = ingredientList.map((ingredient, index) =>
      <div key={index}>
        {ingredient.name}: {ingredient.quantity}
      </div>
    );
    const steps = stepsList.map((step, index) =>
      <div key={index}>
        {step}
      </div>
    );

    return (
      <div className="Item thumbnail row">
        <div className="col-md-8">
          <img src={this.state.recipes.itemImage} alt={this.state.recipes.itemName} />
        </div>
        <div className="col-md-4">
          <li>{this.state.recipes.itemName}</li>
          <li>{ingredients}</li>
          <li>{steps}</li>
          <div className="commentBox">
            <CommentBox noteID={this.props.match.params.id}/>
          </div>

        </div>
      </div>
    );
  }
}

export default Notes;
