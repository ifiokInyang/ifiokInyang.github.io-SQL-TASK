import React, { useState } from "react";
import axios from "axios";

const InsertNewResults = () => {
  const [party, setParty] = useState("");
  const [score, setScore] = useState("");
  const [name, setName] = useState("");
  const [unit, setPunit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        party: party,
        score: score,
        entered_by: name,
      };
      const response = await axios.post(
        `http://localhost:4000/polling-unit/insert-results`,
        formData
      );
      if (response.status === 201) {
        alert(response.data.message);
      }
      setName("");
      setParty("");
      setScore("");
      setPunit("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1>Insert New Polling Unit Results</h1>
        All fields marked <span style={{ color: "red" }}>*</span> are required
      </div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label htmlFor="polling-unit">
            Enter Polling Unit<span style={{ color: "red" }}>*</span>
          </label>
          <input
            value={unit}
            placeholder="polling unit"
            style={{
              width: "400px",
              padding: "10px",
              borderRadius: "12px",
              margin: "10px 0px",
            }}
            onChange={(e) => setPunit(e.target.value)}

          />

          <label htmlFor="party">
            Enter Party<span style={{ color: "red" }}>*</span>
          </label>
          <input
            style={{
              width: "400px",
              padding: "10px",
              borderRadius: "12px",
              margin: "10px 0px",
            }}
            placeholder="party abbreviation e.g PDP, APC"
            value={party}
            onChange={(e) => setParty(e.target.value)}
          />
          <label htmlFor="score">
            Enter Score<span style={{ color: "red" }}>*</span>
          </label>
          <input
            style={{
              width: "400px",
              padding: "10px",
              borderRadius: "12px",
              margin: "10px 0px",
            }}
            placeholder="enter score..."
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
          <label htmlFor="collation-officer">
            Collation Officer<span style={{ color: "red" }}>*</span>
          </label>
          <input
            style={{
              width: "400px",
              padding: "10px",
              borderRadius: "12px",
              margin: "10px 0px",
            }}
            placeholder="enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            style={{
              marginTop: "10px",
              cursor: "pointer",
              padding: "11px",
              width: "420px",
              borderRadius: "10px",
            }}
            onSubmit
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertNewResults;
