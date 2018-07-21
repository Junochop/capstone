import React from 'react';

import recipesRequests from '../../firebaseRequests/recipes';
import Recipes from '../../components/Recipes/Recipes';

class AllRecipes extends React.Component {
  state = {
    items: [],
  }

  redirectToMyRecipes = () => {
    this.props.history.push('/MyRecipes');
  }

  componentDidMount () {
    recipesRequests
      .getRequestAll()
      .then((items) => {
        this.setState({ items });
      })
      .catch((err) => {
        console.error('error in items', err);
      });
  }
  render () {
    const recipesComponents = this.state.items.map((item) => {
      return (
        <Recipes
          key={item.id}
          details={item}
          redirectToMyRecipes={this.redirectToMyRecipes}
          flag='FromAllRecipes'
        />
      );
    });
    return (
      <div className="New">
        <div className="col-xs-8 inventory-container">
          <h1>All Recipes</h1>
          <ul className="recipes">
            {recipesComponents}
          </ul>

        </div>

      </div>
    );
  }
}

export default AllRecipes;
