import React from 'react';

const teamMembers = [
  {
    name: 'Austin Stephens',
    title: 'Lead Tech Engineer',
    image: 'bAustin.jpg',
    description: 'Brings architectural vision to every build.',
  },
  {
    name: 'Oscar Stephens',
    title: 'Frontend Developer',
    image: 'bOscar.jpg',
    description: 'Builds sleek interfaces with mobile fronted tech and web tech. Passionate about performance, animations, and clean UI logic.',
  },
  {
    name: 'Augustine Stephens',
    title: 'Backend Developer',
    image: 'bAuger.jpg',
    description: 'Powers the engine room—API development, databases, and integrations.',
  },
];

const projects = [
  {
    title: 'Smart School Management System',
    description: 'A multi-school management platform with online fee payments, student tracking, and parent access.',
  },
  {
    title: 'Community Finance App',
    description: 'A mobile app for susu-style savings and secure withdrawals built with Flutter.',
  },
  {
    title: 'Tertiary Link Platform',
    description: 'Helping high school students compare and select the best Ghanaian universities.',
  },
  {
    title: 'Network Setup',
    description: 'Designed and deployed secure network infrastructures for small to mid-sized businesses, ensuring seamless connectivity and support.',
  },
  {
    title: 'Brand & UI Design Systems',
    description: 'Crafted cohesive brand identities and UI design systems for startups, combining aesthetics with usability to enhance user experience across platforms.',
  },
  
  
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f4f4f8] to-[#e0e7ff] px-6 py-12 pt-50">
      {/* Intro */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-[#0B0047] mb-4">Meet Our Dream Team</h1>
        <p className="text-lg text-gray-600">
          We’re a team of creators, designers, problem-solvers, and world-class builders dedicated to crafting impact-driven technology.
        </p>
      </div>

      {/* Team Section */}
      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto mb-24">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition-all duration-300">
            <img src={member.image} alt={member.name} className="rounded-xl h-90 w-full object-cover mb-4" />
            <h2 className="text-2xl font-bold text-[#0B0047]">{member.name}</h2>
            <p className="text-sm text-gray-500">{member.title}</p>
            <p className="text-gray-600 mt-2 text-sm">{member.description}</p>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-[#0B0047] mb-3">Finished and ongoing projects...</h2>
        <p className="text-gray-600">Here are some projects we’ve built with code, coffee, and lots of curiosity 😄</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-[#0B0047] mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
