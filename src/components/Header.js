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
    return sumExpenses.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <div>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{this.sumOfExpenses()}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};
