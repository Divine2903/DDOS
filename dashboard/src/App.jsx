import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/report"); // Flask
      // const res = await fetch("http://localhost:3000/report"); // Node.js
      const data = await res.json();
      setLogs(data);
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">DDoS Detection Dashboard</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">IP Address</th>
            <th className="border px-4 py-2">Request Count</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((entry, idx) => (
            <tr key={idx} className={entry.potential_ddos ? 'bg-red-200' : ''}>
              <td className="border px-4 py-2">{entry.ip}</td>
              <td className="border px-4 py-2">{entry.count}</td>
              <td className="border px-4 py-2">
                {entry.potential_ddos ? "⚠️ Potential DDoS" : "Normal"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
