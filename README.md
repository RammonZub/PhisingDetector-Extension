# Phishing Detector Extension

Phishing Detector is a Chrome extension that scans emails in Gmail and Outlook for phishing and scam content using a fine-tuned BERT model. The extension communicates with a Flask backend to classify email content and provide immediate alerts if a phishing attempt is detected.

## Features
- Detects phishing emails and provides a visual warning directly within Gmail and Outlook.
- Utilizes a fine-tuned BERT model trained on a dataset containing hundreds of thousands of phishing URLs, emails, and SMS messages.
- Highlights phishing emails with a visual cue for easy identification.

## Architecture
### Backend
- **Technology:** Python, Flask, Torch (PyTorch), Transformers (BERT).
- **Functionality:** Processes email content through a fine-tuned BERT model to classify emails as phishing or non-phishing.
- **Endpoint:** `/detect-phishing` (POST method) receives email content and returns a JSON response with the classification result.

### Chrome Extension
- **Content Script:**
  - **Purpose:** Extracts email content directly from the webmail UI (Gmail or Outlook) and sends it to the backend for phishing detection.
  - **Implementation Details:**
    - Uses a DOM query selector to fetch email content.
    - Sends a POST request to the backend endpoint with the extracted email content and sender information.
    - Receives the phishing classification result and modifies the email UI to visually indicate if the email is phishing or not (red for phishing, green for safe).
    - Adds a click event listener to the email list to ensure that each email gets individually checked upon clicking.

- **Background Script:**
  - **Purpose:** Manages background tasks, such as initializing the content script and coordinating with the active email tab.
  - **Implementation Details:**
    - Automatically injects the content script into Gmail or Outlook when the extension is activated.
    - Listens for tab activation events and injects the content script into the current tab.
    - Logs background script activity for troubleshooting and monitoring purposes.

### Visual Analysis
- **How Visual Alerts Work:**
  - The extension modifies the email background color based on the phishing classification result:
    - **Phishing Detected:** A red background indicates that the email is flagged as phishing.
    - **Safe Email:** A green background means the email is considered non-phishing.

- **Alert Notification:**
  - If a phishing email is detected, a browser alert will appear to warn the user about the suspicious email.

## Getting Started
### Backend Setup
1. **Clone the Project:**
    ```bash
    git clone <repository-url>
    cd phishing-alert
    ```
2. **Install Python Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
3. **Prepare the Fine-Tuned Model:**
    - Download or ensure that the fine-tuned BERT model is available in the specified `model_path`.

4. **Run the Backend Server:**
    ```bash
    python app.py
    ```

### Chrome Extension Setup
1. **Load the Extension:**
   - In Chrome, navigate to `chrome://extensions`.
   - Enable "Developer mode" and click "Load unpacked".
   - Select the extension's root folder containing `manifest.json`.

2. **Access Your Gmail Account:**
   - Open Gmail in a Chrome tab.
   - The extension will automatically analyze emails and provide alerts.

### How Phishing Detection Works
- **BERT Model:** The BERT model classifies emails based on content and returns a phishing probability score.
- **Visual Alerts:** Emails flagged as phishing will have a red background, and non-phishing emails will have a green background.


