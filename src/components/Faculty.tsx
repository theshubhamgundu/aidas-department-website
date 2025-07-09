
import React from 'react';
import { Mail, Phone, Award, BookOpen } from 'lucide-react';

export const Faculty = () => {
  const facultyMembers = [
    {
      name: 'Dr. Priya Sharma',
      designation: 'Professor & Head of Department',
      qualification: 'Ph.D. in Artificial Intelligence, IIT Delhi',
      specialization: 'Machine Learning, Deep Learning, Natural Language Processing',
      experience: '15+ years',
      email: 'priya.sharma@vit.ac.in',
      phone: '+91 9876543210',
      image: '/placeholder.svg'
    },
    {
      name: 'Dr. Rajesh Kumar',
      designation: 'Associate Professor',
      qualification: 'Ph.D. in Data Science, IISc Bangalore',
      specialization: 'Big Data Analytics, Computer Vision, IoT',
      experience: '12+ years',
      email: 'rajesh.kumar@vit.ac.in',
      phone: '+91 9876543211',
      image: '/placeholder.svg'
    },
    {
      name: 'Dr. Anita Verma',
      designation: 'Assistant Professor',
      qualification: 'Ph.D. in Machine Learning, IIT Bombay',
      specialization: 'Reinforcement Learning, AI Ethics, Robotics',
      experience: '8+ years',
      email: 'anita.verma@vit.ac.in',
      phone: '+91 9876543212',
      image: '/placeholder.svg'
    },
    {
      name: 'Dr. Suresh Patel',
      designation: 'Assistant Professor',
      qualification: 'Ph.D. in Data Mining, IIT Madras',
      specialization: 'Data Mining, Business Intelligence, Predictive Analytics',
      experience: '10+ years',
      email: 'suresh.patel@vit.ac.in',
      phone: '+91 9876543213',
      image: '/placeholder.svg'
    },
    {
      name: 'Dr. Meera Singh',
      designation: 'Assistant Professor',
      qualification: 'Ph.D. in Neural Networks, IIT Kanpur',
      specialization: 'Neural Networks, Pattern Recognition, Image Processing',
      experience: '7+ years',
      email: 'meera.singh@vit.ac.in',
      phone: '+91 9876543214',
      image: '/placeholder.svg'
    },
    {
      name: 'Prof. Amit Gupta',
      designation: 'Assistant Professor',
      qualification: 'M.Tech in AI & ML, NIT Trichy',
      specialization: 'Web Development, Database Systems, Cloud Computing',
      experience: '5+ years',
      email: 'amit.gupta@vit.ac.in',
      phone: '+91 9876543215',
      image: '/placeholder.svg'
    }
  ];

  return (
    <section id="faculty" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Our Distinguished Faculty
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from industry experts and renowned researchers who are shaping the future of AI and Data Science
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyMembers.map((faculty, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100 hover:-translate-y-2"
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-32 flex items-end justify-center pb-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              </div>
              
              <div className="p-6 pt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{faculty.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{faculty.designation}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-2">
                    <Award className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{faculty.qualification}</p>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <BookOpen className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{faculty.specialization}</p>
                  </div>
                  
                  <p className="text-sm text-gray-500 font-medium">Experience: {faculty.experience}</p>
                </div>
                
                <div className="space-y-2 border-t border-gray-100 pt-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <a
                      href={`mailto:${faculty.email}`}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {faculty.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-green-500" />
                    <a
                      href={`tel:${faculty.phone}`}
                      className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {faculty.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
