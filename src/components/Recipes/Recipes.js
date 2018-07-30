import React from 'react';
import './Recipes.css';
import myRecipesRequests from '../../firebaseRequests/myRecipes';
import authRequests from '../../firebaseRequests/auth';
import recipesRequests from '../../firebaseRequests/recipes';
import commentsRequests from '../../firebaseRequests/newcomments';

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
    comments: [],
  }

  componentDidMount () {
    console.log('props', this.props.details.id);
    commentsRequests
      .getRequest(this.props.details.id)
      .then((comments) => {
        console.error('comments',comments);
        this.setState({ comments });
      })
      .catch((err) => {
        console.error('error in recipes', err);
      });
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

  deleteNewRecipe = () => {

    myRecipesRequests
      .deleteRequest(this.props.details.id)
      .then(() => {
        recipesRequests
          .getRequestMyRecipes()
          .then((recipes) => {
            this.props.updateState(recipes);
          });
      })
      .catch((err) => {
        console.error('error in post', err);
      });
  }

  render () {
    console.error('ssss', this.state.commments);
    const { details } = this.props;
    console.error('bb', this.props.details);

    const image = `${details.itemImage}`;
    const ingredientList = this.props.details.itemDescription;
    const stepsList = this.props.details.steps;
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
        {this.state.comments[0] ?
          (<h5 className="notes">
            <b>Notes</b>

            <p>{this.state.comments[0].value}</p>
            <p>{console.error('test:', this.state.comments[0].id)}</p>
            <div className="update">
              <button className="btn btn-danger button" onClick={this.deleteNewRecipe}>Delete</button>
              <button className="btn btn-info button update" onClick={this.viewDetail}>Update Notes</button>
            </div>

          </h5>) : ((<h5 className="notes">
            <b>Notes</b>

            {/* {details.comments.value} */}
          </h5>))
        }

        {this.state.flag === 'FromAllRecipes' ?
          (<button className="btn btn-danger button" onClick={this.saveNewRecipe}>add me</button>)
          :
          (
            <div ref="initialButtons">
              <button className="btn btn-danger button" onClick={this.deleteNewRecipe}>Delete</button>
              <button className="btn btn-info button" onClick={this.viewDetail}>Add Notes</button>
            </div>
          )}

      </li>

    );
  }
}

export default Recipes;
