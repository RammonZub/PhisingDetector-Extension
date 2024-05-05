# app.py

import logging
from flask import Flask, request, jsonify
from transformers import BertForSequenceClassification, BertTokenizer
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

model_path = "/Users/ramonzubiagasuarez/Desktop/Development/Marketplace/phishing-alert/bert-finetuned-phishing"
tokenizer = BertTokenizer.from_pretrained(model_path)
model = BertForSequenceClassification.from_pretrained(model_path)

@app.route('/detect-phishing', methods=['POST'])
def detect_phishing():
    try:
        text = request.json['email_content']
        logging.info(f"Received email content for detection: {text[:200]}...")
        logging.info(f"Email content: {text}")
        encoded_input = tokenizer(text, return_tensors='pt', truncation=True, max_length=512)
        with torch.no_grad():
            output = model(**encoded_input)
        probabilities = torch.nn.functional.softmax(output.logits, dim=-1)
        logging.info(f"Phishing Detection Probabilities: {probabilities}")
        is_phishing = probabilities[0][1].item() > 0.5
        logging.info(f"Phishing Detection Result: {'Phishing' if is_phishing else 'Not phishing'}")
        return jsonify({'is_phishing': is_phishing})
    except Exception as e:
        logging.error(f"Error in detect-phishing: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)