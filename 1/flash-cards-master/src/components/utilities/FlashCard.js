import React from "react";

class FlashCard extends React.Component {
  state = {
    question: "",
    answer: "",
    cardID: "",
  };
  componentDidMount = () => {
    this.setState({
      question: this.props.question,
      answer: this.props.answer,
      cardID: this.props.cardID,
    });
  };
  render() {
    return (
      <div className="scene scene--flash-card">
        <div className={`flash-card ${this.props.isFlipped && "is-flipped"}`}>
          <div className="flash-card__face flash-card__face--front">
            {this.state.question}
          </div>
          <div className="flash-card__face flash-card__face--back">
            {this.state.answer}
          </div>
        </div>
      </div>
    );
  }
}

export default FlashCard;
