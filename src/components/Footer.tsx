
import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    academics: [
      { name: 'Undergraduate Programs', href: '#' },
      { name: 'Postgraduate Programs', href: '#' },
      { name: 'Ph.D. Programs', href: '#' },
      { name: 'Course Curriculum', href: '#' },
      { name: 'Academic Calendar', href: '#' }
    ],
    research: [
      { name: 'Research Areas', href: '#research' },
      { name: 'Publications', href: '#' },
      { name: 'Ongoing Projects', href: '#' },
      { name: 'Research Facilities', href: '#' },
      { name: 'Collaborations', href: '#' }
    ],
    student: [
      { name: 'Student Portal', href: '#' },
      { name: 'Clubs & Activities', href: '#clubs' },
      { name: 'Events', href: '#events' },
      { name: 'Placements', href: '#placements' },
      { name: 'Alumni Network', href: '#' }
    ],
    resources: [
      { name: 'Library', href: '#' },
      { name: 'Laboratory Access', href: '#' },
      { name: 'Digital Resources', href: '#' },
      { name: 'Career Services', href: '#' },
      { name: 'Student Support', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Youtube, href: '#', name: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Department Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">AI & Data Science</h3>
                <p className="text-gray-400 text-sm">VIT University</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Leading the future of technology through innovative education and cutting-edge research 
              in Artificial Intelligence and Data Science.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">VIT University, Vellore, Tamil Nadu</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">+91 416 220 2020</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-400" />
                <span className="text-gray-300 text-sm">info@aids.vit.ac.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Academics</h4>
            <ul className="space-y-2">
              {footerLinks.academics.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Research</h4>
            <ul className="space-y-2">
              {footerLinks.research.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Student Life</h4>
            <ul className="space-y-2">
              {footerLinks.student.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-white">Stay Updated</h4>
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter for the latest updates on research, events, and opportunities.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-lg text-white font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {currentYear} Department of AI & Data Science, VIT University. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-2">
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
