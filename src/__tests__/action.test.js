import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import { thunk } from "redux-thunk";
import MockAdapter from 'axios-mock-adapter';
import { fetchTransactions, fetchTransactionsSuccess, FETCH_TRANSACTIONS_SUCCESS } from '../redux/actions/rewardActions';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Redux Actions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should create an action to fetch transactions successfully', () => {
    const transactions = [
      { customerId: 1, amount: 120, date: '2023-01-10' },
      { customerId: 2, amount: 80, date: '2023-02-15' }
    ];
    const expectedAction = {
      type: FETCH_TRANSACTIONS_SUCCESS,
      payload: transactions,
    };
    expect(fetchTransactionsSuccess(transactions)).toEqual(expectedAction);
  });
});