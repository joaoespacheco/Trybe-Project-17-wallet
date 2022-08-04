import getFetchCurrencies from '../../services/awesomeApi';

export const USER_LOGIN = 'USER_LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';

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
  const payload = response;
  dispatch(currenciesAction(payload));
};
