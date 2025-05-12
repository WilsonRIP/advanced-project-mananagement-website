import React from 'react';
import Link from 'next/link';

export default function Pricing() {
  const pricingTiers = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for individuals and small projects',
      features: [
        'Up to 3 projects',
        'Basic task management',
        'Limited team collaboration',
        '2 team members',
        '5GB storage',
        'Email support'
      ],
      cta: 'Get Started',
      ctaLink: '/signup',
      highlighted: false
    },
    {
      name: 'Pro',
      price: '15',
      description: 'For growing teams with advanced needs',
      features: [
        'Unlimited projects',
        'Advanced task management',
        'Full team collaboration',
        '10 team members',
        '50GB storage',
        'Priority email support',
        'Time tracking',
        'Basic reporting'
      ],
      cta: 'Start Free Trial',
      ctaLink: '/signup?plan=pro',
      highlighted: true
    },
    {
      name: 'Business',
      price: '39',
      description: 'For organizations requiring enterprise features',
      features: [
        'Everything in Pro',
        'Unlimited team members',
        '500GB storage',
        'Advanced reporting & analytics',
        'Admin dashboard',
        'Security controls',
        'API access',
        'Phone support & SLA',
        'Training sessions'
      ],
      cta: 'Start Free Trial',
      ctaLink: '/signup?plan=business',
      highlighted: false
    }
  ];

  const featureComparison = [
    { 
      category: 'Core Features',
      features: [
        { name: 'Projects', free: '3', pro: 'Unlimited', business: 'Unlimited' },
        { name: 'Tasks', free: 'Unlimited', pro: 'Unlimited', business: 'Unlimited' },
        { name: 'Team Members', free: '2', pro: '10', business: 'Unlimited' },
        { name: 'Storage', free: '5GB', pro: '50GB', business: '500GB' },
      ]
    },
    {
      category: 'Task Management',
      features: [
        { name: 'Task Assignment', free: '✓', pro: '✓', business: '✓' },
        { name: 'Due Dates', free: '✓', pro: '✓', business: '✓' },
        { name: 'Task Dependencies', free: '—', pro: '✓', business: '✓' },
        { name: 'Recurring Tasks', free: '—', pro: '✓', business: '✓' },
        { name: 'Subtasks', free: 'Limited', pro: '✓', business: '✓' },
        { name: 'Custom Fields', free: '—', pro: '5', business: 'Unlimited' },
      ]
    },
    {
      category: 'Views',
      features: [
        { name: 'List View', free: '✓', pro: '✓', business: '✓' },
        { name: 'Board View', free: '✓', pro: '✓', business: '✓' },
        { name: 'Calendar View', free: '—', pro: '✓', business: '✓' },
        { name: 'Gantt Chart', free: '—', pro: '✓', business: '✓' },
        { name: 'Timeline View', free: '—', pro: '—', business: '✓' },
      ]
    },
    {
      category: 'Collaboration',
      features: [
        { name: 'Comments', free: '✓', pro: '✓', business: '✓' },
        { name: 'File Sharing', free: 'Basic', pro: 'Advanced', business: 'Advanced' },
        { name: '@mentions', free: '—', pro: '✓', business: '✓' },
        { name: 'Real-time Editing', free: '—', pro: '✓', business: '✓' },
      ]
    },
    {
      category: 'Reporting',
      features: [
        { name: 'Basic Reports', free: '—', pro: '✓', business: '✓' },
        { name: 'Custom Dashboards', free: '—', pro: 'Limited', business: 'Advanced' },
        { name: 'Time Tracking', free: '—', pro: '✓', business: '✓' },
        { name: 'Resource Management', free: '—', pro: '—', business: '✓' },
        { name: 'Export Reports', free: '—', pro: '✓', business: '✓' },
      ]
    },
    {
      category: 'Security & Support',
      features: [
        { name: 'Two-Factor Authentication', free: '—', pro: '✓', business: '✓' },
        { name: 'SSO Integration', free: '—', pro: '—', business: '✓' },
        { name: 'Role-Based Permissions', free: 'Basic', pro: 'Advanced', business: 'Enterprise' },
        { name: 'Audit Logs', free: '—', pro: '—', business: '✓' },
        { name: 'Support', free: 'Email', pro: 'Priority Email', business: 'Phone & Email' },
        { name: 'SLA', free: '—', pro: '—', business: '✓' },
      ]
    },
  ];

  return (
    <div className="pt-8 pb-16">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the perfect plan for your team. All plans include a 14-day free trial with no credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`
                bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden
                ${tier.highlighted ? 'border-4 border-indigo-500 dark:border-indigo-400 transform scale-105 md:scale-110 z-10' : 'border border-gray-200 dark:border-gray-700'}
              `}>
                <div className={`
                  px-6 py-8 border-b border-gray-200 dark:border-gray-700
                  ${tier.highlighted ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}
                `}>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-5xl font-extrabold text-gray-900 dark:text-white">${tier.price}</span>
                    <span className="ml-1 text-xl text-gray-500 dark:text-gray-400">/mo per user</span>
                  </div>
                  <p className="mt-5 text-lg text-gray-500 dark:text-gray-400">{tier.description}</p>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <ul className="space-y-4">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      href={tier.ctaLink}
                      className={`w-full flex justify-center py-3 px-4 rounded-md shadow text-sm font-medium 
                        ${tier.highlighted
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          : 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-600 border border-indigo-500'
                        }
                      `}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Compare Features by Plan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find the plan that best suits your needs. All plans can be upgraded or downgraded at any time.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Features
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Free
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-lg font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Pro
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Business
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {featureComparison.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td colSpan={4} className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature, featureIndex) => (
                      <tr key={featureIndex} className={featureIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {feature.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                          {feature.free}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-gray-700 dark:text-gray-300 bg-indigo-50 dark:bg-indigo-900/10">
                          {feature.pro}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                          {feature.business}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have questions? We&apos;ve got you covered.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: 'Can I change plans later?',
                answer: 'Yes, you can upgrade, downgrade, or cancel your plan at any time. If you upgrade, the new features will be instantly available. If you downgrade, the changes will take effect at the end of your current billing cycle.'
              },
              {
                question: 'Is there a contract or commitment?',
                answer: 'No, all our plans are on a month-to-month basis. You can cancel anytime without penalty. For annual plans, we offer a 30-day money-back guarantee.'
              },
              {
                question: 'What happens when my trial ends?',
                answer: 'After your 14-day free trial, you&apos;ll be asked to select a plan. If you don&apos;t choose a paid plan, your account will automatically switch to the Free plan with limited features. Don&apos;t worry – your data will be preserved.'
              },
              {
                question: 'Do you offer discounts for non-profits or educational institutions?',
                answer: 'Yes, we offer special discounts for non-profit organizations, educational institutions, and startups. Please contact our sales team for more information.'
              },
              {
                question: 'How secure is my data?',
                answer: 'ProjectPro takes security seriously. We use industry-standard encryption, regular security audits, and strict access controls. The Business plan includes additional security features like SSO integration and detailed audit logs.'
              },
              {
                question: 'Can I request a custom plan for my enterprise?',
                answer: 'Absolutely! For larger teams or specialized requirements, we offer custom enterprise plans. Please contact our sales team to discuss your specific needs and get a tailored quote.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
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
            Ready to get started with ProjectPro?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of teams already using ProjectPro to streamline their project management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/signup" className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-md font-medium text-lg inline-block">
              Start Your Free Trial
            </Link>
            <Link href="/contact" className="bg-indigo-700 text-white hover:bg-indigo-800 border border-indigo-400 px-8 py-3 rounded-md font-medium text-lg inline-block">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 