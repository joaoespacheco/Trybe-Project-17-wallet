async function getFetchCurrencies() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const currencies = Object.keys(data);
    currencies.splice(1, 1);
    return currencies;
  } catch (error) {
    return error;
  }
}

export default getFetchCurrencies;
