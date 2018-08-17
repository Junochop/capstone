import React from 'react';
import myRecipesRequests from '../../firebaseRequests/myRecipes';
import commentsRequests from '../../firebaseRequests/newcomments';

class Update extends React.Component {
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
    comments: {
      recipeId: '',
      uid: '',
      value: '',
    },
  }
  handleChange = this.handleChange.bind(this);

  handleChange (event) {
    this.setState({
      comments: {
        recipeId: this.props.match.params.id,
        uid: '',
        value: event.target.value,
      },
    });
  }

  redirectToMyRecipes = () => {
    this.props.history.push('/MyRecipes');
  }

  updateRecipeClick = () => {

    const firebaseId = this.props.match.params.id;
    myRecipesRequests
      .getSingleRequest(firebaseId)
      .then((newRecipe) => {
        this.setState({ recipes: newRecipe });
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
            this.redirectToMyRecipes();
          });
      })
      .catch(((err) => {
        console.error('error with get delete request', err);
      }));
  }

  componentDidMount () {

    const firebaseId = this.props.match.params.id;
    commentsRequests
      .getCommentsRequest(firebaseId)
      .then((comments) => {
        console.error('comments', comments);
        this.setState({ comments });
      })
      .catch((err) => {
        console.error('error in recipes', err);
      }).then(
        this.updateRecipeClick());
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
          <div className="TextArea">
            <b>Notes</b>
            <textarea rows="4" cols="50" value={this.state.comments ? this.state.comments.value : null} onChange={this.handleChange} >
            </textarea>
            <div className='UpdateNotes'>
              <button className="btn btn-info Update button" onClick={this.updateClick}>Update</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Update;
