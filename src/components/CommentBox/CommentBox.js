import React from 'react';
import commentsRequests from '../../firebaseRequests/newcomments';
import authRequests from '../../firebaseRequests/auth';

class CommentBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      newComment: {
        value: 'Please add your comments.',
        recipeId: '',
        uid: authRequests.getUid(),
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateNotesClick = () => {
    const recipeId = this.props.noteID;
    console.error('id', recipeId);
    const thing = {...this.state.newComment};
    thing.recipeId = recipeId;
    commentsRequests
      .postRequest(thing)
      .then(() => {
        this.props.history.push('/MyRecipes');
      })
      .catch(((err) => {
        console.error('error with get delete request', err);
      }));
  }

  handleChange (event) {
    const thing = { ...this.state.newComment };
    thing.value = event.target.value;
    this.setState({ newComment: thing });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.updateNotesClick();
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Notes:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Save" />
      </form>
    );
  }
}
export default CommentBox;
