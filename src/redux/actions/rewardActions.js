import axios from '../../axios/axiosInstance';
export const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';

export const fetchTransactionsSuccess = (transactions) => ({
  type: FETCH_TRANSACTIONS_SUCCESS,
  payload: transactions,
});
// '132de5df-1346-4bdf-b6e2-d24e021e39ff'
export const fetchTransactions = () => {
  return async (dispatch) => {
    try {
      const customerToken = localStorage.getItem('customerToken');
      // This will be a post request in the future, as we need to send a token to fetch customer-specified data.
      let apiPath = '';
      if(customerToken === 'C001'){
        apiPath = '132de5df-1346-4bdf-b6e2-d24e021e39ff';
      }else if(customerToken === 'C002'){
        apiPath = '0839057c-fb47-4769-8b93-d48b39d183b3';
      }else {
        apiPath = '86d5cbb7-692c-4560-9a6f-ffbc822419b9';
      }
      
      const response = await axios.get(apiPath);
      let jsonString = response.data;

      // Ensure the JSON string is correctly formatted with double quotes
      jsonString = jsonString.replace(/,\s*([\]}])/g, '$1');

      // Step 2: Ensure the JSON string is correctly formatted with double quotes
      jsonString = jsonString.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
      jsonString = jsonString.replace(/'/g, '"');

      const array = JSON.parse(jsonString);
      dispatch(fetchTransactionsSuccess(array));
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
};