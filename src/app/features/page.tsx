import Link from 'next/link';
import Image from 'next/image';

export default function Features() {
  return (
    <div className="pt-8 pb-16">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features for Modern Teams
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              ProjectPro comes packed with all the tools you need to manage projects efficiently, collaborate seamlessly, and deliver on time.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="inline-block bg-indigo-100 dark:bg-indigo-900 rounded-lg px-3 py-1 text-sm font-semibold text-indigo-600 dark:text-indigo-300 mb-4">
                Task Management
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Organize Work Your Way
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Create, assign, and track tasks with flexible views that adapt to your workflow. Use lists, boards, calendars, or gantt charts to visualize your project from every angle.
              </p>
              <ul className="space-y-3">
                {[
                  'Customizable task boards with drag-and-drop',
                  'Priority levels and color coding',
                  'Due dates with reminders and notifications',
                  'Task dependencies and relationships',
                  'Custom fields for specialized tracking'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-10 bg-gray-100 dark:bg-gray-900 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4 h-64">
                    <div className="bg-indigo-100 dark:bg-gray-700 rounded p-3">
                      <div className="font-medium mb-2 text-indigo-600 dark:text-indigo-300">To Do</div>
                      <div className="space-y-2">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm">Research competitors</div>
                        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm">Create wireframes</div>
                        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm">User interviews</div>
                      </div>
                    </div>
                    <div className="bg-purple-100 dark:bg-gray-700 rounded p-3">
                      <div className="font-medium mb-2 text-purple-600 dark:text-purple-300">In Progress</div>
                      <div className="space-y-2">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm">Design system</div>
                        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm">Component library</div>
                      </div>
                    </div>
                    <div className="bg-green-100 dark:bg-gray-700 rounded p-3">
                      <div className="font-medium mb-2 text-green-600 dark:text-green-300">Completed</div>
                      <div className="space-y-2">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm">Project brief</div>
                        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm">Stakeholder meeting</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-1 md:order-2">
              <div className="inline-block bg-indigo-100 dark:bg-indigo-900 rounded-lg px-3 py-1 text-sm font-semibold text-indigo-600 dark:text-indigo-300 mb-4">
                Team Collaboration
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Work Together Seamlessly
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Bring your team together with powerful collaboration tools that keep everyone in sync. Comment on tasks, share files, and communicate in real-time.
              </p>
              <ul className="space-y-3">
                {[
                  'Real-time comments and @mentions',
                  'File sharing and document collaboration',
                  'Team chat and discussion threads',
                  'Video conferencing integration',
                  'Activity feeds and notification controls'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-2 md:order-1 bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-10 bg-gray-100 dark:bg-gray-900 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <div className="flex items-start mb-2">
                      <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        AS
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Alex Smith</div>
                        <div className="text-sm text-gray-500">Yesterday at 2:30 PM</div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      I&apos;ve updated the design mockups with the feedback from our client call. @Sarah could you review the changes?
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded text-sm">
                        mockup-v2.fig
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 ml-8">
                    <div className="flex items-start mb-2">
                      <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        SJ
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Sarah Johnson</div>
                        <div className="text-sm text-gray-500">Today at 9:15 AM</div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Looks great! I&apos;ve added some comments directly on the file. Let&apos;s schedule a quick call to discuss the navigation flow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-indigo-100 dark:bg-indigo-900 rounded-lg px-3 py-1 text-sm font-semibold text-indigo-600 dark:text-indigo-300 mb-4">
                Reporting & Analytics
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Data-Driven Decisions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Gain actionable insights with advanced reporting and analytics. Track progress, identify bottlenecks, and make informed decisions with customizable dashboards.
              </p>
              <ul className="space-y-3">
                {[
                  'Real-time progress tracking and burn-down charts',
                  'Customizable dashboards for different roles',
                  'Time tracking and resource allocation',
                  'Export options for reports and presentations',
                  'Predictive analytics for project timelines'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-10 bg-gray-100 dark:bg-gray-900 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Progress</h3>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 mb-2">
                      <div className="bg-indigo-500 h-4 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Start: May 1</span>
                      <span>65% Complete</span>
                      <span>Due: Aug 15</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-700 rounded p-3 shadow-sm">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Tasks Completed</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">27/42</div>
                      <div className="text-sm text-green-500">+5 this week</div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded p-3 shadow-sm">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Team Utilization</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">87%</div>
                      <div className="text-sm text-orange-500">+2% from last week</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Task Distribution</h3>
                    <div className="flex h-4 mb-2">
                      <div className="bg-green-500 h-4" style={{ width: '35%' }}></div>
                      <div className="bg-yellow-500 h-4" style={{ width: '40%' }}></div>
                      <div className="bg-red-500 h-4" style={{ width: '25%' }}></div>
                    </div>
                    <div className="flex text-xs justify-between">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-green-500 mr-1"></div>
                        <span className="text-gray-600 dark:text-gray-400">Completed</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-yellow-500 mr-1"></div>
                        <span className="text-gray-600 dark:text-gray-400">In Progress</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-red-500 mr-1"></div>
                        <span className="text-gray-600 dark:text-gray-400">At Risk</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              More Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover all the tools and capabilities that make ProjectPro the ultimate solution for modern project management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Automation',
                description: 'Automate repetitive tasks, workflows, and notifications to save time and reduce manual work.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                )
              },
              {
                title: 'Enterprise Security',
                description: 'Keep your data safe with advanced security features, role-based permissions, and SSO integration.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              },
              {
                title: 'Resource Management',
                description: 'Optimize workload distribution and resource allocation across projects and teams.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: 'Custom Workflows',
                description: 'Create tailored workflows that match your team\'s unique processes and requirements.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )
              },
              {
                title: 'Integrations',
                description: 'Connect with 150+ tools you already use including Slack, GitHub, Google Drive, and more.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'Mobile Access',
                description: 'Manage projects on the go with our powerful mobile apps for iOS and Android devices.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: 'Time Tracking',
                description: 'Track time spent on tasks and projects to optimize productivity and billing accuracy.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Project Templates',
                description: 'Save time with reusable project templates for common workflows and processes.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                )
              },
              {
                title: 'Goal Tracking',
                description: 'Set and track goals, OKRs, and milestones to keep your team aligned and motivated.',
                icon: (
                  <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <div className="bg-indigo-100 dark:bg-indigo-900 h-14 w-14 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
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
            <Link href="/pricing" className="bg-indigo-700 text-white hover:bg-indigo-800 border border-indigo-400 px-8 py-3 rounded-md font-medium text-lg inline-block">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 