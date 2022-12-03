import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import WalletEdit from '../components/WalletEdit';
import Table from '../components/Table';
import {
  getCurrenciesThunk,
  getExchangeRatesThunk,
  updateExpenses,
  editExpense,
} from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { edit } = this.props;
    return (
      <main>
        <Header
          { ...this.props }
        />
        {edit.status ? (
          <WalletEdit
            { ...this.props }
          />
        ) : (
          <WalletForm
            { ...this.props }
          />
        )}
        <Table
          { ...this.props }
        />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  exchange: state.wallet.exchange,
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesThunk()),
  getExpenses: (expense) => dispatch(getExchangeRatesThunk(expense)),
  updateExpenses: (expenses) => dispatch(updateExpenses(expenses)),
  editExpense: (status, values) => dispatch(editExpense(status, values)),
});

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  edit: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
