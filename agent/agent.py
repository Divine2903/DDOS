import psutil
import time
import socket
import requests

SERVER_URL = "http://localhost:5000/log"  # Flask backend
# SERVER_URL = "http://localhost:3000/log"  # Node.js backend (uncomment to use)

def get_ip():
    try:
        hostname = socket.gethostname()
        return socket.gethostbyname(hostname)
    except:
        return "0.0.0.0"

def get_net_stats():
    net_io = psutil.net_io_counters()
    return {
        "ip": get_ip(),
        "bytes_sent": net_io.bytes_sent,
        "bytes_recv": net_io.bytes_recv
    }

while True:
    stats = get_net_stats()
    try:
        response = requests.post(SERVER_URL, json=stats)
        print(f"Sent: {stats} | Status: {response.status_code}")
    except Exception as e:
        print("Failed to send data:", e)
    time.sleep(3)
