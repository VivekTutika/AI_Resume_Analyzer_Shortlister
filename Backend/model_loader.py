import re
import fitz  # type: ignore # PyMuPDF for PDF extraction
import docx2txt  # type: ignore # python-docx for Word extraction
from sklearn.feature_extraction.text import TfidfVectorizer # type: ignore
from sklearn.metrics.pairwise import cosine_similarity # type: ignore

# Extract candidate name from first line of resume
def extract_candidate_name(text):
    """
    Extract candidate name from the first non-empty line of resume text.
    Returns 'Unknown Candidate' if no valid name found.
    """
    lines = text.strip().split('\n')
    for line in lines:
        line = line.strip()
        # Skip empty lines and common headers
        if line and len(line) > 1 and not any(skip in line.lower() for skip in ['resume', 'cv', 'curriculum vitae', 'name:', 'contact', 'email', 'phone']):
            # Clean up the line - remove special characters but keep spaces
            cleaned = re.sub(r'[^\w\s]', '', line).strip()
            # Check if it looks like a name (2-4 words, no digits)
            words = cleaned.split()
            if 1 <= len(words) <= 4 and not any(char.isdigit() for char in cleaned) and len(cleaned) > 2:
                return cleaned.title()
    return "Unknown Candidate"

# Extract text from a PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text.strip()

# Extract text from a Word document
def extract_text_from_docx(docx_path):
    return docx2txt.process(docx_path).strip()


# Extract relevant sections from resume text
def extract_relevant_sections(resume_text):
    """
    Extracts relevant sections (Technical Skills, Projects, Experience) from the resume text.
    """
    sections = {"Technical Skills": "", "Projects": "", "Experience": ""}
    
    # Define section headers patterns (more flexible to accommodate different formats)
    patterns = {
        "Technical Skills": r"(?i)(technical skills|skills|technologies)[\s\n]*:[\s\n]*(.*?)(?=\n{2,}|$)",
        "Projects": r"(?i)(projects|work samples|portfolio)[\s\n]*:[\s\n]*(.*?)(?=\n{2,}|$)",
        "Experience": r"(?i)(experience|work experience|employment history)[\s\n]*:[\s\n]*(.*?)(?=\n{2,}|$)"
    }
    
    for section, pattern in patterns.items():
        match = re.search(pattern, resume_text, re.DOTALL)
        if match:
            sections[section] = match.group(2).strip().replace('\n', ' ')
    
    # Forming structured resume text with fallbacks
    formatted_resume_text = ""
    if sections["Experience"]:
        formatted_resume_text += f"Experienced professional with {sections['Experience']}. "
    if sections["Technical Skills"]:
        formatted_resume_text += f"Proficient in {sections['Technical Skills']}. "
    if sections["Projects"]:
        formatted_resume_text += f"Worked on projects such as {sections['Projects']}. "
    
    # Fallback if no relevant sections are found
    if not formatted_resume_text.strip():
        formatted_resume_text = resume_text[:500]  # Take the first 500 characters as a fallback
    
    return formatted_resume_text.strip()

# Predict match percentage
def predict_resume(filepath, job_description):
    if filepath.endswith(".pdf"):
        resume_text = extract_text_from_pdf(filepath)
    elif filepath.endswith(".docx") or filepath.endswith(".doc"):
        resume_text = extract_text_from_docx(filepath)
    else:
        return {"match_percentage": 0, "candidate_name": "Unknown Candidate"}  # Invalid format
    
    # Extract candidate name from first line
    candidate_name = extract_candidate_name(resume_text)
    
    # Process extracted resume text
    formatted_resume_text = extract_relevant_sections(resume_text)
    
    if not formatted_resume_text.strip():
        return {"match_percentage": 0, "candidate_name": candidate_name}  # Ensure text is not empty
    
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([formatted_resume_text, job_description])
    similarity = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])[0][0]
    
    return {
        "match_percentage": round(similarity * 100, 2),
        "candidate_name": candidate_name
    }

print("Backend Started...")
