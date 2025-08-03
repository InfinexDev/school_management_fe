import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiUser, HiDocumentText, HiChartBar, HiBell, HiCheckCircle, HiUpload, HiPencilAlt, HiUserGroup, HiSpeakerphone, HiCurrencyRupee, HiStar, HiAcademicCap, HiCalendar, HiLightBulb } from 'react-icons/hi';

const DashboardComponent = () => {
  const userRole = localStorage.getItem('userRole') || 'student'; 

  const dashboardContent = {
    student: {
      title: 'Welcome to Your Learning Hub, Student!',
      description: 'Empower your education with seamless access to assignments, progress tracking, and school updates.',
      cards: [
        { title: 'My Profile', path: '/profile', icon: <HiUser className="h-10 w-10 text-teal-600" />, description: 'Manage your personal details and preferences.' },
        { title: 'Assignments', path: '/study-materials', icon: <HiDocumentText className="h-10 w-10 text-teal-600" />, description: 'Access study materials and submit assignments.' },
        { title: 'Progress Reports', path: '/reports', icon: <HiChartBar className="h-10 w-10 text-teal-600" />, description: 'Track your academic performance.' },
        { title: 'Notifications', path: '/notifications', icon: <HiBell className="h-10 w-10 text-teal-600" />, description: 'Stay updated with school alerts.' },
      ],
      features: [
        { title: 'Effortless Assignment Management', description: 'Submit assignments, view deadlines, and access study resources anytime.', icon: <HiDocumentText className="h-8 w-8 text-teal-600" /> },
        { title: 'Track Your Progress', description: 'Monitor grades, attendance, and performance with detailed reports.', icon: <HiChartBar className="h-8 w-8 text-teal-600" /> },
        { title: 'Stay Informed', description: 'Receive instant notifications about exams, events, and more.', icon: <HiBell className="h-8 w-8 text-teal-600" /> },
        { title: 'Personalized Dashboard', description: 'Customized tools to enhance your learning experience.', icon: <HiAcademicCap className="h-8 w-8 text-teal-600" /> },
      ],
      quickLinks: [
        { title: 'View Assignments', path: '/study-materials' },
        { title: 'Check Reports', path: '/reports' },
        { title: 'Notifications', path: '/notifications' },
        { title: 'Update Profile', path: '/profile' },
      ],
      testimonials: [
        { quote: 'This platform has made studying so organized and stress-free!', author: 'Rahul Sharma, Student', avatar: '👨‍🎓' },
        { quote: 'I love how easy it is to track my progress and stay updated.', author: 'Priya Kumari, Student', avatar: '👩‍🎓' },
      ],
      whyChooseUs: [
        { title: 'User-Friendly Interface', description: 'Navigate with ease using our intuitive design.' },
        { title: '24/7 Access', description: 'Access your dashboard anytime, anywhere.' },
        { title: 'Secure Platform', description: 'Your data is protected with top-notch security.' },
      ],
      impact: [
        { title: 'Students Engaged', value: '1,200+', icon: <HiUser className="h-6 w-6 text-teal-600" /> },
        { title: 'Assignments Completed', value: '5,000+', icon: <HiDocumentText className="h-6 w-6 text-teal-600" /> },
        { title: 'Notifications Sent', value: '10,000+', icon: <HiBell className="h-6 w-6 text-teal-600" /> },
      ],
    },
    teacher: {
      title: 'Welcome, Teacher!',
      description: 'Streamline your teaching with tools for attendance, assignments, and student management.',
      cards: [
        { title: 'Mark Attendance', path: '/attendance', icon: <HiCheckCircle className="h-10 w-10 text-teal-600" />, description: 'Record student attendance digitally.' },
        { title: 'Upload Materials', path: '/study-materials', icon: <HiUpload className="h-10 w-10 text-teal-600" />, description: 'Share study materials and videos.' },
        { title: 'Grade Assignments', path: '/reports', icon: <HiPencilAlt className="h-10 w-10 text-teal-600" />, description: 'Evaluate student submissions.' },
        { title: 'Notifications', path: '/notifications', icon: <HiBell className="h-10 w-10 text-teal-600" />, description: 'Send and view notifications.' },
      ],
      features: [
        { title: 'Smart Attendance Tracking', description: 'Mark and manage attendance with a single click.', icon: <HiCheckCircle className="h-8 w-8 text-teal-600" /> },
        { title: 'Resource Sharing', description: 'Upload notes, videos, and assignments effortlessly.', icon: <HiUpload className="h-8 w-8 text-teal-600" /> },
        { title: 'Efficient Grading', description: 'Grade assignments and provide feedback quickly.', icon: <HiPencilAlt className="h-8 w-8 text-teal-600" /> },
        { title: 'Classroom Updates', description: 'Send announcements to keep students informed.', icon: <HiBell className="h-8 w-8 text-teal-600" /> },
      ],
      quickLinks: [
        { title: 'Mark Attendance', path: '/attendance' },
        { title: 'Upload Materials', path: '/study-materials' },
        { title: 'Grade Reports', path: '/reports' },
        { title: 'Send Notifications', path: '/notifications' },
      ],
      testimonials: [
        { quote: 'This system has saved me hours of administrative work!', author: 'Mrs. Sharma, Teacher', avatar: '👩‍🏫' },
        { quote: 'Uploading materials and grading is now a breeze.', author: 'Mr. Verma, Teacher', avatar: '👨‍🏫' },
      ],
      whyChooseUs: [
        { title: 'Time-Saving Tools', description: 'Automate routine tasks to focus on teaching.' },
        { title: 'Real-Time Insights', description: 'Track student progress instantly.' },
        { title: 'Easy Communication', description: 'Connect with students seamlessly.' },
      ],
      impact: [
        { title: 'Classes Managed', value: '150+', icon: <HiUserGroup className="h-6 w-6 text-teal-600" /> },
        { title: 'Materials Shared', value: '2,000+', icon: <HiUpload className="h-6 w-6 text-teal-600" /> },
        { title: 'Feedback Provided', value: '3,500+', icon: <HiPencilAlt className="h-6 w-6 text-teal-600" /> },
      ],
    },
    admin: {
      title: 'Welcome, Admin!',
      description: 'Take control of school operations with powerful management tools.',
      cards: [
        { title: 'Fee Structure', path: '/fees', icon: <HiCurrencyRupee className="h-10 w-10 text-teal-600" />, description: 'Configure and manage fees.' },
        // { title: 'Manage Users', path: '/users', icon: <HiUserGroup className="h-10 w-10 text-teal-600" />, description: 'Add or edit user accounts.' },
        { title: 'Promotions', path: '/promotions', icon: <HiSpeakerphone className="h-10 w-10 text-teal-600" />, description: 'Share announcements and media.' },
        { title: 'Reports', path: '/reports', icon: <HiChartBar className="h-10 w-10 text-teal-600" />, description: 'Generate performance reports.' },
      ],
      features: [
        { title: 'Fee Management', description: 'Set and monitor fee structures with ease.', icon: <HiCurrencyRupee className="h-8 w-8 text-teal-600" /> },
        // { title: 'User Administration', description: 'Manage student, teacher, and admin accounts.', icon: <HiUserGroup className="h-8 w-8 text-teal-600" /> },
        { title: 'Promotion Campaigns', description: 'Create and share school announcements.', icon: <HiSpeakerphone className="h-8 w-8 text-teal-600" /> },
        { title: 'Comprehensive Reports', description: 'Analyze school performance metrics.', icon: <HiChartBar className="h-8 w-8 text-teal-600" /> },
      ],
      quickLinks: [
        { title: 'Manage Fees', path: '/fees' },
        // { title: 'User Accounts', path: '/users' },
        { title: 'Promotions', path: '/promotions' },
        { title: 'View Reports', path: '/reports' },
      ],
      testimonials: [
        { quote: 'Managing our school has never been this efficient!', author: 'Admin Patel', avatar: '👨‍💼' },
        { quote: 'The promotion tools are a game-changer for outreach.', author: 'Admin Gupta', avatar: '👩‍💼' },
      ],
      whyChooseUs: [
        { title: 'Centralized Control', description: 'Manage all operations from one platform.' },
        { title: 'Scalable Solution', description: 'Adapts to schools of any size.' },
        { title: 'Data-Driven Decisions', description: 'Leverage reports for better planning.' },
      ],
      impact: [
        { title: 'Users Managed', value: '1,500+', icon: <HiUserGroup className="h-6 w-6 text-teal-600" /> },
        { title: 'Fees Processed', value: '₹10M+', icon: <HiCurrencyRupee className="h-6 w-6 text-teal-600" /> },
        { title: 'Announcements Shared', value: '500+', icon: <HiSpeakerphone className="h-6 w-6 text-teal-600" /> },
      ],
    },
  };

  const { title, description, cards, features, quickLinks, testimonials, whyChooseUs, impact } = dashboardContent[userRole] || dashboardContent.student;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/wave-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight animate-fade-in">{title}</h1>
          <p className="mt-4 text-lg md:text-xl text-teal-100 animate-slide-up">{description}</p>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Dashboard Cards */}
       <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${userRole === 'admin' ? '3' : '4'} gap-6 mb-12`}>
          {cards.map((card, index) => (
            <NavLink
              key={index}
              to={card.path}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-b-4 border-teal-600"
            >
              <div className="flex items-center space-x-4 mb-3">
                {card.icon}
                <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{card.description}</p>
            </NavLink>
          ))}
        </div>

        {/* Project Overview */}
        <div className="mb-12 bg-gradient-to-br from-white to-teal-50 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">About Our School Management System</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our School Management System is a revolutionary platform designed to simplify and enhance every aspect of school operations. 
            From managing student records to streamlining fee payments, our system empowers students, teachers, and admins to focus on what matters most—education. 
            Our mission is to create a connected, efficient, and engaging educational environment for all stakeholders.
          </p>
          <div className="flex justify-center">
            <NavLink
              to="/home"
              className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300"
            >
              Explore More
            </NavLink>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center animate-fade-in">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-teal-50 p-6 rounded-xl shadow-md hover:shadow-sm transition-all duration-300 transform border-l-4 border-teal-600"
              >
                <div className="flex items-center space-x-3 mb-3">
                  {feature.icon}
                  <h3 className="text-lg font-semibold text-teal-800">{feature.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12 bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center animate-fade-in">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4"
              >
                <HiLightBulb className="h-10 w-10 text-teal-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Impact */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center animate-fade-in">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {impact.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-center border-t-4 border-teal-600"
              >
                {item.icon}
                <p className="text-3xl font-bold text-teal-600 mt-3">{item.value}</p>
                <p className="text-sm text-gray-600 mt-2">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center animate-fade-in">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-600 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">{testimonial.avatar}</span>
                  <div>
                    <p className="text-sm font-semibold text-teal-600">{testimonial.author}</p>
                    <div className="flex">
                      <HiStar className="h-5 w-5 text-yellow-400" />
                      <HiStar className="h-5 w-5 text-yellow-400" />
                      <HiStar className="h-5 w-5 text-yellow-400" />
                      <HiStar className="h-5 w-5 text-yellow-400" />
                      <HiStar className="h-5 w-5 text-yellow-400" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-12 bg-gradient-to-br from-white to-teal-50 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center animate-fade-in">Quick Links</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {quickLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform"
              >
                {link.title}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind Animation Styles */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 1s ease-in-out;
          }
          .animate-slide-up {
            animation: slideUp 1s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default DashboardComponent;