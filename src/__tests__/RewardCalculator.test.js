import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { thunk } from "redux-thunk";
import RewardCalculator from '../components/reward-calculator/RewardCalculator';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('RewardCalculator component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {
          username: 'admin'
        }
      },
      reward: {
        customerGroupedData: [
          {
            customerId: 'customer1',
            totalPoints: 80,
            monthlyPoints: {
              January: 50,
              February: 30,
            },
            groupedTransactions: [
              {
                id: 1,
                amount: 20,
                date: '2024-01-01',
              },
              {
                id: 2,
                amount: 30,
                date: '2024-01-15',
              },
            ],
          },
        ],
      },
    });
  });

  test('renders RewardCalculator component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <RewardCalculator />
      </Provider>
    );
    expect(getByText('Reward Points')).toBeInTheDocument();
  });

  test('selects a customer and displays their total points', async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <RewardCalculator />
      </Provider>
    );

    const selectElement = getByLabelText('Select Customer:');
    fireEvent.change(selectElement, { target: { value: 'customer1' } });

    await waitFor(() => {
      expect(getByText('Total Points')).toBeInTheDocument();
      expect(getByText('80 Points')).toBeInTheDocument();
      expect(screen.getByText('January')).toBeInTheDocument();
      expect(screen.getByText('50 Points')).toBeInTheDocument();
      expect(screen.getByText('February')).toBeInTheDocument();
      expect(screen.getByText('30 Points')).toBeInTheDocument();
    });
  });
});
