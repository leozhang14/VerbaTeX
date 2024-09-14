import os
import json
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import openai

app = Flask(__name__)


REGION_NAME = 'us-west-2'
BUCKET_NAME = 'my-sample-bucket'
FILE_NAME   = 'file1.json'


@app.route("/")
def index():
    return { 'status' : 'ok' }, 200

@app.route('/gpt-query', methods=['GET'])
def gpt_query():
    # Get the query from the URL parameters
    query = "For all x in the natural numbers, x is greater than zero by the standard domain of natural numbers."
    # Load environment variables from the .env file
    load_dotenv()

    # Access the OPENAI_KEY environment variable
    openai_key = os.getenv("OPENAI_KEY")

    if not query:
        return jsonify({'error': 'Query parameter is missing'}), 400
    
    try:
        client = openai.OpenAI(api_key=openai_key)
        completion = client.chat.completions.create(
            model="ft:gpt-4o-2024-08-06:personal:verbatex:A7UdpZsE",
            messages=[
                {"role": "system", "content": "You are a helpful LaTeX translator."},
                {"role": "user", "content": query}
            ]
        )

        response = completion.choices[0].message.content
        # Return the message
        return jsonify({'response': response})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/transcribe", methods=['POST'])
def upload():
    # Check that the post body is valid JSON
    if not request.is_json:
        return { 'error': 'Invalid JSON' }, 400

    # Parse the JSON into a Python dictionary
    data = request.get_json()

    AWS_ACCESS_KEY=os.environ['AWS_ACCESS_KEY']
    AWS_SECRET_KEY=os.environ['AWS_SECRET_KEY']

    # Write the JSON to S3
    s3 = boto3.client('s3', region_name=REGION_NAME, aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY)

    with open(FILE_NAME, 'w') as f:
        json.dump(data, f)

    s3.upload_file(FILE_NAME, BUCKET_NAME, FILE_NAME)

    return { 'status': 'ok' }, 200


@app.route("/download", methods=['GET'])
def download():
    AWS_ACCESS_KEY=os.environ['AWS_ACCESS_KEY']
    AWS_SECRET_KEY=os.environ['AWS_SECRET_KEY']

    # Write the JSON to S3
    s3 = boto3.client('s3', region_name=REGION_NAME, aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY)

    try:
        file_object = s3.get_object(Bucket=BUCKET_NAME, Key=FILE_NAME)
        # Read the Body stream of the S3 object and load the JSON
        file_content = json.load(file_object['Body'])

        return file_content, 200
    except ClientError as e:
        error_code = int(e.response['Error']['Code'])
        if error_code == 404:
            return { 'error': 'File not found in S3 bucket' }, 404
        else:
            return { 'error': 'Unknown error' }, 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3001)

