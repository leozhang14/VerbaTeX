import os
import json
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_file
import openai
import logging
import subprocess

app = Flask(__name__)

# Ensure the output folder exists
output_folder = '/backend/output'
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

REGION_NAME = 'us-west-2'
BUCKET_NAME = 'my-sample-bucket'
FILE_NAME   = 'file1.json'

@app.route("/")
def index():
    return { 'status' : 'ok' }, 200

@app.route('/gpt-query', methods=['GET'])
def gpt_query():
    # Get the query from the URL parameters
    query = "Draw a three dimensional surface plot of z equals x squared plus abs of four natural log of abs y."
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
        logger.info(response)
        tex_to_png(response)
        return jsonify({'response': response})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/tex_png', methods=[])
def tex_to_png(latex_string : str):
    if not latex_string:
        return jsonify({"error": "No LaTeX string provided"}), 400
    
    # Define the file paths within the output folder
    tex_file_path = os.path.join(output_folder, 'output.tex')
    pdf_file_path = os.path.join(output_folder, 'output.pdf')
    cropped_pdf_file_path = os.path.join(output_folder, 'output-cropped.pdf')
    png_file_path = os.path.join(output_folder, 'output_image.png')
    
    # Create the LaTeX file content with the received string
    latex_template = """
    \\documentclass{article}
    \\usepackage{pgfplots}
    \\usepackage{amsmath}
    \\usepackage{array}
    \\pagestyle{empty}
    \\pgfplotsset{compat=newest}
    \\begin{document}\n""" + latex_string + "\n" + "\\end{document}"

    logger.info(latex_template)
    # Write the LaTeX content to a file named 'output.tex'
    with open('output/output.tex', 'w') as tex_file:
        tex_file.write(latex_template)
    
    # Verify if output.tex was created
    if not os.path.exists('output/output.tex'):
        logger.info("BIG ERROR")
    
    logger.info("here")

    # Compile the LaTeX file into a PDF using pdflatex
    subprocess.run(['pdflatex', '-output-directory', output_folder, tex_file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    logger.info("done latex")
    # Crop the generated PDF to the size of the content using pdfcrop
    subprocess.run(['pdfcrop', '--margins', '10', pdf_file_path, cropped_pdf_file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    logger.info("done crop")
    # Convert the cropped PDF to a PNG image using pdftoppm (Poppler utility)
    subprocess.run(['pdftoppm', '-r', '150', cropped_pdf_file_path, '-png', '-singlefile', png_file_path[:-4]], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    logger.info("done png")
    # Clean up intermediate files
    try:
        os.remove(tex_file_path)
        os.remove(pdf_file_path)
        os.remove(cropped_pdf_file_path)
        os.remove(os.path.join(output_folder, 'output.log'))
        os.remove(os.path.join(output_folder, 'output.aux'))
    except FileNotFoundError as e:
        print(f"File not found: {e}")
    
    return jsonify({"message": f"PNG image saved at {png_file_path}"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3001)

