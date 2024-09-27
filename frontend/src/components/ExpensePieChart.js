import React, { useEffect} from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const expenseCategories = {
    transportation: {
      name: "Main Transport",
      description: "Expenses related to getting to your travel destination (e.g., flights, trains)."
    },
    accommodation: {
      name: "Stay",
      description: "Costs associated with lodging during your trip (e.g., hotels, hostels)."
    },
    localTransportation: {
      name: "Local Transport",
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

const ExpensePieChart = ({ expenses }) => {
    const [isVisible, setIsVisible] = useState(false);
    const categories = expenses.map(expense => expenseCategories[expense.category]?.name || expense.category);
    const amounts = expenses.map(expense => expense.amount);
    
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setIsVisible(true);
          }
        });
    
        const target = document.querySelector('.pie-chart-container');
        
        if (target) {
          observer.observe(target);
        }

    return () => {
        if (target) {
          observer.unobserve(target);
        }
      };
    }, []); 
    const data = {
        labels: categories,
        datasets: [
        {
            label: 'Expenses',
            data: amounts,
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            ],
        },
        ],
    };

    const options = {
        plugins: {
            legend: {
              labels: {
                color: 'rgba(0, 0, 0, 0.8)',
                font: {
                  size: 16,
                  weight: 'bold',
                },
              },
            },
          },
        };
    return (
        <div className={`pie-chart-container fade-in ${isVisible ? 'show' : ''}`}>
        <Pie data={data} options={options}/>
        </div>
    );
};

export default ExpensePieChart;
