import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    console.log(currencies);
    // const moedasUtilizaveis = currencies.filter(({ codein }) => codein !== 'BRLT');
    // console.log(moedasUtilizaveis);
    return (
      <section>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="number"
            placeholder="Digite um valor"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            placeholder="Digite uma descrição"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          <select id="currency" data-testid="currency-input">
            {currencies.map((currency) => (
              <option key={ currency } value={ currency }>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="payment">
          <select data-testid="method-input" id="payment">
            <option key="dinheiro" value="dinheiro">
              Dinheiro
            </option>
            <option key="Cartão de crédito" value="Cartão de crédito">
              Cartão de crédito
            </option>
            <option key="Cartão de débito" value="Cartão de débito">
              Cartão de débito
            </option>
          </select>
        </label>
        <label htmlFor="tag">
          <select id="tag" data-testid="tag-input">
            <option key="Alimentação" value="Alimentação">
              Alimentação
            </option>
            <option key="Lazer" value="Lazer">
              Lazer
            </option>
            <option key="Trabalho" value="Trabalho">
              Trabalho
            </option>
            <option key="Transporte" value="Transporte">
              Transporte
            </option>
            <option key="Saúde" value="Saúde">
              Saúde
            </option>
          </select>
        </label>
        <button type="button">Adicionar despesa</button>
      </section>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
