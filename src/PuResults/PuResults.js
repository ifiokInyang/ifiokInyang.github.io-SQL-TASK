import React, { useState } from "react";
import axios from "axios";

const PuResults = () => {
  const [pollingUnit, setPollingUnit] = useState(null);
  const [results, setResults] = useState(null);
  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:4000/polling-unit/results/${id}`
      );
      setPollingUnit(data.pollingUnit);
      console.log(data);
      setResults(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Polling Unit Results</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Polling Unit ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {pollingUnit && (
        <div>
          <h2>Polling Unit Information</h2>
          <p>Ward: {pollingUnit.ward_id}</p>
          <p>LGA: {pollingUnit.lga_id}</p>
          <p>State: {pollingUnit.state_id}</p>
        </div>
      )}
      {results && (
        <div>
          <h2>Announced Results</h2>
          <ul>
            {results.map((result) => (
              <li key={result.party_abbreviation}>
                {result.party_abbreviation}: {result.party_score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PuResults;
