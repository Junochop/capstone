import React from 'react';
import './Recipes.css';
// import myRecipesRequests from '../../firebaseRequests/MyRecipes';
import authRequests from '../../firebaseRequests/auth';
import recipesRequests from '../../firebaseRequests/recipes';

class Recipes extends React.Component {
  addClickEvent = () => {
    this.props.addToMyRecipes(this.props.details.id);

  }

  viewDetail = () => {
    const id = this.props.details.id;
    this.props.redirectViewDetail(id);

  }

  state = {
    itemDescription: this.props.details.itemDescription,
    itemImage: this.props.details.itemImage,
    itemName: this.props.details.itemName,
    steps: this.props.details.steps,
    uid: authRequests.getUid(),
    flag: this.props.flag,
  }

  saveNewRecipe = () => {
    recipesRequests
      .postRequest(this.state)
      .then(() => {
        this.props.redirectToMyRecipes();
      })
      .catch((err) => {
        console.error('error in post', err);
      });
  }

  // deleteNewRecipe = () => {
  //   console.error(this.props);
  //   myRecipesRequests
  //     .deleteRequest(this.props.details.id)
  //     .then(() => {
  //       recipeRequests
  //         .getRequestMyRecipe()
  //         .then((items) => {
  //           this.props.updateState(items);
  //         });
  //     })
  //     .catch((err) => {
  //       console.error('error in post', err);
  //     });
  // }

  render () {
    const { details } = this.props;
    // console.error('bb', this.props.details.itemDescription);

    const image = `${details.itemImage}`;
    const ingredientList = this.props.details.itemDescription;
    const stepsList = this.props.details.steps;
    const ingredients = ingredientList.map((ingredient, index) =>
      <p key={index}>
        {ingredient.name}: {ingredient.quantity}
      </p>
    );
    const steps = stepsList.map((step, index) =>
      <p key={index}>
        {step}
      </p>
    );

    console.error('cc', ingredientList);

    return (

      <li className="Item thumbnail">
        <img src={image} alt={details.itemImage} />
        <h3 className="name">
          {details.itemName}
        </h3>
        <h5 className="ingredients">
          <b>Ingredients</b>
          {ingredients}
        </h5>
        <h5 className="steps">
          <b>Steps</b>
          {steps}
        </h5>
        {this.state.flag === 'FromAllRecipes' ?
          (<button className="btn btn-danger button" onClick={this.saveNewRecipe}>add me</button>)
          :
          (
            <div>
              <button className="btn btn-danger button" onClick={this.deleteNewRecipe}>Delete</button>
              <button className="btn btn-danger button" onClick={this.viewDetail}>View</button>
            </div>
          )}

      </li>

    );
  }
}

export default Recipes;
