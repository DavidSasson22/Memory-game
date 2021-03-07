import React from "react";
import Button from "./Button";
import TextArea from "./TextArea";

class CardManageItem extends React.Component {
  state = {
    className: "",
    id: "",
    question: "",
    answer: "",
    onDelete: null,
    // onEdit: null,
    onSubmit: null,
    editMode: false,
  };
  componentDidMount = () => {
    this.setState({
      className: this.props.className,
      cardID: this.props.id,
      question: this.props.question,
      answer: this.props.answer,
      onDelete: this.props.onDelete,
      onSubmit: this.props.onSubmit,
    });
  };
  handleEdit = (cardID) => {
    this.setState({ editMode: true });
  };
  handleChange = (value, inputName) => {
    inputName === "questionEdit" && this.setState({ question: value });
    inputName === "answerEdit" && this.setState({ answer: value });
  };
  handleEditSubmit = (e) => {
    e.preventDefault();
    this.state.onSubmit(
      this.state.question,
      this.state.answer,
      this.state.cardID,
    );
    this.setState({ editMode: false });
  };
  render() {
    const { className, cardID, question, answer, onDelete } = this.state;
    return (
      <form className={className} onSubmit={this.handleEditSubmit}>
        <div>
          <h2>Question:</h2>
          {this.state.editMode ? (
            <TextArea
              name="questionEdit"
              id={cardID}
              value={this.state.question}
              onChange={this.handleChange}
            />
          ) : (
            <p>{question}</p>
          )}
        </div>
        <div>
          <h2>Answer:</h2>
          {this.state.editMode ? (
            <TextArea
              name="answerEdit"
              id={cardID}
              value={this.state.answer}
              onChange={this.handleChange}
            />
          ) : (
            <p>{answer}</p>
          )}
        </div>
        {this.state.editMode ? (
          <Button type="submit" value={cardID} content="save" />
        ) : (
          <div>
            <Button
              type="button"
              value={cardID}
              content="Edit"
              onClick={this.handleEdit}
            />
            <Button
              type="button"
              value={cardID}
              content="Delete"
              onClick={onDelete}
            />
          </div>
        )}
      </form>
    );
  }
}
export default CardManageItem;
