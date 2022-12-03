import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet'
import {renderWithRouterAndRedux} from './helpers/renderWith';
import mockData from './mocks/mockData'
import { expenseMock, expensesMock } from './mocks/expensesMock'
import currenciesMock from './mocks/currenciesMock'

const INITIAL_STATE = {
  wallet: {
    currencies: currenciesMock,
    expenses: expensesMock,
    edit: {
      status: false,
      values: {},
    }
  },
};

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

  test('testando adição, edição e remoção de uma despesa', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<Wallet />);

    const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(ENDPOINT));

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencySelect = screen.getByTestId("currency-input")
    const methodSelect = screen.getByTestId("method-input")
    const tagSelect = screen.getByTestId("tag-input")
    const addExpenseButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, expenseMock.value);
    userEvent.type(descriptionInput, expenseMock.description);
    userEvent.type(currencySelect, expenseMock.currency);
    userEvent.type(methodSelect, expenseMock.method);
    userEvent.type(tagSelect, expenseMock.tag);
    userEvent.click(addExpenseButton);

    expect(await screen.findByRole('cell', { name: 'lanche' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Alimentação' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: '10.00' })).toBeInTheDocument();

    const headerTotalField = screen.getByTestId("total-field")
    expect(headerTotalField).toHaveTextContent('47.53')

    const editButton = screen.getByTestId('edit-btn');
    expect(editButton).toBeInTheDocument();

    userEvent.click(editButton);

    const valueInputEdit = screen.getByTestId('value-input');
    const addButton = screen.getByTestId('add-button');
    expect(addButton).toBeInTheDocument();
    expect(valueInputEdit).toBeInTheDocument();

    userEvent.type(valueInputEdit, '15');
    userEvent.click(addButton);

    expect(await screen.findByRole('cell', { name: '15.00' })).toBeInTheDocument();

    const deleteButton = screen.getAllByTestId('delete-btn');
    expect(deleteButton[0]).toBeInTheDocument();

    userEvent.click(deleteButton[0]);
    expect(deleteButton[0]).not.toBeInTheDocument();    
  });
});