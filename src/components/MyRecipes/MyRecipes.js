import React from 'react';
import recipesRequests from '../../firebaseRequests/recipes';
import Recipes from '../../components/Recipes/Recipes';

import './MyRecipes.css';

class MyRecipes extends React.Component {
  state = {
    recipes: [],
  }

  componentDidMount () {
    recipesRequests
      .getRequestMyRecipes()
      .then((recipes) => {
        this.setState({ recipes });
      })
      .catch((err) => {
        console.error('error in recipes', err);
      });
  }

  updateState = (newRecipes) => {
    this.setState({ recipes: newRecipes });

  }

  redirectViewDetail = (id) => {
    this.props.history.push(`/View/${id}`);
  }

  render () {

    const recipesComponents = this.state.recipes.map((recipe) => {
      return (
        <Recipes
          key={recipe.id}
          details={recipe}
          flag='FromAllRecipes'
          updateState={this.updateState}
          redirectViewDetail={this.redirectViewDetail}
        />
      );
    });
    console.error('ll', this.state.recipes);
    return (
      <div className="MyRecipes">
        <p>{recipesComponents}</p>
      </div>
    );
  }
};

export default MyRecipes;
