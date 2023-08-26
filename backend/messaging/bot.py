from twilio.rest import Client
# from env import API_KEY
# import requests
import time

account_sid = 'AC33ff820d3d035cfd698e73eb155e9044'
auth_token = '8a7ddc84d612795966291afb36bd8adb'
client = Client(account_sid, auth_token)

#pull data from third party rest api
    #  response = requests.get('http://127.0.0.1:8000/api/tickets')

#convert response data into json
    #users = response.json()
    #print(users[0])


data = [
    {"ticket_name": "taylor wift", "end_time": "01:47","highest_bidder": "James Micheal","highest_bid": "$150","bidder_phone_number": "+61472909030", "seller_name": "philly cheese"}
]

while True:
    current_time = time.strftime("%H:%M")
    print(current_time)
    
    for idx, item in enumerate(data):
        if item["end_time"] == current_time:

            #send buyer message
            message = client.messages \
                .create(
                     body="Congratulations " + item["highest_bidder"] + "! You've won the auction for '" + item["ticket_name"] + "'. Your winning bid was " + item["highest_bid"] + ".",
                     from_='+15189812165',
                     to= '+61472909030'
                 )
            print("message sent to buyer!")

            #send seller message
            message = client.messages \
                .create(
                     body="Congratulations " + item["seller_name"] + "! Your auction for '" + item["ticket_name"] + "' sold for " + item["highest_bid"] + ".",
                     from_='+15189812165',
                     to= '+61472909030'
                 )
            print("message sent to seller!")

            del data[idx]
            break
    
    time.sleep(1)  # Wait for 1 minute before checking again