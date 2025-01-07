import requests
#import pdb

# Define the API base URL
BASE_URL = "http://localhost:3000/api"

# Start the debugger
#pdb.set_trace()

# Test the GET /players endpoint
try:
    response = requests.get(f"{BASE_URL}/players")
    response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
    print("Response Status Code:", response.status_code)
    print("Response Data:", response.json())
except requests.exceptions.RequestException as e:
    print("An error occurred:", e)