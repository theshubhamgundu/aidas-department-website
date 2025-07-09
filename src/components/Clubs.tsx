
import React from 'react';
import { Brain, Code, Trophy, Users, Lightbulb, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Clubs = () => {
  const clubs = [
    {
      icon: Brain,
      name: 'AI Research Club',
      description: 'Explore cutting-edge AI research, participate in competitions, and work on innovative projects',
      members: '120+',
      activities: ['Research Projects', 'Paper Publications', 'AI Competitions', 'Guest Lectures'],
      meeting: 'Every Friday 4:00 PM',
      coordinator: 'Dr. Priya Sharma'
    },
    {
      icon: Database,
      name: 'Data Science Society',
      description: 'Master data analytics, visualization, and big data technologies through hands-on projects',
      members: '95+',
      activities: ['Data Analysis Projects', 'Kaggle Competitions', 'Industry Workshops', 'Hackathons'],
      meeting: 'Every Wednesday 3:00 PM',
      coordinator: 'Dr. Rajesh Kumar'
    },
    {
      icon: Code,
      name: 'Machine Learning Club',
      description: 'Dive deep into ML algorithms, frameworks, and practical implementations',
      members: '85+',
      activities: ['ML Model Development', 'Algorithm Contests', 'Tech Talks', 'Open Source Projects'],
      meeting: 'Every Tuesday 5:00 PM',
      coordinator: 'Dr. Anita Verma'
    },
    {
      icon: Trophy,
      name: 'Competitive Programming',
      description: 'Enhance problem-solving skills and participate in national and international contests',
      members: '70+',
      activities: ['Daily Practice', 'Contest Participation', 'Mock Interviews', 'Coding Bootcamps'],
      meeting: 'Daily 6:00 PM - 8:00 PM',
      coordinator: 'Prof. Amit Gupta'
    },
    {
      icon: Lightbulb,
      name: 'Innovation Lab',
      description: 'Transform ideas into reality through entrepreneurship and innovative solutions',
      members: '60+',
      activities: ['Startup Incubation', 'Patent Filing', 'Industry Mentorship', 'Funding Assistance'],
      meeting: 'Every Saturday 10:00 AM',
      coordinator: 'Dr. Suresh Patel'
    },
    {
      icon: Users,
      name: 'Tech Community',
      description: 'Build networks, share knowledge, and collaborate on interdisciplinary projects',
      members: '150+',
      activities: ['Networking Events', 'Tech Meetups', 'Industry Visits', 'Alumni Connect'],
      meeting: 'Every Thursday 4:30 PM',
      coordinator: 'Dr. Meera Singh'
    }
  ];

  const achievements = [
    {
      title: 'National Data Science Challenge',
      position: '1st Place',
      year: '2023',
      team: 'AI Research Club'
    },
    {
      title: 'International ML Competition',
      position: '2nd Place',
      year: '2023',
      team: 'Machine Learning Club'
    },
    {
      title: 'Smart India Hackathon',
      position: 'Winner',
      year: '2023',
      team: 'Innovation Lab'
    },
    {
      title: 'ACM-ICPC Regional',
      position: 'Top 10',
      year: '2023',
      team: 'Competitive Programming'
    }
  ];

  return (
    <section id="clubs" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Student Clubs & Activities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our vibrant community of learners and innovators through various clubs and activities
          </p>
        </div>

        {/* Clubs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {clubs.map((club, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-blue-100 hover:-translate-y-2"
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <club.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{club.name}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{club.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Members:</span>
                  <span className="font-semibold text-blue-600">{club.members}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Meeting:</span>
                  <span className="font-medium text-gray-700">{club.meeting}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Coordinator:</span>
                  <span className="font-medium text-gray-700 ml-1">{club.coordinator}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-xs font-semibold text-blue-600 mb-2">Activities:</p>
                <div className="space-y-1">
                  {club.activities.map((activity, idx) => (
                    <p key={idx} className="text-xs text-gray-600">• {activity}</p>
                  ))}
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                Join Club
              </Button>
            </div>
          ))}
        </div>

        {/* Recent Achievements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">Recent Achievements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{achievement.title}</h4>
                <p className="text-lg font-bold text-yellow-600 mb-1">{achievement.position}</p>
                <p className="text-sm text-gray-500 mb-2">{achievement.year}</p>
                <p className="text-xs text-blue-600 font-medium">{achievement.team}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Club Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-8">Club Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">6</div>
              <div className="text-blue-100">Active Clubs</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">580+</div>
              <div className="text-blue-100">Total Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Events Organized</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Awards Won</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
