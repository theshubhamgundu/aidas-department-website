
import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Events = () => {
  const upcomingEvents = [
    {
      title: 'International Conference on AI & Data Science',
      date: 'March 15-17, 2024',
      time: '9:00 AM - 6:00 PM',
      venue: 'VIT Main Auditorium',
      type: 'Conference',
      description: 'Leading researchers and industry experts will share insights on the latest trends in AI and Data Science.',
      registrations: '500+',
      status: 'Open Registration'
    },
    {
      title: 'Machine Learning Workshop',
      date: 'February 20, 2024',
      time: '10:00 AM - 4:00 PM',
      venue: 'Computer Lab - Block A',
      type: 'Workshop',
      description: 'Hands-on workshop on advanced machine learning techniques and practical implementations.',
      registrations: '150',
      status: 'Registration Closing Soon'
    },
    {
      title: 'Industry Expert Lecture Series',
      date: 'February 10, 2024',
      time: '2:00 PM - 4:00 PM',
      venue: 'Seminar Hall 1',
      type: 'Lecture',
      description: 'Guest lecture by Google AI Research team on "Future of Artificial Intelligence".',
      registrations: '300',
      status: 'Open Registration'
    },
    {
      title: 'Data Science Hackathon 2024',
      date: 'March 5-6, 2024',
      time: '24 Hours',
      venue: 'Innovation Lab',
      type: 'Hackathon',
      description: '48-hour hackathon focusing on real-world data science problems and innovative solutions.',
      registrations: '200+',
      status: 'Team Registration Open'
    }
  ];

  const pastEvents = [
    {
      title: 'AI Research Symposium 2023',
      date: 'December 15, 2023',
      participants: '400+',
      highlights: 'Research paper presentations, Industry panel discussions'
    },
    {
      title: 'Deep Learning Bootcamp',
      date: 'November 20-22, 2023',
      participants: '120',
      highlights: 'Hands-on deep learning projects, Neural network architectures'
    },
    {
      title: 'Industry Connect Summit',
      date: 'October 10, 2023',
      participants: '300+',
      highlights: 'Industry partnerships, Internship opportunities'
    }
  ];

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Events & Activities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest conferences, workshops, and educational events
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-gray-800">Upcoming Events</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                    <span className="text-white text-sm">{event.status}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800">{event.title}</h4>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600">{event.date}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">{event.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span className="text-gray-600">{event.venue}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-600">{event.registrations} registered</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed">{event.description}</p>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                    Register Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-gray-800">Recent Past Events</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <h4 className="text-lg font-semibold mb-2 text-gray-800">{event.title}</h4>
                <p className="text-blue-600 text-sm mb-3">{event.date}</p>
                <p className="text-gray-600 text-sm mb-3">
                  <span className="font-medium">Participants:</span> {event.participants}
                </p>
                <p className="text-gray-700 text-sm">{event.highlights}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-8">Event Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Events This Year</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">Total Participants</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Industry Speakers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-blue-100">International Speakers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
