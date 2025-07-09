
import React from 'react';
import { TrendingUp, Building, Users, Award } from 'lucide-react';

export const Placements = () => {
  const placementStats = {
    year: '2023-24',
    placementRate: '95%',
    averagePackage: '₹8.5 LPA',
    highestPackage: '₹45 LPA',
    totalOffers: '180+',
    companies: '75+'
  };

  const topRecruiters = [
    { name: 'Google', package: '₹45 LPA', positions: 'Software Engineer, ML Engineer' },
    { name: 'Microsoft', package: '₹38 LPA', positions: 'Data Scientist, AI Developer' },
    { name: 'Amazon', package: '₹35 LPA', positions: 'ML Scientist, Software Engineer' },
    { name: 'Goldman Sachs', package: '₹32 LPA', positions: 'Quantitative Analyst' },
    { name: 'Adobe', package: '₹28 LPA', positions: 'Data Scientist, ML Engineer' },
    { name: 'Flipkart', package: '₹25 LPA', positions: 'Data Analyst, Software Engineer' },
    { name: 'PayTM', package: '₹22 LPA', positions: 'ML Engineer, Data Scientist' },
    { name: 'Zomato', package: '₹20 LPA', positions: 'Data Analyst, Backend Engineer' },
    { name: 'Swiggy', package: '₹18 LPA', positions: 'Data Scientist, Software Engineer' },
    { name: 'BYJU\'S', package: '₹16 LPA', positions: 'AI Engineer, Data Analyst' },
    { name: 'Accenture', package: '₹8 LPA', positions: 'AI Consultant, Data Analyst' },
    { name: 'TCS', package: '₹7 LPA', positions: 'Software Engineer, Data Analyst' }
  ];

  const placementTrends = [
    { year: '2020-21', rate: '85%', avgPackage: '₹5.2 LPA', companies: 45 },
    { year: '2021-22', rate: '88%', avgPackage: '₹6.1 LPA', companies: 55 },
    { year: '2022-23', rate: '92%', avgPackage: '₹7.3 LPA', companies: 68 },
    { year: '2023-24', rate: '95%', avgPackage: '₹8.5 LPA', companies: 75 }
  ];

  const successStories = [
    {
      name: 'Priya Sharma',
      batch: '2023',
      company: 'Google',
      package: '₹45 LPA',
      position: 'Machine Learning Engineer',
      story: 'Secured the highest package through exceptional performance in AI research projects and competitive programming.'
    },
    {
      name: 'Rahul Verma',
      batch: '2023',
      company: 'Microsoft',
      package: '₹38 LPA',
      position: 'Data Scientist',
      story: 'Led multiple successful hackathons and published research papers in top-tier AI conferences.'
    },
    {
      name: 'Anita Patel',
      batch: '2023',
      company: 'Amazon',
      package: '₹35 LPA',
      position: 'ML Scientist',
      story: 'Contributed to open-source ML libraries and completed internships at leading tech companies.'
    }
  ];

  return (
    <section id="placements" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Placements & Career Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exceptional placement records with leading companies in AI, Data Science, and Technology sectors
          </p>
        </div>

        {/* Placement Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Placement Statistics {placementStats.year}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{placementStats.placementRate}</div>
              <div className="text-blue-100">Placement Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{placementStats.averagePackage}</div>
              <div className="text-blue-100">Average Package</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{placementStats.highestPackage}</div>
              <div className="text-blue-100">Highest Package</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{placementStats.totalOffers}</div>
              <div className="text-blue-100">Total Offers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{placementStats.companies}</div>
              <div className="text-blue-100">Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Countries</div>
            </div>
          </div>
        </div>

        {/* Top Recruiters */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">Our Top Recruiters</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRecruiters.map((company, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">{company.name}</h4>
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-green-600 font-bold text-lg mb-2">Upto {company.package}</p>
                <p className="text-gray-600 text-sm">{company.positions}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Trends */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">Placement Trends</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {placementTrends.map((trend, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="bg-gradient-to-r from-green-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-3 text-gray-800">{trend.year}</h4>
                <div className="space-y-2">
                  <p className="text-green-600 font-bold">{trend.rate}</p>
                  <p className="text-blue-600 font-semibold">{trend.avgPackage}</p>
                  <p className="text-gray-600 text-sm">{trend.companies} Companies</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">Success Stories</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">{story.name}</h4>
                  <p className="text-gray-600">Batch of {story.batch}</p>
                </div>
                
                <div className="text-center mb-4">
                  <p className="text-lg font-bold text-purple-600">{story.company}</p>
                  <p className="text-green-600 font-semibold">{story.package}</p>
                  <p className="text-gray-600 text-sm">{story.position}</p>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed italic">"{story.story}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Career Support */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Career Support Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: 'Resume Building', description: 'Professional resume and portfolio development' },
              { icon: Award, title: 'Interview Preparation', description: 'Mock interviews and technical assessment prep' },
              { icon: Building, title: 'Industry Connect', description: 'Direct connections with leading companies' },
              { icon: TrendingUp, title: 'Skill Development', description: 'Continuous upskilling and certification programs' }
            ].map((service, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-3 text-gray-800">{service.title}</h4>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
