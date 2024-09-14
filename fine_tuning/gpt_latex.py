from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Access the OPENAI_KEY environment variable
openai_key = os.getenv("OPENAI_KEY")

client = OpenAI(api_key=openai_key)

client.files.create(
  file=open("fine_tuning/latex_translations.jsonl", "rb"),
  purpose="fine-tune"
)
