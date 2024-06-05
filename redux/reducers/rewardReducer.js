import { FETCH_TRANSACTIONS_SUCCESS } from '../actions/rewardActions';

const initialState = {
  transactions: [],
  customerPoints: []
};

const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2;
    amount = 100;
  }
  if (amount > 50) {
    points += (amount - 50);
  }
  return points;
};

const groupTransactionsByCustomerAndMonth = (transactions) => {
  const groupedData = {};
  const monthFull = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  transactions.forEach(transaction => {
    const { customerId, amount, date } = transaction;
    const month = monthFull[new Date(date).getMonth()]; // Get month (1-12)
    if (!groupedData[customerId]) {
      groupedData[customerId] = { monthlyPoints: {}, totalPoints: 0 };
    }

    if (!groupedData[customerId].monthlyPoints[month]) {
      groupedData[customerId].monthlyPoints[month] = 0;
    }

    const points = calculatePoints(amount);
    groupedData[customerId].monthlyPoints[month] += points;
    groupedData[customerId].totalPoints += points;
  });

  return groupedData;
};

const rewardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS_SUCCESS:
      const groupedData = groupTransactionsByCustomerAndMonth(action.payload);
      return { ...state, transactions: action.payload, customerPoints: groupedData };
    default:
      return state;
  }
};

export default rewardReducer;