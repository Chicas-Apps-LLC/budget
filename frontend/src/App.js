import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [period, setPeriod] = useState('Monthly');
  const [income, setIncome] = useState(0);
  const [rent, setRent] = useState(0);
  const [utilities, setUtilities] = useState(0); 
  const [cars, setCars] = useState(0);

  const billsTotal = rent + utilities + cars;
  const mandatoryExpensesTotal = billsTotal; // Add other mandatory expenses if applicable
  const remainingIncome = income - mandatoryExpensesTotal; 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chicas Apps</h1>
      </header>

      <h2>Travel Budget</h2>

      {/* Dropdown for budgeting period */}
      <label htmlFor="period">Period:</label>
      <select id="period" value={period} onChange={(e) => setPeriod(e.target.value)}>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>   
        <option value="Yearly">Yearly</option>
      </select>   

      <div> {/* Container for income */}
        <label htmlFor="money">Starting Money:</label> $
        <input type="number" id="money" value={money} onChange={(e) => setMoney(Number(e.target.value))}/>
      </div>

      <div> {/* Container for mandatory expenses */}
        <h3>Mandatory Expenses</h3>
        <h4>Bills</h4>
        <p>Total: $ {billsTotal}</p>

        <div>
          <label htmlFor="rent">Rent:</label> $
          <input type="number" id="rent" value={rent} onChange={(e) => setRent(Number(e.target.value))}/> 
        </div>

        <div>
          <label htmlFor="utilities">Utilities:</label> $
          <input type="number" id="utilities" value={utilities} on onChange={(e) => setUtilities(Number(e.target.value))} /> 
        </div>

        <div>
          <label htmlFor="cars">Cars:</label> $
          <input type="number" id="cars" value={cars} onChange={(e) => setCars(Number(e.target.value))}/> 
        </div>
      </div>

      <p>Remaining income: $ {income - billsTotal}</p>

      <h3>What else do you spend money on?</h3>

      <div>
        <label htmlFor="groceries">Groceries:</label> $
        <input type="number" id="groceries" /> 
      </div>

      <div>
        <label htmlFor="subs">Subscriptions:</label> $
        <input type="number" id="groceries" /> 
      </div>
    </div>
  );
}

export default App;