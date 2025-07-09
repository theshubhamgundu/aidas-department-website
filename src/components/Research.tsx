
import React from 'react';
import { Brain, Database, Eye, Zap, Users, BookOpen } from 'lucide-react';

export const Research = () => {
  const researchAreas = [
    {
      icon: Brain,
      title: 'Machine Learning & Deep Learning',
      description: 'Advanced neural networks, reinforcement learning, and AI model optimization',
      projects: ['Automated Medical Diagnosis', 'Financial Market Prediction', 'Smart Recommendation Systems']
    },
    {
      icon: Database,
      title: 'Big Data Analytics',
      description: 'Large-scale data processing, distributed computing, and real-time analytics',
      projects: ['IoT Data Processing Platform', 'Social Media Sentiment Analysis', 'Supply Chain Optimization']
    },
    {
      icon: Eye,
      title: 'Computer Vision',
      description: 'Image processing, object detection, facial recognition, and medical imaging',
      projects: ['Autonomous Vehicle Vision', 'Medical Image Analysis', 'Smart Surveillance Systems']
    },
    {
      icon: Zap,
      title: 'Natural Language Processing',
      description: 'Text analysis, language models, chatbots, and multilingual processing',
      projects: ['Multilingual Translation System', 'Legal Document Analysis', 'Voice Assistant Development']
    },
    {
      icon: Users,
      title: 'AI Ethics & Fairness',
      description: 'Responsible AI development, bias detection, and ethical AI frameworks',
      projects: ['AI Bias Detection Tool', 'Ethical AI Guidelines', 'Fairness in Hiring Systems']
    },
    {
      icon: BookOpen,
      title: 'Educational Technology',
      description: 'AI-powered learning systems, adaptive education, and personalized learning',
      projects: ['Adaptive Learning Platform', 'Automated Grading System', 'Student Performance Prediction']
    }
  ];

  const ongoingProjects = [
    {
      title: 'Smart Healthcare Monitoring System',
      lead: 'Dr. Priya Sharma',
      duration: '2023-2025',
      funding: '₹25 Lakhs',
      description: 'AI-powered patient monitoring and early disease detection system'
    },
    {
      title: 'Intelligent Traffic Management',
      lead: 'Dr. Rajesh Kumar',
      duration: '2023-2024',
      funding: '₹18 Lakhs',
      description: 'Real-time traffic optimization using computer vision and machine learning'
    },
    {
      title: 'Financial Fraud Detection System',
      lead: 'Dr. Anita Verma',
      duration: '2024-2026',
      funding: '₹30 Lakhs',
      description: 'Advanced ML algorithms for detecting fraudulent financial transactions'
    }
  ];

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Research & Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pushing the boundaries of AI and Data Science through cutting-edge research and innovative solutions
          </p>
        </div>

        {/* Research Areas */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">Research Areas</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-blue-100 hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <area.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-3 text-gray-800">{area.title}</h4>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{area.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-blue-600 mb-2">Current Projects:</p>
                  {area.projects.map((project, idx) => (
                    <p key={idx} className="text-xs text-gray-500">• {project}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ongoing Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">Major Ongoing Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ongoingProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-lg font-semibold mb-3 text-gray-800">{project.title}</h4>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600"><span className="font-medium">Lead:</span> {project.lead}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Duration:</span> {project.duration}</p>
                  <p className="text-sm text-green-600 font-medium">Funding: {project.funding}</p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Research Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">Research Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Publications</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Active Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">₹2Cr+</div>
              <div className="text-blue-100">Research Funding</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Industry Collaborations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
