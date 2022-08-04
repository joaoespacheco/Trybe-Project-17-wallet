import getFetchCurrencies from '../../services/awesomeApi';

export const USER_LOGIN = 'USER_LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXCHANGE_RATES = 'EXCHANGE_RATES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const loginAction = (email) => ({
  type: USER_LOGIN,
  email,
});

export const currenciesAction = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  const response = await getFetchCurrencies();
  const currencies = response;
  const payload = Object.keys(currencies);
  payload.splice(1, 1);
  dispatch(currenciesAction(payload));
};

export const getExpenses = (exchangeRates, expense) => ({
  type: SAVE_EXPENSE,
  expense: { ...expense, exchangeRates },
});

export const getExchangeRatesThunk = (expense) => async (dispatch) => {
  const response = await getFetchCurrencies();
  const exchangeRates = response;
  delete exchangeRates.USDT;
  dispatch(getExpenses(exchangeRates, expense));
};
