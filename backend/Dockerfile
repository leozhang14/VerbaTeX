# Use an official Python runtime as a parent image 
FROM python:3.11.4

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/* \
    wget \
    apt-transport-https \
    gnupg \
    ca-certificates

RUN apt-get update && apt-get install -y \
    texlive-latex-base \
    texlive-fonts-recommended \
    texlive-pictures \
    texlive-science \
    python3-pip \
    build-essential

RUN apt-get update && apt-get install -y \
    texlive-latex-extra \
    poppler-utils \
    texlive-extra-utils

ENV DEBIAN_FRONTEND=noninteractive

# Set the working directory in the container
WORKDIR /backend

# Copy the requirements file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Run the application
CMD ["python", "main.py"]
