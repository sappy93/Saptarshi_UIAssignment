import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from '../../redux/actions/rewardActions';
import DataTable from 'react-data-table-component';
import { rewardTableColumns } from './dataTableConfig';

const RewardCalculator = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  const {reward: rewardData} = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (rewardData.customerGroupedData?.length > 0) {
      setSelectedCustomer(rewardData.customerGroupedData[0]?.customerId);
    }
  }, [rewardData]);

  const handleCustomerChange = useCallback((event) => {
    setSelectedCustomer(event.target.value);
  }, []);

  const selectedCustomerData = rewardData.customerGroupedData.find(customer => customer.customerId === selectedCustomer);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Reward Points</h1>
      {auth?.user?.username === 'admin' && (
        <div className='row g-6 mb-6'>
          <div className="mb-3 col-4">
            <label htmlFor="customerSelect" className="form-label">Select Customer:</label>
            <select className="form-select" id="customerSelect" value={selectedCustomer} onChange={handleCustomerChange}>
              {rewardData.customerGroupedData.map(customer => (
                <option key={customer.customerId} value={customer.customerId}>{customer.customerId}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className='row g-6 mb-6'>
        {selectedCustomerData && (
          <>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total Points</span>
                      <span className="h3 font-bold mb-0">{selectedCustomerData.totalPoints} Points</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                        <i className="bi bi-trophy-fill"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {Object.keys(selectedCustomerData.monthlyPoints).map(month => (
              <div className="col-xl-3 col-sm-6 col-12" key={month}>
                <div className="card shadow border-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <span className="h6 font-semibold text-muted text-sm d-block mb-2">{month}</span>
                        <span className="h3 font-bold mb-0">{selectedCustomerData.monthlyPoints[month]} Points</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                          <i className="bi bi-award-fill"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {selectedCustomerData && (
        <div className="ch__rewad__data-table--wrapper">
          <DataTable
            title="Transactions Data"
            columns={rewardTableColumns}
            data={selectedCustomerData.groupedTransactions}
            pagination
          />
        </div>
      )}
    </div>
  );
};

export default RewardCalculator;