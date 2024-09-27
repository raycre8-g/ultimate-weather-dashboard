import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; // Using react-icons for search icon

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form className="relative flex justify-center w-[90%] md:w-full max-w-2xl mb-8" onSubmit={handleSearch}>
      <input
        type="text"
        className="w-full p-4 pr-12 rounded-full text-black outline-none"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-1 top-1/2 p-3 transform -translate-y-1/2 bg-neon-blue text-white rounded-full hover:text-gray-700"
      >
        <FiSearch size={24} />
      </button>
    </form>
  );
};

export default SearchBar;
