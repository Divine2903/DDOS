const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

let trafficLogs = {};

app.use(cors());
app.use(express.json());

app.post('/log', (req, res) => {
    const { ip, bytes_sent, bytes_recv } = req.body;
    if (!trafficLogs[ip]) trafficLogs[ip] = [];
    trafficLogs[ip].push({ bytes_sent, bytes_recv, time: Date.now() });
    res.sendStatus(200);
});

app.get('/report', (req, res) => {
    const report = Object.entries(trafficLogs).map(([ip, logs]) => {
        return {
            ip,
            count: logs.length,
            potential_ddos: logs.length > 20
        }
    });
    res.json(report);
});

app.listen(PORT, () => console.log(`Node backend running on port ${PORT}`));
