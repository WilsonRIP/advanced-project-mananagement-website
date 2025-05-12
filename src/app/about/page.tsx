import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      bio: 'Former PM at Google with 12+ years experience in project management and team leadership.',
      imagePath: '/placeholder-person-1.jpg',
    },
    {
      name: 'David Chen',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Amazon engineer with a passion for building tools that make teams more productive.',
      imagePath: '/placeholder-person-2.jpg',
    },
    {
      name: 'Aisha Patel',
      role: 'Head of Product',
      bio: 'Experienced product leader focused on creating intuitive, powerful software solutions.',
      imagePath: '/placeholder-person-3.jpg',
    },
    {
      name: 'James Wilson',
      role: 'Head of Customer Success',
      bio: 'Dedicated to ensuring customers get the most value from ProjectPro.',
      imagePath: '/placeholder-person-4.jpg',
    },
  ];

  const values = [
    {
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. We listen, learn, and build solutions that truly meet their needs.',
      icon: (
        <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: 'Simplicity',
      description: 'We believe in making complex things simple. Our platform is powerful yet intuitive, eliminating unnecessary complexity.',
      icon: (
        <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Continuous Improvement',
      description: 'We\'re never satisfied with the status quo. We constantly iterate, improve, and push ourselves to deliver better solutions.',
      icon: (
        <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: 'Transparency',
      description: 'We believe in open, honest communication—both within our team and with our customers. No hidden agendas, no surprises.',
      icon: (
        <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
  ];

  return (
    <div className="pt-8 pb-16">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're on a mission to help teams work better together by building tools that simplify project management and enhance collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
                <p>
                  ProjectPro was founded in 2019 by Sarah Johnson and David Chen, two industry veterans who experienced firsthand the challenges of managing complex projects with distributed teams.
                </p>
                <p>
                  After working at tech giants like Google and Amazon, they saw an opportunity to create a project management platform that combined powerful features with an intuitive interface—making sophisticated project management accessible to teams of all sizes.
                </p>
                <p>
                  What started as a simple tool for task tracking quickly evolved into a comprehensive platform that now helps thousands of teams around the world collaborate more effectively, stay organized, and deliver projects on time.
                </p>
                <p>
                  Today, ProjectPro is trusted by over 5,000 companies, from startups to Fortune 500 enterprises, to manage their most important work.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] bg-indigo-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-purple-600/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-6">
                    <div className="inline-block bg-white dark:bg-gray-800 rounded-full p-3 mb-4 shadow-md">
                      <svg className="h-10 w-10 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Founded in 2019</div>
                    <div className="text-lg text-gray-700 dark:text-gray-300 mb-6">San Francisco, California</div>
                    <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                      <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-4 shadow-sm">
                        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">5000+</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
                      </div>
                      <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-4 shadow-sm">
                        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">45+</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These core principles guide everything we do—from how we build our product to how we interact with our customers and each other.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 flex">
                <div className="mr-4 bg-indigo-100 dark:bg-indigo-900 h-14 w-14 rounded-lg flex items-center justify-center flex-shrink-0">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're a diverse, passionate group of people committed to helping teams work better together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/careers" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
              Join our team
              <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform how your team works?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of teams already using ProjectPro to deliver projects on time and within budget.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/signup" className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-md font-medium text-lg inline-block">
              Start Your Free Trial
            </Link>
            <Link href="/contact" className="bg-indigo-700 text-white hover:bg-indigo-800 border border-indigo-400 px-8 py-3 rounded-md font-medium text-lg inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 