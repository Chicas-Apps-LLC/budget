import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState();
  const [period, setPeriod] = useState();
  const [money, setMoney] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      location, 
      period,
      money,
    };

    try {
      // Send POST request to the Django backend
      const response = await axios.post('http://localhost:8000/api/travel-budget/', formData);
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="Travel Budget">
      <header className="Travel Budget by Chicas Apps">
        <h1>Chicas Apps</h1>
      </header>

      <h2>Travel Budget</h2>

      <label htmlFor='location'>Where are you traveling to?</label>
      <select id='location' value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="NY">New York, NY</option>
        <option value="Miami">Miami, FL</option>
        <option value="LA">Los Angeles, CA</option>   
        <option value="Chicago">Chicago, IL</option>
      </select>

      {/* Dropdown for budgeting period */}
      <label htmlFor="period">Period:</label>
      <input type="period" id="period" value={period} onChange={(e) => setPeriod(Number(e.target.value))}/>       

      <div> {/* Container for income */}
        <label htmlFor="money">Starting Money:</label> $
        <input type="number" id="money" value={money} onChange={(e) => setMoney(Number(e.target.value))}/>
      </div>  
    </div>
  );
}

export default App;