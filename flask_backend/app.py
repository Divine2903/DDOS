from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)
traffic_logs = {}

@app.route('/log', methods=['POST'])
def log_traffic():
    data = request.json
    ip = data.get('ip')
    if ip not in traffic_logs:
        traffic_logs[ip] = []
    traffic_logs[ip].append({
        "bytes_sent": data.get("bytes_sent"),
        "bytes_recv": data.get("bytes_recv"),
        "time": time.time()
    })
    return "OK", 200

@app.route('/report', methods=['GET'])
def report():
    report = []
    for ip, logs in traffic_logs.items():
        report.append({
            "ip": ip,
            "count": len(logs),
            "potential_ddos": len(logs) > 20
        })
    return jsonify(report)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
