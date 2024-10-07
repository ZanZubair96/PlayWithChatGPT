import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './FinanceTab.css';

function FinanceTab({ contactId }) {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ owed: 0, lent: 0 });

  useEffect(() => {
    // Simulating API call to fetch transactions and summary
    const fetchFinanceData = async () => {
      // Replace these with actual API calls
      const transactionsResponse = await fetch(`/api/contacts/${contactId}/transactions`);
      const transactionsData = await transactionsResponse.json();
      setTransactions(transactionsData);

      const summaryResponse = await fetch(`/api/contacts/${contactId}/finance-summary`);
      const summaryData = await summaryResponse.json();
      setSummary(summaryData);
    };

    fetchFinanceData();
  }, [contactId]);

  const addTransaction = () => {
    // Implement add transaction functionality
  };

  const chartData = [
    { name: 'Owed', amount: summary.owed },
    { name: 'Lent', amount: summary.lent },
  ];

  return (
    <div className="finance-tab">
      <div className="finance-summary">
        <h3>Financial Summary</h3>
        <p>Total Owed: ${summary.owed}</p>
        <p>Total Lent: ${summary.lent}</p>
      </div>
      <button onClick={addTransaction} className="add-button">Add New Transaction</button>
      <div className="transaction-list">
        <h3>Transactions</h3>
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id} className={`transaction-item ${transaction.amount < 0 ? 'expense' : 'income'}`}>
              <span className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</span>
              <span className="transaction-description">{transaction.description}</span>
              <span className="transaction-amount">${Math.abs(transaction.amount).toFixed(2)}</span>
              <span className="transaction-category">{transaction.category}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="finance-chart">
        <h3>Financial Overview</h3>
        <BarChart width={400} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default FinanceTab;