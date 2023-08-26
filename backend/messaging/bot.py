from twilio.rest import Client
from env import API_KEY
import requests

account_sid = 'AC33ff820d3d035cfd698e73eb155e9044'
auth_token = API_KEY
client = Client(account_sid, auth_token)

#pull data from third party rest api
response = requests.get('http://127.0.0.1:8000/api/tickets')

#convert response data into json
users = response.json()
print(users[0])
    
#message = client.messages \
                #.create(
                     #body="Join Earth's mightiest heroes. Like Kevin Bacon.",
                     #from_='+15189812165',
                     #to='+61472909030'
                 #)

#print(message.sid)
#test