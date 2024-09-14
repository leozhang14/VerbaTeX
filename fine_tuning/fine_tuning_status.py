from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Access the OPENAI_KEY environment variable
openai_key = os.getenv("OPENAI_KEY")

client = OpenAI(api_key=openai_key)

# List 10 fine-tuning jobs
jobs = client.fine_tuning.jobs.list(limit=10)

# Retrieve the state of a fine-tune
state = client.fine_tuning.jobs.retrieve("ftjob-6P89DGXIahlPQKIrZ63BcnVj")

# List up to 10 events from a fine-tuning job
events = client.fine_tuning.jobs.list_events(fine_tuning_job_id="ftjob-6P89DGXIahlPQKIrZ63BcnVj", limit=10)

print(jobs)
print(state)
print(events)
