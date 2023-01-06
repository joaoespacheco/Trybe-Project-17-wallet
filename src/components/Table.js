import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Table extends Component {
  handleDeleteExpense = ({ target: { name } }) => {
    const { expenses, updateExpenses } = this.props;
    const newExpenses = expenses.filter(({ id }) => id !== Number(name));
    updateExpenses(newExpenses);
  }

  handleEditExpense = ({ target: { name } }) => {
    const { editExpense, expenses } = this.props;
    const expenseValues = expenses[name];
    editExpense(true, expenseValues);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-content">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          { expenses.length > 0
            ? (
              <tbody>
                {expenses.map((
                  {
                    id,
                    value,
                    description,
                    currency, method,
                    tag,
                    exchangeRates,
                  },
                ) => (
                  <tr key={ id }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{Number(value).toFixed(2)}</td>
                    <td>{exchangeRates[currency].name}</td>
                    <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                    <td>
                      {
                        (Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)
                      }
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        name={ id }
                        type="button"
                        data-testid="edit-btn"
                        onClick={ this.handleEditExpense }
                      >
                        Editar
                      </button>
                      <button
                        name={ id }
                        type="button"
                        data-testid="delete-btn"
                        onClick={ this.handleDeleteExpense }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td>
                    Digite uma despesa
                  </td>
                </tr>
              </tbody>
            )}
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateExpenses: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};
