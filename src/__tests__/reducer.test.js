import rewardReducer from '../redux/reducers/rewardReducer';
import { FETCH_TRANSACTIONS_SUCCESS } from '../redux/actions/rewardActions';

describe('Redux Reducer', () => {
  const initialState = {
    transactions: [],
    customerPoints: [],
  };

  it('should return the initial state', () => {
    console.debug('test==>',rewardReducer(undefined, []))
    expect(rewardReducer(undefined, [])).toEqual(initialState);
  });

  it('should handle FETCH_TRANSACTIONS_SUCCESS', () => {
    const transactions = [
      { customerId: 1, amount: 120, date: '2023-01-10' },
      { customerId: 2, amount: 80, date: '2023-02-15' }
    ];

    const expectedState = {
      transactions: transactions,
      customerPoints: {
        1: { monthlyPoints: { 1: 90 }, totalPoints: 90 },
        2: { monthlyPoints: { 2: 30 }, totalPoints: 30 }
      }
    };

    const action = {
      type: FETCH_TRANSACTIONS_SUCCESS,
      payload: transactions,
    };

    expect(rewardReducer(initialState, action)).toEqual(expectedState);
  });
});