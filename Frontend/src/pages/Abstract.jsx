import React from "react";

function Abstract() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text leading-tight">
            Resume Screening with BERT and AI
          </h1>
        </div>

        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                <strong className="text-blue-600">Abstract:</strong> In today's recruitment process, hiring managers get thousands of
                resumes for one vacancy, and screening them manually is
                time-consuming and inefficient. To overcome this issue, we
                created an AI-based resume shortlisting system using fine-tuned{" "}
                <strong className="text-purple-600">
                  BERT (Bidirectional Encoder Representations from
                  Transformers).
                </strong>
                This model intelligently maps resumes to job descriptions based
                on the skills, experience, and domain-specific requirements.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Our system runs a structured dataset with matched and mismatched
                resume-job description pairs to have a balanced dataset for
                efficient training. The model categorizes resumes into Highly
                Relevant, Partially Relevant, and Not Relevant, enhancing
                candidate shortlisting accuracy. The dataset covers both
                experienced professionals and freshers with academic projects to
                be inclusive at various career levels. To enhance data quality,
                our system considers data relevance in addition to accuracy.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Through automation of the screening process, this solution
                decreases recruiter workload by a large margin, improves hiring
                efficiency, and guarantees that only the most appropriate
                candidates are shortlisted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Abstract;