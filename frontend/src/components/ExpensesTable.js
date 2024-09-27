import React from 'react';

const ExpensesTable = ({ expenses, category, handleExpenseChange, deleteExpenseRow }) => {
  return (
    <div class="expense-table-wrapper">
        <table className="expense-table">
        <thead>
            <tr>
            <th>Delete</th>
            <th>Name</th>
            <th>Description</th>
            <th>Amount ($)</th>
            </tr>
        </thead>
        <tbody>
            {expenses.map((expense, index) => (
            <tr key={index}>
                <td>
                <button onClick={() => deleteExpenseRow(index)} className="delete-button">
                    X
                </button>
                </td>
                <td>
                    <select
                        value={expense.category}
                        onChange={(e) => handleExpenseChange(index, 'category', e.target.value)}
                        className="input-field"
                        >
                        <option value="">Select Category</option>
                        {Object.keys(category).map((key) => (
                            <option key={key} value={key}>
                            {category[key].name}
                            </option>
                        ))}
                    </select>
                </td>
                <td>
                <input
                    type="text"
                    value={expense.description}
                    onChange={(e) => handleExpenseChange(index, 'description', e.target.value)}
                    placeholder="Description"
                    className="input-field"
                />
                </td>
                <td>
                <input
                    type="number"
                    value={expense.amount}
                    onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {
                        handleExpenseChange(index, 'amount', value);
                    } else {
                        handleExpenseChange(index, 'amount', 0);
                    }
                    }}
                    placeholder="Amount"
                    className="input-field"
                />
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default ExpensesTable;