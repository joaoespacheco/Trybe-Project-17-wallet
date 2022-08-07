import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {renderWithRouterAndRedux} from './helpers/renderWith';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const buttonTestId = 'login-button';

describe('Conjunto de teste relacionados a tela de Login', () => {
  test('Verificando se os elementos de input e button são renderizados na tela',
    () => {
      renderWithRouterAndRedux(<App />);
      const inputEmail = screen.getByTestId(emailTestId)
      const inputPassword = screen.getByTestId(passwordTestId)
      const buttonLogin = screen.getByTestId(buttonTestId)

      expect(inputEmail).toBeInTheDocument()
      expect(inputPassword).toBeInTheDocument()
      expect(buttonLogin).toBeInTheDocument()
    });

    test('Verificando ao iniciar o botão está desabilitado, e se digitar a senha e login com formato correto ele desbloqueia',
    () => {
      renderWithRouterAndRedux(<App />);

      const inputEmail = screen.getByTestId(emailTestId)
      const inputPassword = screen.getByTestId(passwordTestId)
      const buttonLogin = screen.getByTestId(buttonTestId)

      expect(buttonLogin).toBeDisabled();

      userEvent.type(inputPassword, '123456')
      userEvent.type(inputEmail, 'testeteste.com')

      expect(buttonLogin).toBeDisabled();

      userEvent.type(inputPassword, '12345')
      userEvent.type(inputEmail, 'teste@teste.com')

      expect(buttonLogin).toBeDisabled();

      userEvent.type(inputPassword, '123456')
      userEvent.type(inputEmail, 'teste@teste.com')

      expect(buttonLogin).toBeEnabled();
    });

    test('Verificando se ao clicar no botão somos direcionados para a página "/carteira" ',
    () => {
      const { history } = renderWithRouterAndRedux(<App />);
      const inputEmail = screen.getByTestId(emailTestId)
      const inputPassword = screen.getByTestId(passwordTestId)
      const buttonLogin = screen.getByTestId(buttonTestId)

      userEvent.type(inputPassword, '123456')
      userEvent.type(inputEmail, 'teste@teste.com')
      userEvent.click(buttonLogin)


      expect(history.location.pathname).toBe('/carteira')
    });
  });