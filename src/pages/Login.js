/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonLockStatus: true,
    };
  }

  stateHandleChanger = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value }, () => this.formatChecker());
  };

  handleClickLogin = () => {
    const { email } = this.state;
    const { dispatchUserLogin, history } = this.props;
    dispatchUserLogin(email);
    history.push('/carteira');
  }

  formatChecker = () => {
    const { email, password } = this.state;
    const MinEmailLength = 6;
    const regex = /\S+@\S+\.\S+/;
    const formatChecker = regex.test(email);
    const lengthChecker = password.length >= MinEmailLength && password.length !== 0;
    const checker = formatChecker && lengthChecker;
    this.setState({ buttonLockStatus: !checker });
  }

  render() {
    const { email, password, buttonLockStatus } = this.state;
    return (
      <main className="login-container">
        <div className="login-container-content">
          <div className="login-content">
            <h1>TrybeWallet</h1>
            <div>
              <div className="login-content-form">
                <label htmlFor="email">
                  <input
                    id="email"
                    type="text"
                    data-testid="email-input"
                    placeholder="Digite seu email..."
                    value={ email }
                    onChange={ this.stateHandleChanger }
                  />
                </label>
                <label htmlFor="password">
                  <input
                    id="password"
                    type="text"
                    data-testid="password-input"
                    placeholder="Digite sua senha..."
                    value={ password }
                    onChange={ this.stateHandleChanger }
                  />
                </label>
              </div>
              <button
                type="button"
                data-testid="login-button"
                disabled={ buttonLockStatus }
                onClick={ this.handleClickLogin }
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUserLogin: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatchUserLogin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
