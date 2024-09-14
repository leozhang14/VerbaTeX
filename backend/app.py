from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from jose import jwt
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv('MONGO_URI'))
db = client['user_database']
users_collection = db['users']

AUTH0_DOMAIN = os.getenv('AUTH0_DOMAIN')
API_IDENTIFIER = os.getenv('API_IDENTIFIER')
ALGORITHMS = ["RS256"]

# Verify JWT from Auth0
def verify_jwt(token):
    jwks_url = f'https://{AUTH0_DOMAIN}/.well-known/jwks.json'
    jwks = requests.get(jwks_url).json()
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}
    for key in jwks['keys']:
        if key['kid'] == unverified_header['kid']:
            rsa_key = {
                'kty': key['kty'],
                'kid': key['kid'],
                'use': key['use'],
                'n': key['n'],
                'e': key['e']
            }
    if rsa_key:
        payload = jwt.decode(token, rsa_key, algorithms=ALGORITHMS, audience=API_IDENTIFIER, issuer=f'https://{AUTH0_DOMAIN}/')
        return payload
    else:
        raise Exception('Unable to find RSA key')

@app.route('/store-user-info', methods=['POST'])
def store_user_info():
    token = request.headers.get('Authorization').split(' ')[1]
    user_data = verify_jwt(token)  # Validate the token
    user_id = user_data['sub']  # Auth0 user ID

    # Get additional user data from the request body
    body = request.get_json()
    favorite_color = body.get('favoriteColor')
    bio = body.get('bio')

    # Upsert user info into MongoDB
    users_collection.update_one(
        {'user_id': user_id},
        {'$set': {'favoriteColor': favorite_color, 'bio': bio}},
        upsert=True
    )

    return jsonify({'message': 'User info saved successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3001)