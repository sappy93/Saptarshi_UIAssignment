import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from '../../redux/actions/rewardActions';
import DataTable from 'react-data-table-component';
import { rewardTableColumns } from './dataTableConfig';

const RewardCalculator = () => {
  const [transactionData, setTransactionData] = useState([])
  const [customerPoints, setCustomerPoints] = useState([])
  const dispatch = useDispatch();
  const rewardData = useSelector(state => state.reward);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    setCustomerPoints(rewardData.customerPoints);
    setTransactionData(rewardData.transactions);
  }, [rewardData]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Reward Points</h1>
      <div className='row g-6 mb-6'>
        {customerPoints && Object.keys(customerPoints).map(customerId => (
          <>
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="card shadow border-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <span class="h6 font-semibold text-muted text-sm d-block mb-2">Total Points</span>
                      <span class="h3 font-bold mb-0">{customerPoints[customerId].totalPoints} Points</span>
                    </div>
                    <div class="col-auto">
                    <div class="icon icon-shape bg-primary text-white text-lg rounded-circle">
                    <i class="bi bi-trophy-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
              {Object.keys(customerPoints[customerId].monthlyPoints).map(month => (
                <div class="col-xl-3 col-sm-6 col-12">
                  <div class="card shadow border-0">
                      <div class="card-body">
                          <div class="row">
                              <div class="col">
                                  <span class="h6 font-semibold text-muted text-sm d-block mb-2">{month}</span>
                                  <span class="h3 font-bold mb-0">{customerPoints[customerId].monthlyPoints[month]} Points</span>
                              </div>
                              <div class="col-auto">
                                  <div class="icon icon-shape bg-info text-white text-lg rounded-circle">
                                    <i class="bi bi-award-fill"></i>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              ))}
            </>
          ))}
      </div>
      <div className="ch__rewad__data-table--wrapper">
        <DataTable
          title="Transactions Data"
          columns={rewardTableColumns}
          data={transactionData}
          pagination
        />
      </div>
    </div>
  );
};

export default RewardCalculator;