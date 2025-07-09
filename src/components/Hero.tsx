
import React from 'react';
import { Brain, Database, Cpu, ChartBar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main Hero Content */}
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Department of Artificial Intelligence & Data Science
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Pioneering the future of technology through cutting-edge research, innovative education, 
              and transformative applications in AI and Data Science
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToAbout}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 text-lg"
              >
                Explore Our Vision
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-blue-300 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              >
                View Research
              </Button>
            </div>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Brain, title: 'Artificial Intelligence', description: 'Machine Learning & Deep Learning' },
              { icon: Database, title: 'Data Science', description: 'Analytics & Visualization' },
              { icon: Cpu, title: 'Computer Vision', description: 'Image & Pattern Recognition' },
              { icon: ChartBar, title: 'Business Intelligence', description: 'Strategic Data Solutions' }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: '500+', label: 'Students' },
            { number: '50+', label: 'Faculty Members' },
            { number: '100+', label: 'Research Projects' },
            { number: '95%', label: 'Placement Rate' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
