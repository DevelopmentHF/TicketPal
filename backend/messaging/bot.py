from twilio.rest import Client

account_sid = 'AC33ff820d3d035cfd698e73eb155e9044'
auth_token = '0cb4ec3c29e2a1e4993d1f063eea2f0a'
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                     body="Join Earth's mightiest heroes. Like Kevin Bacon.",
                     from_='+15189812165',
                     to='+61472909030'
                 )

print(message.sid)