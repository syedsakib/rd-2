import validator from "card-validator";

export const validateCard = (cardNo) => {
  return validator.number(cardNo);
};
