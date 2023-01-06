import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
  currencyConverter = () => {
    const { expenses } = this.props;
    if (expenses.length !== 0) {
      return expenses.map(
        ({ value, currency, exchangeRates }) => (
          Number(value) * Number(exchangeRates[currency].ask)),
      );
    }
    return [0];
  }

  sumOfExpenses = () => {
    const expensesBrl = this.currencyConverter();
    const sumExpenses = expensesBrl.reduce((acc, arr) => (acc + arr), 0);
    const valueBrlFormated = sumExpenses.toLocaleString('pt-br', {
      style: 'currency', currency: 'BRL',
    });
    return valueBrlFormated;
  }

  render() {
    const { email, history } = this.props;
    return (
      <header className="header-container">
        <div className="header-container-logo">
          <h1>TrybeWallet</h1>
        </div>
        <div className="header-container-total-field">
          <p data-testid="total-field">{`Valor Total: ${this.sumOfExpenses()}`}</p>
          <p data-testid="header-currency-field">Moeda: BRL</p>
        </div>
        <div className="header-container-user">
          <p data-testid="email-field">{email || 'Usuário não logado'}</p>
          <button
            type="button"
            onClick={ () => history.push('/') }
          >
            Logout
          </button>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
