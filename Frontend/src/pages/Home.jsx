import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Search, BarChart2, Shield, Zap, Sparkles, Users, Target } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text mb-6 animate-fade-in leading-tight">
            Intelligent Resume Analyzer
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up leading-relaxed">
            Revolutionize your hiring process with AI-powered resume analysis and matching
          </p>
          <div className="flex justify-center gap-4 animate-fade-in-up">
            <Link
              to="/find-matches"
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/abstract"
              className="group flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 leading-tight">Smart Resume Parsing</h3>
            <p className="text-gray-600 leading-relaxed">Automatically extract and analyze key information from resumes with high accuracy</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 leading-tight">Intelligent Matching</h3>
            <p className="text-gray-600 leading-relaxed">Find the perfect candidates by matching resumes with job requirements</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
              <BarChart2 className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 leading-tight">Performance Analytics</h3>
            <p className="text-gray-600 leading-relaxed">Get detailed insights and analytics about candidate matches</p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text leading-tight">
            Why Choose Our Solution?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">Time-Saving</h3>
                <p className="text-gray-600 leading-relaxed">Reduce manual screening time by up to 80% with automated analysis</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">AI-Powered</h3>
                <p className="text-gray-600 leading-relaxed">Leverage advanced AI algorithms for accurate candidate matching</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">Scalable</h3>
                <p className="text-gray-600 leading-relaxed">Handle any number of resumes efficiently and effectively</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">Precise</h3>
                <p className="text-gray-600 leading-relaxed">Get accurate matching scores based on multiple parameters</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text leading-tight">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of companies who have streamlined their recruitment process with our AI-powered solution
          </p>
          <Link
            to="/find-matches"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Free Analysis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
