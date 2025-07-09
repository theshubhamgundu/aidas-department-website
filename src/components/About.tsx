
import React from 'react';
import { Target, Eye, Award, Users } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            About Our Department
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading the transformation in AI and Data Science education through innovation, research, and industry collaboration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Vision */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold ml-4 text-gray-800">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To be a globally recognized center of excellence in Artificial Intelligence and Data Science, 
              fostering innovation, research, and ethical AI development that transforms society and drives 
              technological advancement for the betterment of humanity.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl border border-purple-100">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold ml-4 text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To provide world-class education in AI and Data Science, conduct cutting-edge research, 
              and develop skilled professionals who can solve real-world problems using ethical AI 
              practices and data-driven solutions.
            </p>
          </div>
        </div>

        {/* Program Outcomes */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">Program Outcomes</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Technical Excellence',
                description: 'Master core AI/ML algorithms, data structures, and programming paradigms'
              },
              {
                icon: Award,
                title: 'Research & Innovation',
                description: 'Conduct independent research and develop innovative solutions'
              },
              {
                icon: Target,
                title: 'Ethical AI Development',
                description: 'Understand and implement responsible AI practices and ethics'
              },
              {
                icon: Users,
                title: 'Industry Readiness',
                description: 'Apply knowledge to solve real-world industry challenges'
              },
              {
                icon: Award,
                title: 'Communication Skills',
                description: 'Effectively communicate technical concepts to diverse audiences'
              },
              {
                icon: Target,
                title: 'Lifelong Learning',
                description: 'Adapt to emerging technologies and continuous professional development'
              }
            ].map((outcome, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <outcome.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-3 text-gray-800">{outcome.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Department Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">Department Highlights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">4</div>
              <div className="text-blue-100">Years Program</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">8</div>
              <div className="text-blue-100">Semesters</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Core Subjects</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Electives</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
