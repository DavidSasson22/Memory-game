import React from "react";
import Button from "./utilities/Button";
import TextArea from "./utilities/TextArea";

class AddNew extends React.Component {
  state = {
    question: "",
    answer: "",
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };
  handleChange = (value, inputName) => {
    inputName === "newQuestion" && this.setState({ question: value });
    inputName === "newAnswer" && this.setState({ answer: value });
  };
  render() {
    // console.log(this.state);
    return (
      <form className="card" onSubmit={this.handleFormSubmit}>
        <div>
          <h2>Question:</h2>
          <TextArea
            name="newQuestion"
            id="newQuestionInput"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <h2>Answer:</h2>
          <TextArea
            name="newAnswer"
            id="newAnswerInput"
            onChange={this.handleChange}
          />
        </div>
        <Button type="submit" content="Add" />
      </form>
    );
  }
}

export default AddNew;
