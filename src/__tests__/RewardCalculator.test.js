import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { thunk } from "redux-thunk";
import RewardCalculator from '../components/reward-calculator/RewardCalculator';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('RewardCalculator Component', () => {
  it('should display customer reward points', () => {
    const initialState = {
      customerPoints: {
        "C001": {
            "monthlyPoints": {
                "1": 115,
                "2": 250,
                "3": 40
            },
            "totalPoints": 405
        }
    }
    };

    const store = mockStore({reward:initialState});

    render(
      <Provider store={store}>
        <RewardCalculator />
      </Provider>
    );

    expect(screen.getByText('Reward Points')).toBeInTheDocument();
    expect(screen.getByText('Total Points')).toBeInTheDocument();
    expect(screen.getByText('405 Points')).toBeInTheDocument();
    expect(screen.getByText('Month 1')).toBeInTheDocument();
    expect(screen.getByText('115 Points')).toBeInTheDocument();
    expect(screen.getByText('Month 2')).toBeInTheDocument();
    expect(screen.getByText('250 Points')).toBeInTheDocument();
    expect(screen.getByText('Month 3')).toBeInTheDocument();
    expect(screen.getByText('40 Points')).toBeInTheDocument();
  });
});