// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, SAVE_EXPENSE, UPDATE_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: {
    status: false,
    values: {},
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: action.edit,
    };
  default:
    return state;
  }
};

export default wallet;
