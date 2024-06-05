import rewardReducer from '../redux/reducers/rewardReducer';
import { FETCH_TRANSACTIONS_SUCCESS } from '../redux/actions/rewardActions';

describe('Redux Reducer', () => {
  const initialState = {
    transactions: [],
    customerGroupedData: []
  };

  it('should return the initial state', () => {
    expect(rewardReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_TRANSACTIONS_SUCCESS', () => {
    const transactions = [
      { customerId: 1, amount: 120, date: '2023-01-10' },
      { customerId: 2, amount: 80, date: '2023-02-15' }
    ];

    const action = {
      type: FETCH_TRANSACTIONS_SUCCESS,
      payload: transactions,
    };

    const expectedState = {
      transactions: transactions,
      customerGroupedData: [
        {
          customerId: 1,
          monthlyPoints: { "January": 90 },
          totalPoints: 90,
          groupedTransactions: [
            { customerId: 1, amount: 120, date: '2023-01-10' }
          ]
        },
        {
          customerId: 2,
          monthlyPoints: { "February": 30 },
          totalPoints: 30,
          groupedTransactions: [
            { customerId: 2, amount: 80, date: '2023-02-15' }
          ]
        }
      ]
    };

    expect(rewardReducer(initialState, action)).toEqual(expectedState);
  });

  // Add more test cases for other action types or edge cases if needed
});