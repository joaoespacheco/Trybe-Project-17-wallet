import React, { Component } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

export default class WalletEdit extends Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE,
    };
  }

  componentDidMount() {
    const { edit } = this.props;
    this.setState({ ...edit.values });
  }

  handleChanger = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  handleExpenses = () => {
    const { updateExpenses, expenses } = this.props;
    const allExpenses = expenses;
    const editedExpense = {
      ...this.state,
    };
    allExpenses.splice(editedExpense.id, 1, editedExpense);
    updateExpenses(allExpenses);
    this.resetState();
    this.resetEditExpense();
  }

  resetEditExpense = () => {
    const { editExpense } = this.props;
    editExpense(false, {});
  }

  resetState = () => {
    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { value, description, currency, method, tag, exchangeRates } = this.state;
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
            {Object.keys(exchangeRates).map((moeda) => (
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
          Editar despesa
        </button>
      </section>
    );
  }
}

WalletEdit.propTypes = {
  updateExpenses: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  edit: PropTypes.objectOf(PropTypes.any).isRequired,
};
