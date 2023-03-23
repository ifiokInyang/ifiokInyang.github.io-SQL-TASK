import React, { useState, useEffect } from "react";
import axios from "axios";

const ResultsByLgas = () => {
  const [lgas, setLgas] = useState([]);
  const [selectedLga, setSelectedLga] = useState("");
  const [totalResult, setTotalResult] = useState(null);
  const [chosenLga, setChosenLga] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // setIsClicked(false)
    // get lgas from the database
    axios.get("http://localhost:4000/polling-unit/lgas").then((response) => {
      setLgas(response.data);
    });
  }, []);

  const handleSelectLga = (event) => {
    setIsClicked();
    const selectedLgaId = event.target.value;
    setSelectedLga(selectedLgaId);

    // find the lga object that matches the selectedLgaId
    const selectedLga = lgas.find(
      (lga) => lga.lga_id === parseInt(selectedLgaId)
    );

    setChosenLga(selectedLga.lga_name);
  };

  const handleSumTotal = () => {
    console.log("selected lga is ", selectedLga);
    axios
      .get(`http://localhost:4000/polling-unit/total/${selectedLga}`)
      .then((response) => {
        console.log(response.data);
        setTotalResult(response.data.totalResult);
        if (response.data.totalResult === null) {
          setIsClicked(true);
        }
      });
  };

  return (
    <div>
      <h1>Summed Total Result for Polling Units in LGA</h1>
      <div>
        <label>Select LGA:</label>
        <select value={selectedLga} onChange={handleSelectLga}>
          <option value="">--Select LGA--</option>
          {lgas.map((lga) => (
            <option key={lga.lga_id} value={lga.lga_id}>
              {lga.lga_name}
            </option>
          ))}
        </select>
      </div>
      <button
        disabled={!selectedLga}
        onClick={handleSumTotal}
        style={{
          marginTop: "30px",
          cursor: "pointer",
          padding: "11px",
          width: "185px",
          borderRadius: "10px",
        }}
      >
        Get Total Result
      </button>
      {totalResult !== null && (
        <p>
          The summed total result for {chosenLga} is {totalResult}
        </p>
      )}
      {isClicked && <p>No result for {chosenLga}</p>}
    </div>
  );
};

export default ResultsByLgas;
