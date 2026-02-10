# Resume Analysis Dashboard

A comprehensive web application for analyzing and ranking candidate resumes against job requirements using natural language processing and machine learning techniques.

## 🚀 Features

- **Batch Resume Processing**: Upload entire folders containing multiple resume files (PDF/DOCX)
- **Intelligent Candidate Matching**: Uses TF-IDF vectorization for semantic similarity analysis
- **Flexible Job Requirements**: Support for job description, roles & responsibilities, and skills requirements
- **Smart Filtering**: Apply cut-off percentage thresholds to filter candidates
- **Ranking System**: Automatically sort candidates by match percentage (descending)
- **Candidate Limit**: Specify maximum number of candidates to display
- **Name Extraction**: Automatically extracts candidate names from resume content
- **Real-time Results**: Instant analysis with detailed match percentages
- **Responsive UI**: Modern, mobile-friendly interface built with React and Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Python 3.14**
- **Flask** - Web framework
- **Flask-CORS** - Cross-origin resource sharing
- **scikit-learn** - Machine learning (TF-IDF vectorization)
- **PyMuPDF** - PDF text extraction
- **python-docx** - Word document processing
- **Werkzeug** - File handling utilities

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library

## 📁 Project Structure

```
Final_Project/
├── Backend/                    # Flask backend application
│   ├── app.py                 # Main Flask application
│   ├── model_loader.py        # Resume processing and analysis logic
│   ├── requirements.txt       # Python dependencies
│   └── uploads/               # Temporary uploaded files
├── Frontend/                  # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/            # Page components
│   │   └── main.jsx          # Application entry point
│   ├── package.json          # Node.js dependencies
│   └── vite.config.js        # Vite configuration
├── Resumes/                   # Sample resume files for testing
└── README.md                 # Project documentation
```

## 🔧 Installation

### Prerequisites
- Python 3.14 or higher
- Node.js 16 or higher
- npm or yarn package manager

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

## 🚀 Usage

### Running the Application

1. **Start the Backend**:
   ```bash
   cd Backend
   .\venv\Scripts\activate  # Windows
   python app.py
   ```
   The backend will start on `http://127.0.0.1:5000`

2. **Start the Frontend**:
   ```bash
   cd Frontend
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

### Using the Dashboard

1. **Access the Application**: Open `http://localhost:5173` in your browser
2. **Select Resume Folder**: Click "Select Folder" and choose a folder containing PDF/DOCX resume files
3. **Enter Job Requirements**:
   - Job Description (required)
   - Roles & Responsibilities (optional)
   - Skills Requirement (optional)
4. **Set Filtering Options**:
   - Cut-Off Percentage: Minimum match percentage (0-100)
   - Required Candidates: Maximum number of candidates to display
5. **Analyze Resumes**: Click "Analyze Resumes" to process and rank candidates
6. **View Results**: Review ranked candidates with match percentages and view individual resumes

## 📡 API Endpoints

### POST `/upload`
Upload and analyze multiple resume files.

**Request Body (multipart/form-data)**:
- `files`: Multiple resume files (PDF/DOCX)
- `job_description`: Job description text (required)
- `roles_responsibilities`: Roles and responsibilities (optional)
- `skills_requirement`: Required skills (optional)
- `cutoff_percentage`: Minimum match percentage (0-100)
- `required_candidates`: Maximum candidates to return

**Response**:
```json
{
  "candidates": [
    {
      "candidate_name": "John Doe",
      "filename": "john_doe_resume.pdf",
      "match_percentage": 85.5,
      "file_link": "/view_resume/john_doe_resume.pdf"
    }
  ],
  "total_processed": 10,
  "cutoff_percentage": 50,
  "required_candidates": 5,
  "message": "No Candidate meets the Cut-Off Percentage" // Only if no candidates qualify
}
```

### GET `/view_resume/<filename>`
Serve uploaded resume files for viewing/downloading.

### GET `/`
Health check endpoint returning "Backend is running".

## 🔍 How It Works

1. **Text Extraction**: Extracts text content from PDF and DOCX resume files
2. **Name Detection**: Identifies candidate names from the first non-empty line of each resume
3. **Content Analysis**: Processes resume content focusing on Technical Skills, Projects, and Experience sections
4. **Similarity Calculation**: Uses TF-IDF vectorization and cosine similarity to compare resumes against job requirements
5. **Filtering & Ranking**: Applies cut-off percentage filter and sorts results by match percentage
6. **Result Presentation**: Displays top candidates with extracted names and match scores

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or issues, please open an issue on the GitHub repository.

## 🔄 Future Enhancements

- [ ] Support for additional file formats (DOC, TXT)
- [ ] Advanced NLP models for better semantic matching
- [ ] Resume parsing with structured data extraction
- [ ] User authentication and resume management
- [ ] Export results to PDF/Excel
- [ ] Integration with ATS systems
- [ ] Multi-language support
