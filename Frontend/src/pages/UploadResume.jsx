import { useState } from "react";
import axios from "axios";
import { Upload, Search, AlertCircle, Loader2, FileText, CheckCircle2, XCircle, FolderOpen, Users, Percent } from "lucide-react";

const UploadResume = () => {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [rolesResponsibilities, setRolesResponsibilities] = useState("");
  const [skillsRequirement, setSkillsRequirement] = useState("");
  const [cutoffPercentage, setCutoffPercentage] = useState(50);
  const [requiredCandidates, setRequiredCandidates] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFolderChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    // Filter only PDF, DOC, DOCX files
    const validFiles = selectedFiles.filter((file) => {
      const ext = file.name.split('.').pop().toLowerCase();
      return ['pdf', 'doc', 'docx'].includes(ext);
    });
    
    if (validFiles.length > 0) {
      setFiles(validFiles);
      setError(null);
    } else {
      setError("No valid resume files found in the selected folder. Please select a folder containing PDF, DOC, or DOCX files.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) => {
      const ext = file.name.split('.').pop().toLowerCase();
      return ['pdf', 'doc', 'docx'].includes(ext);
    });
    
    if (validFiles.length > 0) {
      setFiles(validFiles);
      setError(null);
    } else {
      setError("Please drop only PDF, DOC, or DOCX files.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!files.length || !jobDescription.trim()) {
      setError("Please select a folder with resumes and enter a job description.");
      return;
    }
    
    if (cutoffPercentage < 0 || cutoffPercentage > 100) {
      setError("Cut-Off Percentage must be between 0 and 100.");
      return;
    }
    
    if (requiredCandidates < 1) {
      setError("Required Candidates must be at least 1.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResults(null);
    
    const formData = new FormData();
    // Append all files
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("job_description", jobDescription);
    formData.append("roles_responsibilities", rolesResponsibilities);
    formData.append("skills_requirement", skillsRequirement);
    formData.append("cutoff_percentage", cutoffPercentage);
    formData.append("required_candidates", requiredCandidates);
    
    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResults(response.data);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to process resumes. Please try again.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text mb-2 mt-14">
            Resume Analysis Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Upload candidate resumes and specify job requirements for comprehensive matching analysis</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-100">
          {/* Position Requirements Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Position Requirements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Job Description</label>
                <textarea
                  className="block w-full p-3 border-2 border-gray-200 rounded-xl bg-white/50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter job description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Roles & Responsibilities</label>
                <textarea
                  className="block w-full p-3 border-2 border-gray-200 rounded-xl bg-white/50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter roles and responsibilities"
                  value={rolesResponsibilities}
                  onChange={(e) => setRolesResponsibilities(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Skills Requirement</label>
                <textarea
                  className="block w-full p-3 border-2 border-gray-200 rounded-xl bg-white/50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter required skills"
                  value={skillsRequirement}
                  onChange={(e) => setSkillsRequirement(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Candidate Resumes Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-blue-600" />
              Candidate Resumes
            </h2>
            <div 
              className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-all duration-200 ${
                isDragging 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <FolderOpen className={`mx-auto h-12 w-12 ${isDragging ? "text-blue-500" : "text-gray-400"} transition-colors duration-200`} />
                <label className="text-blue-600 cursor-pointer hover:text-blue-500 transition-colors duration-200">
                  <span>Select Folder</span>
                  <input 
                    type="file" 
                    className="sr-only" 
                    webkitdirectory="true" 
                    directory="true" 
                    onChange={handleFolderChange} 
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">Select a folder containing PDF, DOC, or DOCX files</p>
              </div>
            </div>
            {files.length > 0 && (
              <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5" />
                <span>{files.length} resume(s) selected from folder</span>
              </div>
            )}
          </div>

          {/* Cut-off and Required Candidates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Percent className="h-4 w-4" />
                Cut-Off Percentage
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="block w-full p-3 border-2 border-gray-200 rounded-xl bg-white/50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter cut-off percentage (0-100)"
                value={cutoffPercentage}
                onChange={(e) => setCutoffPercentage(Number(e.target.value))}
              />
              <p className="text-xs text-gray-500">Candidates below this percentage will be ignored</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Required Candidates
              </label>
              <input
                type="number"
                min="1"
                className="block w-full p-3 border-2 border-gray-200 rounded-xl bg-white/50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter number of candidates needed"
                value={requiredCandidates}
                onChange={(e) => setRequiredCandidates(Number(e.target.value))}
              />
              <p className="text-xs text-gray-500">Maximum number of candidates to short-list</p>
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-4 flex border border-red-200 animate-fade-in">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all duration-200 transform hover:scale-[1.02]"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> Processing Documents...
              </>
            ) : (
              <>
                <Search className="-ml-1 mr-3 h-5 w-5" /> Analyze Resumes
              </>
            )}
          </button>
        </form>

        {results && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-100 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Analysis Results</h2>
            <p className="text-gray-600 mb-6">
              Processed {results.total_processed} resumes | Cut-off: {results.cutoff_percentage}% | Required: {results.required_candidates} candidates
            </p>
            
            {results.message ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-red-800 mb-2">{results.message}</h3>
                <p className="text-red-600">No candidates meet the specified cut-off percentage of {results.cutoff_percentage}%</p>
                {results.suggestion_message && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                    <p className="text-yellow-800 font-medium">{results.suggestion_message}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Showing {results.candidates.length} candidate(s) meeting the cut-off criteria
                  {results.candidates.length < results.required_candidates && " (fewer than required)"}
                </p>
                {results.suggestion_message && (
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
                    <p className="text-yellow-800 font-medium flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      {results.suggestion_message}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.candidates.map((candidate, index) => (
                    <div 
                      key={index} 
                      className="border-2 border-green-500 bg-green-50 rounded-xl p-6 transition-all duration-200 transform hover:scale-[1.02] overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 break-words leading-tight">{candidate.candidate_name}</h3>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 bg-green-100 rounded-full px-3 py-1">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm font-medium text-green-800 whitespace-nowrap">
                            {candidate.match_percentage}% Matched
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-blue-600" />
                        <a 
                          href={`http://127.0.0.1:5000${candidate.file_link}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          View Resume
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadResume;
