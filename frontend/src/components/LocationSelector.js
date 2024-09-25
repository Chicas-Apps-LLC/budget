import React from 'react';

const LocationSelector = ({ location, setLocation, locations }) => {
  return (
    <div>
      <label htmlFor='location' className='travel-label'>Where are you traveling to?</label>
      <select id='location' value={location} onChange={(e) => setLocation(e.target.value)}>
        {locations.map((loc) => (
          <option key={loc.value} value={loc.value}>
            {loc.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;