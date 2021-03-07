import React from "react";
import cardsAPI from "../api/cardsAPI";
import FlashCard from "./utilities/FlashCard";
import Button from "./utilities/Button";

class FlashCards extends React.Component {
  state = {
    allCards: [],
    allCardsLength: 0,
    currentCardIndex: 0,
    isFlipped: false,
    progress: 0,
    isGameDone: false,
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
      this.setState({
        allCards: cardsList.data,
        allCardsLength: cardsList.data.length,
        currentCardIndex: 0,
        isFlipped: false,
        progress: 0,
      });
    } catch (err) {
      this.handleError(err);
    }
  };
  newGame = () => {
    this.updateCardsState();
  };
  componentDidMount = () => {
    this.newGame();
  };
  getRandomCardIndex = (prevCardIndex) => {
    if (this.state.allCards.length > 1) {
      const listLength = this.state.allCards.length;
      let newCardIndex;
      newCardIndex = Math.floor(Math.random() * (listLength - 1));
      return newCardIndex;
    } else return 0;
  };

  showNewCard = (currentCardIndex) => {
    const newCardIndex = this.getRandomCardIndex(currentCardIndex);
    this.setState({ currentCardIndex: newCardIndex, isFlipped: false });
  };
  flipCard = (currentCardIndex) => {
    this.setState({ isFlipped: !this.state.isFlipped });
  };
  goodGuess = (currentCardIndex) => {
    let newAllCards = [...this.state.allCards];
    newAllCards.splice(currentCardIndex, 1);
    this.setState((prevState) => ({
      progress: prevState.progress + 1,
      allCards: newAllCards,
    }));
    if (this.state.progress === this.state.allCardsLength - 1) {
      this.displayWin();
    } else this.showNewCard(currentCardIndex);
  };
  displayWin = () => {
    this.setState({ isGameDone: true });
    return (
      <div>
        <Button
          type="button"
          value={0}
          content="New Game"
          onClick={this.newGame}
        />
      </div>
    );
  };
  askIfGotIt = (currentCardIndex) => {
    return (
      <div>
        <h2>Did you get it?</h2>
        <Button
          type="button"
          value={currentCardIndex}
          content="No"
          onClick={this.showNewCard}
        />
        <Button
          type="button"
          value={currentCardIndex}
          content="Yes"
          onClick={this.goodGuess}
        />
      </div>
    );
  };
  render() {
    if (this.state.allCards.length) {
      const { currentCardIndex, isFlipped } = this.state;
      const newCard = this.state.allCards[currentCardIndex];
      return (
        <div className="inner-page column-flex">
          <div className="dark-bg flash-cards">
            <FlashCard
              key={newCard.id}
              id={newCard.id}
              question={newCard.question}
              answer={newCard.answer}
              isFlipped={isFlipped}
            />
            <Button
              type="button"
              value={currentCardIndex}
              content="New Card"
              onClick={this.showNewCard}
            />
            {isFlipped ? (
              this.askIfGotIt(currentCardIndex)
            ) : (
              <Button
                type="button"
                value={currentCardIndex}
                content="Revile answer"
                onClick={this.flipCard}
              />
            )}
            <h2>
              Progress: {this.state.progress}/{this.state.allCardsLength}
            </h2>
          </div>
        </div>
      );
    } else {
      return this.state.isGameDone ? (
        <div className="inner-page column-flex">
          <div className="dark-bg flash-cards">
            <h1>You got it ALL! </h1>
            <h2>Do you want to go again?</h2>
            <Button
              type="button"
              value={0}
              content="New Game"
              onClick={this.newGame}
            />
          </div>
        </div>
      ) : (
        <div className="inner-page column-flex">
          <div className="dark-bg flash-cards">Loading...</div>
        </div>
      );
    }
  }
}

export default FlashCards;
