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
    
    # Sort all candidates by match percentage (descending)
    all_candidates_sorted = sorted(candidates, key=lambda x: x["match_percentage"], reverse=True)
    
    # Filter candidates above cutoff
    selected_candidates = [c for c in all_candidates_sorted if c["match_percentage"] >= cutoff_percentage]
    
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
        # Suggest cutoff based on the top candidate's match percentage
        if all_candidates_sorted:
            suggested_cutoff = int(all_candidates_sorted[0]["match_percentage"])
            response["suggested_cutoff"] = suggested_cutoff
            response["suggestion_message"] = f"Try reducing Cut-Off Percentage to {suggested_cutoff}% to see candidates"
    # Add suggestion if fewer candidates than required
    elif len(selected_candidates) < required_candidates:
        # Get the match percentage of the candidate at position required_candidates (if exists)
        if len(all_candidates_sorted) >= required_candidates:
            # Candidate at the required position (0-indexed: required_candidates - 1)
            suggested_cutoff = int(all_candidates_sorted[required_candidates - 1]["match_percentage"])
        else:
            # Not enough total candidates, suggest the lowest candidate's percentage
            suggested_cutoff = int(all_candidates_sorted[-1]["match_percentage"])
        
        response["suggested_cutoff"] = suggested_cutoff
        response["suggestion_message"] = f"Try reducing Cut-Off Percentage to {suggested_cutoff}% to meet required candidate count"
    
    return jsonify(response)




@app.route("/view_resume/<filename>")
def view_resume(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route("/")
def index():
    return "Backend is running"

if __name__ == "__main__":

    app.run(debug=True)
