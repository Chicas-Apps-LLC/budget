import React from 'react';

const SuggestedExpenses = ({ suggestedExpenses, location }) => {
  return (
    <h3>
      {suggestedExpenses.length > 0 && (
        <>
          Based on your selection of {location}, we suggest adding these expenses: {suggestedExpenses.join(', ')}.
        </>
      )}
    </h3>
  );
};

export default SuggestedExpenses;
