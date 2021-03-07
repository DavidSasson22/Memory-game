import React from "react";
import cardsAPI from "../api/cardsAPI";
import AddNew from "./AddNew";
import CardManageItem from "./utilities/CardManageItem";

class ManageCards extends React.Component {
  state = {
    cards: [],
  };
  handleError = (err) => {
    console.log(err);
  };
  updateCardsState = async () => {
    try {
      const cardsList = await cardsAPI.get();
      if (!cardsList.data.length) {
        this.handleError("Path not valid or no data in API");
      }
      this.setState({ cards: cardsList.data });
    } catch (err) {
      this.handleError(err);
    }
  };
  componentDidMount = () => {
    this.updateCardsState();
  };
  addNewCard = async ({ question, answer }) => {
    try {
      const newCard = await cardsAPI.post("", { question, answer });
      this.updateCardsState();
    } catch (err) {
      this.handleError(err);
    }
  };
  removeCard = async (cardID) => {
    try {
      const deletedCard = await cardsAPI.delete(cardID);
      this.updateCardsState();
    } catch (err) {
      this.handleError(err);
    }
  };
  onEditSubmit = async (question, answer, cardID) => {
    try {
      const editedCard = await cardsAPI.put(cardID, {
        question,
        answer,
        id: cardID,
      });
      this.updateCardsState();
    } catch (err) {
      this.handleError(err);
    }
  };
  renderCards = () => {
    if (this.state.cards.length) {
      const cards = this.state.cards;
      return cards.map((card) => {
        return (
          <CardManageItem
            className="card"
            key={card.id}
            id={card.id}
            question={card.question}
            answer={card.answer}
            onDelete={this.removeCard}
            onSubmit={this.onEditSubmit}
          />
        );
      });
    }
  };
  render() {
    return (
      <div>
        <div className="inner-page">
          <div className="dark-bg manage-cards">
            <AddNew onSubmit={this.addNewCard} />
            {this.renderCards()}
          </div>
        </div>
      </div>
    );
  }
}

export default ManageCards;
