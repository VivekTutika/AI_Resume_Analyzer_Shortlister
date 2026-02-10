from flask import Flask, request, jsonify, send_from_directory # type: ignore
from flask_cors import CORS # type: ignore
import os
from werkzeug.utils import secure_filename # type: ignore
from model_loader import predict_resume

app = Flask(__name__)
CORS(app) 

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
ALLOWED_EXTENSIONS = {"pdf", "docx"}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload", methods=["POST"])
def upload_resume():
    if "files" not in request.files:
        return jsonify({"error": "No files uploaded"}), 400
    
    files = request.files.getlist("files")
    if not files or all(file.filename == "" for file in files):
        return jsonify({"error": "No files selected"}), 400
    
    # Get form data
    job_description = request.form.get("job_description", "")
    roles_responsibilities = request.form.get("roles_responsibilities", "")
    skills_requirement = request.form.get("skills_requirement", "")
    cutoff_percentage = float(request.form.get("cutoff_percentage", 0))
    required_candidates = int(request.form.get("required_candidates", 0))
    
    if not job_description:
        return jsonify({"error": "Job description is required"}), 400
    
    # Combine all job requirements
    full_job_description = f"{job_description} {roles_responsibilities} {skills_requirement}".strip()
    
    # Process each file
    candidates = []
    for file in files:
        if file.filename == "" or not allowed_file(file.filename):
            continue
        
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)
        
        result = predict_resume(filepath, full_job_description)
        
        candidates.append({
            "candidate_name": result["candidate_name"],
            "filename": filename,
            "match_percentage": result["match_percentage"],
            "file_link": f"/view_resume/{filename}"
        })
    
    if not candidates:
        return jsonify({"error": "No valid resume files found"}), 400
    
    # Filter candidates above cutoff
    selected_candidates = [c for c in candidates if c["match_percentage"] >= cutoff_percentage]
    
    # Sort by match percentage (descending)
    selected_candidates.sort(key=lambda x: x["match_percentage"], reverse=True)
    
    # Apply required candidates limit
    if required_candidates > 0:
        selected_candidates = selected_candidates[:required_candidates]
    
    # Prepare response
    response = {
        "candidates": selected_candidates,
        "total_processed": len(candidates),
        "cutoff_percentage": cutoff_percentage,
        "required_candidates": required_candidates
    }
    
    # Add message if no candidates meet cutoff
    if not selected_candidates:
        response["message"] = "No Candidate meets the Cut-Off Percentage"
    
    return jsonify(response)



@app.route("/view_resume/<filename>")
def view_resume(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route("/")
def index():
    return "Backend is running"

if __name__ == "__main__":

    app.run(debug=True)
