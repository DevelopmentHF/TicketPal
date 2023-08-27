from twilio.rest import Client
import config
import requests
from datetime import datetime
import time
import pytz

account_sid = 'AC33ff820d3d035cfd698e73eb155e9044'
auth_token = config.api_key
client = Client(account_sid, auth_token)

# pull data from third party rest api (tickets)
ticket_data = requests.get('http://127.0.0.1:8000/api/tickets/')
# convert response data into json
tickets = ticket_data.json()

# pull data from third party rest api (users)
user_data = requests.get('http://127.0.0.1:8000/api/users/')
# convert response data into json
users = user_data.json()



while True:
    melbourne_timezone = pytz.timezone('Australia/Melbourne')
    current_time = datetime.now(melbourne_timezone)
    print(current_time)
    
    for ticket in tickets:

        ticket_time = datetime.strptime(ticket["date"], "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=pytz.UTC)

        if current_time.year == ticket_time.year and \
       current_time.month == ticket_time.month and \
       current_time.day == ticket_time.day and \
       current_time.hour == ticket_time.hour and \
       current_time.minute == ticket_time.minute and \
       current_time.second == ticket_time.second:

            for user in users:
                if user.get("id") == ticket["vendor"]:

                    message = client.messages \
                        .create(
                        body="Congragulations " + user.get("username") + "! Your item was sold for $" + str(ticket["curMaxBid"]),
                        from_='+15189812165',
                        to= '+61472909030'
                    )

                    print("message sent to seller!")

    time.sleep(1)  # Wait for 1 second before checking again