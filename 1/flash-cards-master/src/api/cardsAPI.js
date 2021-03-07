// import React from "react";
import axios from "axios";

const cardsAPI = axios.create({
  baseURL: "https://5f67855938ce8700163986d4.mockapi.io/cards",
});

export default cardsAPI;
