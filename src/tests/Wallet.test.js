import React from 'react';
import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet'
import {renderWithRouterAndRedux} from './helpers/renderWith';

describe('Conjunto de teste relacionados a tela wallet', () => {
  test('Verificando se os elementos do componente Header são renderizados',
  () => {
    renderWithRouterAndRedux(<Wallet />);

    const headerEmailField = screen.getByTestId("email-field")
    const headerTotalField = screen.getByTestId("total-field")
    const headercurrencyField = screen.getByTestId("header-currency-field")


    expect(headerEmailField).toBeInTheDocument()
    expect(headerTotalField).toBeInTheDocument()
    expect(headercurrencyField).toBeInTheDocument()

  });

  test('Verificando se os elementos do componente Wallet são renderizados',
  () => {
    renderWithRouterAndRedux(<Wallet />);

    const walletValueInput = screen.getByTestId("value-input")
    const walletDescriptionInput = screen.getByTestId("description-input")
    const walletCurrencySelect = screen.getByTestId("currency-input")
    const walletMethodSelect = screen.getByTestId("method-input")
    const walletTagSelect = screen.getByTestId("tag-input")
    const walletButtonAdd = screen.getByTestId("add-button")

    expect(walletValueInput).toBeInTheDocument()
    expect(walletDescriptionInput).toBeInTheDocument()
    expect(walletCurrencySelect).toBeInTheDocument()
    expect(walletMethodSelect).toBeInTheDocument()
    expect(walletTagSelect).toBeInTheDocument()
    expect(walletButtonAdd).toBeInTheDocument()
  });

});