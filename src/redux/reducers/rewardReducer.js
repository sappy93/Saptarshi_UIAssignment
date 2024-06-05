import { FETCH_TRANSACTIONS_SUCCESS } from '../actions/rewardActions';

const initialState = {
  transactions: [],
  customerGroupedData: []
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
  const groupedData = [];
  const monthFull = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  transactions.forEach(transaction => {
    const { customerId, amount, date } = transaction;
    const month = monthFull[new Date(date).getMonth()]; // Get month (1-12)
  
    let customerRecord = groupedData.find(item => item.customerId === customerId);
    
    if (!customerRecord) {
      customerRecord = {
        customerId,
        monthlyPoints: { [month]: 0 },
        totalPoints: 0,
        groupedTransactions: []
      };
      groupedData.push(customerRecord);
    } else if (!customerRecord.monthlyPoints[month]) {
      customerRecord.monthlyPoints[month] = 0;
    }
    const points = calculatePoints(amount);
    customerRecord.monthlyPoints[month] += points;
    customerRecord.totalPoints += points;
    customerRecord.groupedTransactions.push(transaction);
  });
  return groupedData;
};
const rewardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS_SUCCESS:
      const groupedData = groupTransactionsByCustomerAndMonth(action.payload);
      return { ...state, transactions: action.payload, customerGroupedData: groupedData };
    default:
      return state;
  }
};

export default rewardReducer;