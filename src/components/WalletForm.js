import React, { Component } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

export default class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE,
    };
  }

  handleChanger = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  handleExpenses = () => {
    const {
      getExpenses,
      expenses,
    } = this.props;
    const expenseId = expenses.length === 0 ? 0 : expenses.length;
    const expense = {
      id: expenseId,
      ...this.state,
    };
    getExpenses(expense);
    this.resetState();
  }

  resetState = () => {
    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <section>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="number"
            placeholder="Digite um valor"
            value={ value }
            onChange={ this.handleChanger }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            placeholder="Digite uma descrição"
            value={ description }
            onChange={ this.handleChanger }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          <select
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChanger }
          >
            {currencies.map((moeda) => (
              <option key={ moeda }>
                {moeda}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          <select
            data-testid="method-input"
            id="method"
            value={ method }
            onChange={ this.handleChanger }
          >
            <option key="dinheiro">
              Dinheiro
            </option>
            <option key="Cartão de crédito">
              Cartão de crédito
            </option>
            <option key="Cartão de débito">
              Cartão de débito
            </option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            id="tag"
            data-testid="tag-input"
            valur={ tag }
            onChange={ this.handleChanger }
          >
            <option key="Alimentação">
              Alimentação
            </option>
            <option key="Lazer">
              Lazer
            </option>
            <option key="Trabalho">
              Trabalho
            </option>
            <option key="Transporte">
              Transporte
            </option>
            <option key="Saúde">
              Saúde
            </option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleExpenses }
          data-testid="add-button"
        >
          Adicionar despesa
        </button>
      </section>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};
