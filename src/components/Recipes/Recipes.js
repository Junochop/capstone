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
  viewUpdate = () => {
    const id = this.props.details.id;
    this.props.redirectUpdateDetail(id);

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

  // deleteNewRecipe = () => {

  //   myRecipesRequests
  //     .deleteRequest(this.props.details.id)
  //     .then(() => {
  //       recipesRequests
  //         .getRequestMyRecipes()
  //         .then((recipes) => {
  //           this.props.updateState(recipes);
  //         });
  //     })
  //     .catch((err) => {
  //       console.error('error in post', err);
  //     });
  // }

  deleteNewRecipe = () => {
    const firebaseId = this.props.match.params.id;
    myRecipesRequests
      .deleteRequest(firebaseId, this.state.comments)
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

  updateClick = () => {
    const firebaseId = this.props.match.params.id;
    commentsRequests.getCommentsKey(firebaseId)
      .then((originalRecordKey) => {
        commentsRequests.putCommentRequest(originalRecordKey, this.state.comments)
          .then((newComments) => {
            this.setState({ comments: newComments });
          });
      })
      .catch(((err) => {
        console.error('error with get delete request', err);
      }));
  }

  hideclickevent () {
    const listmenu = document.getElementsByClassName('initialButtons');
    listmenu.style.display = 'none';
  }

  deleteaddButton = () => {
    let string = '';
    console.error('lenth',this.state.comments.length);
    if (this.state.flag === 'FromAllRecipes') {
      string = <div><button className="btn btn-danger button" onClick={this.saveNewRecipe}>add me</button></div>;
      return string;
    } else if (this.state.flag !== 'FromAllRecipes' && this.state.comments.length > 0) {
      string = <div className="initialButtons"><button className="btn btn-danger button" onClick={this.deleteNewRecipe}>Delete</button><button className="btn btn-info button update" onClick={this.viewUpdate}>Update Notes</button></div>;
      return string;
    } else if (this.state.flag !== 'FromAllRecipes' && this.state.comments.length === 0) {
      string = <div className="initialButtons"><button className="btn btn-danger button" onClick={this.deleteNewRecipe}>Delete</button><button className="btn btn-info vieww button" onClick={this.viewDetail}>Add Notes</button></div>;
      return string;
    }
  };

  render () {

    const { details } = this.props;
    const image = `${details.itemImage}`;
    const ingredientList = this.props.details.itemDescription;
    const stepsList = this.props.details.steps;
    const ingredients = ingredientList.map((ingredient, index) =>
      <div key={index}>
        <p>{ingredient.name}: {ingredient.quantity}</p>
      </div>
    );
    const steps = stepsList.map((step, index) =>
      <div key={index}>
        <p>{step}</p>
      </div>
    );
    return (

      <li className="Item thumbnail">
        <img src={image} alt={details.itemImage} />
        <h3 className="name">
          <p>{details.itemName}</p>
        </h3>
        <h5 className="ingredients">
          <b>Ingredients</b>
          <p>{ingredients}</p>
        </h5>
        <h5 className="steps">
          <b>Steps</b>
          <p>{steps}</p>
        </h5>

        {
          this.state.comments[0] ?
            (<h5 className="notes">
              <b>Notes</b>
              <p>{this.state.comments[0].value}</p>
            </h5>) : ((<h5 className="notes">
              <b>Notes</b>
            </h5>))
        }

        {this.deleteaddButton()}

      </li>

    );
  }
}

export default Recipes;
