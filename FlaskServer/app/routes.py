from flask import Blueprint, request, jsonify
import logging
import os
from pdfminer.high_level import extract_text
from flask_cors import CORS
import spacy
import re
import pandas as pd
import nltk

main = Blueprint('main', __name__)
CORS(main, resources={r"/*": {"origins": "http://localhost:3000"}})


nlp = spacy.load("en_core_web_sm")

nltk.download('stopwords')
nltk.download('punkt')  # Ensure 'punkt' tokenizer is downloaded
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')

RESERVED_WORDS = [
    'school',
    'college',
    'univers',
    'university',
    'academy',
    'faculty',
    'institute',
    'faculdades',
    'Schola',
    'schule',
    'lise',
    'lyceum',
    'lycee',
    'polytechnic',
    'kolej',
    'ünivers',
    'okul',
    'preparatory',
]

skills_df = pd.read_csv('/usr/src/uploads/skills.csv', header=None)
# Filter the DataFrame to only include rows where Label is 1

# Extract skills into a list
skills_list = [str(skill).strip() for skill in skills_df.iloc[0, 1:] if isinstance(skill, str)]




def extract_name(text):
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return None

def extract_email(text):
    email_pattern = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
    matches = email_pattern.findall(text)
    return matches[0] if matches else None

def extract_professional_experience(text):
    # This is a simple heuristic and should be adjusted based on the actual CV structure
    experience_keywords = ["experience", "employment", "work history", "professional history", "professional experience"]
    experience_text = []
    lines = text.split('\n')
    for i, line in enumerate(lines):
        if any(keyword in line.lower() for keyword in experience_keywords):
            experience_text.extend(lines[i:i+10])  # Extract 10 lines after the keyword
            break
    return '\n'.join(experience_text)

# def extract_skills(text, skills_list):
#     # Convert skills list to lowercase for case-insensitive matching
#     skills_set = set(skill.lower() for skill in skills_list)
    
#     matched_skills = set()
#     lines = text.split('\n')
#     for line in lines:
#         for skill in skills_set:
#             # Use a regular expression to match whole words only
#             if re.search(r'\b' + re.escape(skill) + r'\b', line.lower()):
#                 matched_skills.add(skill)

#     return list(matched_skills)

def extract_skills(input_text):
    stop_words = set(nltk.corpus.stopwords.words('english'))
    word_tokens = nltk.tokenize.word_tokenize(input_text)
 
    # remove the stop words
    filtered_tokens = [w for w in word_tokens if w not in stop_words]
 
    # remove the punctuation
    filtered_tokens = [w for w in word_tokens if w.isalpha()]
 
    # generate bigrams and trigrams (such as artificial intelligence)
    bigrams_trigrams = list(map(' '.join, nltk.everygrams(filtered_tokens, 2, 3)))
 
    # we create a set to keep the results in.
    found_skills = set()
 
    # we search for each token in our skills database
    for token in filtered_tokens:
        if token.lower() in skills_list:
            found_skills.add(token)
 
    # we search for each bigram and trigram in our skills database
    for ngram in bigrams_trigrams:
        if ngram.lower() in skills_list:
            found_skills.add(ngram)
 
    return found_skills

def extract_education(input_text):
    organizations = []
 
    # first get all the organization names using nltk
    for sent in nltk.sent_tokenize(input_text):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            if hasattr(chunk, 'label') and chunk.label() == 'ORGANIZATION':
                organizations.append(' '.join(c[0] for c in chunk.leaves()))
 
    # we search for each bigram and trigram for reserved words
    # (college, university etc...)
    education = set()
    for org in organizations:
        for word in RESERVED_WORDS:
            if org.lower().find(word) >= 0:
                education.add(org)
 
    return education

def extract_phone_number(text):
    phone_pattern = re.compile(r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]')
    matches = phone_pattern.findall(text)
    return matches[0] if matches else None

@main.route('/')
def index():
    return "Hello, World!"



@main.route('/process_cv', methods=['POST'])
def process_cv():
    try:
        cv_metadata = request.json
        logging.info(f"cv_metadata {cv_metadata}")
        file_path = cv_metadata['filePath']
        logging.info(f"file path {file_path}")
        # Construct the full path to the PDF file
        normalized_path = os.path.normpath(file_path).replace('\\', '/')
        pdf_path = os.path.join('/usr/src', normalized_path)
        logging.info(f"pdf_path {pdf_path}")

        if not os.path.exists(pdf_path):
            return jsonify({'error': 'File not found'}), 404
   
        logging.info(f"Extracted text from skills_list: {skills_list}")
        # Extract text from the PDF
        text = extract_text(pdf_path)
        
        logging.info(f"Extracted text from {pdf_path}: {text}")

        # Here, you could process the text further, save it to a database, etc.
        # For simplicity, we'll just return it in the response

        # Extract fields using NLP techniques
        name = extract_name(text)
        email = extract_email(text)
        professional_experience = extract_professional_experience(text)
        # skills = extract_skills(text,skills_list)
        skills = extract_skills(text)
        phone_number = extract_phone_number(text)
        education = list(extract_education(text))
        
        logging.info(f"Name: {name}")
        logging.info(f"Email: {email}")
        logging.info(f"Professional Experience: {professional_experience}")
        logging.info(f"Skills: {skills}")
        logging.info(f"Phone number: {phone_number}")
        logging.info(f"Education: {education}")

        return jsonify({'message': 'CV processed successfully', 'text': text, 'skills': skills, 'phone':phone_number})
    except Exception as e:
        logging.error(f"Error processing CV: {str(e)}")
        return jsonify({'error': str(e)}), 500


