// src/App.js

import React, { useState } from "react";
import { convertSqlDebugToPostgres } from "./utils/sqlConverter";
import "./App.css";

function App() {
  const [debugSql, setDebugSql] = useState("");
  const [params, setParams] = useState("");
  const [convertedSql, setConvertedSql] = useState("");

  const handleConvert = () => {
    try {
      const parsedParams = JSON.parse(params);
      const result = convertSqlDebugToPostgres(debugSql, parsedParams);
      setConvertedSql(result);
    } catch (error) {
      alert("Error parsing parameters: " + error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SQL Debug to PostgreSQL Converter</h1>
      </header>
      <div className="converter">
        <textarea
          placeholder="Enter SQL Debug Statement Here"
          value={debugSql}
          onChange={(e) => setDebugSql(e.target.value)}
        />
        <textarea
          placeholder="Enter parameters as Array or Object here"
          value={params}
          onChange={(e) => setParams(e.target.value)}
        />
        <button onClick={handleConvert}>Convert</button>
        <h1>Result of Conversion</h1>
        <textarea
          placeholder="Converted PostgreSQL Statement"
          value={convertedSql}
          readOnly
        />
      </div>
    </div>
  );
}

export default App;
