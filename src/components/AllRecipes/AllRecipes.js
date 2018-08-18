import React from 'react';

import recipesRequests from '../../firebaseRequests/recipes';
import Recipes from '../../components/Recipes/Recipes';

class AllRecipes extends React.Component {
  state = {
    recipes: [],
  }

  redirectToMyRecipes = () => {
    this.props.history.push('/MyRecipes');
  }

  componentDidMount () {
    recipesRequests
      .getRequestAll()
      .then((recipes) => {
        this.setState({ recipes });
      })
      .catch((err) => {
        console.error('error in items', err);
      });
  }
  render () {
    const recipesComponents = this.state.recipes.map((recipe) => {
      return (
        <Recipes
          key={recipe.id}
          details={recipe}
          redirectToMyRecipes={this.redirectToMyRecipes}
          flag='FromAllRecipes'
        />
      );
    });
    return (
      <div className="New">
        <div className="col-md-6 inventory-container">
          <h1>Featured Recipes</h1>
          <ul className="recipes">
            {recipesComponents}
          </ul>

        </div>

      </div>
    );
  }
}

export default AllRecipes;
