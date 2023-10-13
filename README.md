# Sign Language Translation Web Application


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Translating Sign Language](#translating-sign-language)
  - [Training Custom Models](#training-custom-models)
  - [Built-In Translation](#built-in-translation)
  - [Video Chat](#video-chat)
  - [Text Chat](#text-chat)
  - [Voice Detection to Text](#voice-detection-to-text)
  - [Text to Voice](#text-to-voice)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Sign Language Translation Web Application is a powerful Django website that can translate sign language in videos. Users can train custom models for specific words or languages or use built-in models for sign language translation. The application also features video chat, text chat, voice detection to text, and text-to-voice functionality.

## Features

- Translate sign language gestures in videos to text.
- Train custom models for specific words or languages.
- Utilize built-in models for sign language translation.
- Video chat for real-time communication.
- Text chat for instant messaging.
- Voice detection to text for spoken language input.
- Text to voice for audio output.

## Getting Started

### Prerequisites

- Python 3.x installed.
- Django and required packages (install using `pip`).
- Machine learning libraries for custom model training (e.g., TensorFlow, PyTorch).
- Webcam and microphone for video and voice functionalities.
- Project dependencies specified in the `requirements.txt` file.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/sign-language-translation.git
   ```

2. Navigate to the project directory:

   ```bash
   cd sign-language-translation
   ```

3. Install Python dependencies from the `requirements.txt` file:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the Django server:

   ```bash
   python manage.py runserver
   ```

5. Access the web application by opening a web browser and going to `http://localhost:8000`.

## Usage


### Translating Sign Language in Real-Time

- Launch the web application and use your webcam to capture real-time sign language gestures.
- The application will instantly translate the gestures into text, providing you with real-time sign language translation.


### Training Custom Models

- Access the training module to create custom models for specific words or languages.

### Built-In Translation

- Use pre-trained models for sign language translation.

### Video Chat

- Start a video chat with others for real-time communication.

### Text Chat

- Use the built-in text chat for instant messaging.

### Voice Detection to Text

- Record voice input, and the application will convert it to text.

### Text to Voice

- Input text, and the application will generate voice output.

## Contributing

Contributions are welcome! 
