import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import LocationSelector from './components/LocationSelector';
import ExpensesTable from './components/ExpensesTable';
import { calculateTotalExpenses } from './utils/helpers';

function App() {
  const [location, setLocation] = useState('');
  const [period, setPeriod] = useState(0);
  const [money, setMoney] = useState(0);
  const [expenses, setExpenses] = useState([{ category: '', description: '', amount: 0, local: 0 }]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      location, 
      period,
      money,
      expenses,
    };

    try {
      // Send POST request to the Django backend
      const response = await axios.post('http://localhost:8000/api/travel-budget/', formData);
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleExpenseChange = (index, field, value) => {
    const newExpenses = [...expenses];
    newExpenses[index][field] = value;
    setExpenses(newExpenses);
  };

  const addExpenseRow = () => {
    setExpenses([...expenses, { name: '', description: '', amount: 0}]);
  };

  const deleteExpenseRow = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  const totalExpenses = calculateTotalExpenses(expenses);

  const locations = [
    { value: "Amsterdam", label: "Amsterdam, Netherlands" },
    { value: "Athens", label: "Athens, Greece" },
    { value: "Bali", label: "Bali, Indonesia" },
    { value: "Bangkok", label: "Bangkok, Thailand" },
    { value: "Barcelona", label: "Barcelona, Spain" },
    { value: "Beijing", label: "Beijing, China" },
    { value: "Berlin", label: "Berlin, Germany" },
    { value: "Buenos Aires", label: "Buenos Aires, Argentina" },
    { value: "Cape Town", label: "Cape Town, South Africa" },
    { value: "Cairo", label: "Cairo, Egypt" },
    { value: "Cancun", label: "Cancun, Mexico" },
    { value: "Chicago", label: "Chicago, IL" },
    { value: "Copenhagen", label: "Copenhagen, Denmark" },
    { value: "Delhi", label: "Delhi, India" },
    { value: "Dubai", label: "Dubai, UAE" },
    { value: "Dublin", label: "Dublin, Ireland" },
    { value: "Edinburgh", label: "Edinburgh, Scotland" },
    { value: "Florence", label: "Florence, Italy" },
    { value: "Helsinki", label: "Helsinki, Finland" },
    { value: "Hong Kong", label: "Hong Kong, China" },
    { value: "Istanbul", label: "Istanbul, Turkey" },
    { value: "Jakarta", label: "Jakarta, Indonesia" },
    { value: "Jerusalem", label: "Jerusalem, Israel" },
    { value: "Johannesburg", label: "Johannesburg, South Africa" },
    { value: "Kuala Lumpur", label: "Kuala Lumpur, Malaysia" },
    { value: "Los Angeles", label: "Los Angeles, CA" },
    { value: "Lima", label: "Lima, Peru" },
    { value: "Lisbon", label: "Lisbon, Portugal" },
    { value: "London", label: "London, UK" },
    { value: "Madrid", label: "Madrid, Spain" },
    { value: "Melbourne", label: "Melbourne, Australia" },
    { value: "Mexico City", label: "Mexico City, Mexico" },
    { value: "Miami", label: "Miami, FL" },
    { value: "Moscow", label: "Moscow, Russia" },
    { value: "Munich", label: "Munich, Germany" },
    { value: "Nairobi", label: "Nairobi, Kenya" },
    { value: "Oslo", label: "Oslo, Norway" },
    { value: "New York", label: "New York, NY" },
    { value: "Paris", label: "Paris, France" },
    { value: "Prague", label: "Prague, Czech Republic" },
    { value: "Rio de Janeiro", label: "Rio de Janeiro, Brazil" },
    { value: "Rome", label: "Rome, Italy" },
    { value: "San Francisco", label: "San Francisco, CA" },
    { value: "Seoul", label: "Seoul, South Korea" },
    { value: "Singapore", label: "Singapore" },
    { value: "Sydney", label: "Sydney, Australia" },
    { value: "Tokyo", label: "Tokyo, Japan" },
    { value: "Toronto", label: "Toronto, Canada" },
    { value: "Vienna", label: "Vienna, Austria" },
    { value: "Zurich", label: "Zurich, Switzerland" }
  ];
  
  const expenseCategories = {
    transportation: {
      name: "Transportation (to destination)",
      description: "Expenses related to getting to your travel destination (e.g., flights, trains)."
    },
    accommodation: {
      name: "Stay",
      description: "Costs associated with lodging during your trip (e.g., hotels, hostels)."
    },
    localTransportation: {
      name: "Transportation (at location)",
      description: "Expenses for getting around at your travel destination (e.g., taxis, public transport)."
    },
    food: {
      name: "Food",
      description: "Costs for meals and snacks during your trip."
    },
    entertainment: {
      name: "Entertainment",
      description: "Expenses for activities and attractions (e.g., tours, events)."
    },
    shopping: {
      name: "Shopping",
      description: "Costs for souvenirs and personal items."
    },
    travelInsurance: {
      name: "Travel Insurance",
      description: "Expenses for insuring your trip against unforeseen events."
    },
    miscellaneous: {
      name: "Miscellaneous",
      description: "Other unexpected expenses during your trip."
    },
    tips: {
      name: "Tips",
      description: "Gratuities for service providers (e.g., hotel staff, guides)."
    },
    activities: {
      name: "Activities",
      description: "Costs for recreational activities (e.g., scuba diving, hiking)."
    },
  };

  const suggestedExpenses = {
    "New York": ["Transportation (to destination)", "Accomodation", "Transportation (at location)"],
    "Miami": ["Transportation (to destination)", "Beach Activities", "Transportation (at location)", "Accommodation"],
    "Los Angeles": ["Transportation (to destination)", "Transportation (at location)", "Hollywood Tour", "Accommodation"],
    "Chicago": ["Transportation (to destination)", "Transportation (to destination)", "Deep Dish Pizza", "Accommodation"],
    "London": ["Transportation (to destination)","Transportation (at location)", "Sightseeing", "Accommodation"],
    "Paris": ["Transportation (to destination)", "Transportation (at location)", "Museum Visits", "Accommodation"],
    "Tokyo": ["Transportation (to destination)", "Transportation (at location)", "Cultural Experiences", "Accommodation"],
  };

  const getSuggestedExpenses = (location) => {
    return suggestedExpenses[location] || [];
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chicas Apps</h1>
      </header>

      <h2>Travel Budget</h2>

      <div className='location'>
        <LocationSelector location={location} setLocation={setLocation} locations={locations} />
      </div>
      
      <div className='days-var'>
        <label htmlFor="period">Days spending there:</label> 
        <input type="number" id="period" value={period} onChange={(e) => setPeriod(Number(e.target.value))}/>       
      </div>

      <div className='money-var'>
        <label htmlFor="money">Starting Money:</label> $
        <input type="number" id="money" value={money} onChange={(e) => setMoney(Number(e.target.value))}/>
      </div> 

      <div className='suggested-expenses'>
        {location && getSuggestedExpenses(location).length > 0 ? (
          <>
            <h3>
              Based on your selection of {location}, we suggest adding these expenses:
            </h3>
            <p>
              {getSuggestedExpenses(location).join(", ")}
            </p>
          </>
        ) : (
          <h3></h3> // This will render an empty heading if no suggestions are available
        )}
      </div>

      <div className="expenses"> 
        <h3>Expenses</h3>
        <ExpensesTable expenses={expenses} category={expenseCategories} handleExpenseChange={handleExpenseChange} deleteExpenseRow={deleteExpenseRow} />

        <button onClick={addExpenseRow} className="add-button">Add Expense</button> {/* Add class to Add button */}

        <h4 className="total">Total Expenses: ${totalExpenses.toFixed(2)}</h4> {/* Add class to total */}
      </div>

    </div>
  );
}

export default App;