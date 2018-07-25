import React from 'react';

import Recipes from '../Recipe/Recipe';
import MyRecipes from '../MyRecipes/MyRecipes';

import recipesRequests from '../../firebaseRequests/recipes';
import authRequests from '../../firebaseRequests/auth';
import myNewRecipesRequests from '../../firebaseRequests/myRecipes';

import './New.css';

class New extends React.Component {
  state = {
    recipes: [],
    MyRecipes: {},
  };

  addToMyRecipes = (key) => {
    console.error(key);
    const newMyRecipes = { ...this.state.MyRecipes };
    newMyRecipes[key] = newMyRecipes[key] + 1 || 1;
    this.setState({ MyRecipes: newMyRecipes });
  }

  removeFromMyRecipes = (key) => {
    const newMyRecipes = { ...this.state.MyRecipes };
    delete newMyRecipes[key];
    this.setState({ MyRecipes: newMyRecipes });
  }

  saveNewMyRecipes = () => {
    const newMyRecipes = { items: { ...this.state.MyRecipes } };
    newMyRecipes.uid = authRequests.getUid();
    newMyRecipes.dateTime = Date.now();
    myNewRecipesRequests
      .postRequest(newMyRecipes)
      .then(() => {
        this.props.history.push('/MyRecipes');
      })
      .catch((err) => {
        console.error('error in post', err);
      });
  }

  componentDidMount () {
    recipesRequests
      .getRequest()
      .then((recipes) => {
        this.setState({ recipes });
      })
      .catch((err) => {
        console.error('error with item get request', err);
      });
  }

  render () {
    const recipesComponents = this.state.recipes.map((recipe) => {
      return (
        <Recipes
          key={recipe.id}
          details={recipe}
          addToMyRecipes={this.addToMyRecipes}
        />
      );
    });
    return (
      <div className="New">
        <div className="col-xs-8 inventory-container">
          <h2>Inventory</h2>
          <ul className="items">
            {recipesComponents}
          </ul>
        </div>
        <MyRecipes
          recipes={this.state.recipes}
          myRecipes={this.state.myRecipes}
          removeFromMyRecipes={this.removeFromMyRecipes}
          saveNewMyRecipes={this.saveNewRecipes}
        />
      </div>
    );
  }
}

export default New;
