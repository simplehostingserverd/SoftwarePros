import {
  Apple,
  CloudSync,
  Notifications,
  PhoneAndroid,
  Security,
  Speed,
  Store,
  Tablet,
} from '@mui/icons-material';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mobile App Development - SoftwarePros | iOS & Android Apps',
  description:
    'Professional mobile app development services for iOS and Android. Native apps, cross-platform solutions, and progressive web apps for healthcare and enterprise.',
  openGraph: {
    title: 'Mobile App Development - SoftwarePros',
    description: 'Custom mobile applications for iOS and Android platforms.',
    url: 'https://softwarepros.org/services/mobile-apps',
  },
};

interface MobileService {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  platforms: string[];
  features: string[];
}

const mobileServices: MobileService[] = [
  {
    icon: PhoneAndroid,
    title: 'Native Android Apps',
    description: 'High-performance native Android applications with platform-specific features.',
    platforms: ['Android', 'Google Play Store'],
    features: [
      'Material Design UI',
      'Android-specific features',
      'Optimized performance',
      'Google services integration',
      'Play Store optimization',
    ],
  },
  {
    icon: Apple,
    title: 'Native iOS Apps',
    description: "Elegant iOS applications following Apple's design guidelines and best practices.",
    platforms: ['iOS', 'App Store'],
    features: [
      'Human Interface Guidelines',
      'iOS-specific features',
      'Core Data integration',
      'Apple services integration',
      'App Store optimization',
    ],
  },
  {
    icon: Tablet,
    title: 'Cross-Platform Apps',
    description: 'Cost-effective cross-platform solutions using React Native and Flutter.',
    platforms: ['React Native', 'Flutter', 'Expo'],
    features: [
      'Single codebase',
      'Native performance',
      'Platform-specific UI',
      'Shared business logic',
      'Faster development',
    ],
  },
  {
    icon: CloudSync,
    title: 'Backend Integration',
    description: 'Seamless integration with cloud services and backend systems.',
    platforms: ['REST APIs', 'GraphQL', 'Firebase'],
    features: [
      'Real-time data sync',
      'Offline functionality',
      'Cloud storage',
      'User authentication',
      'Push notifications',
    ],
  },
  {
    icon: Security,
    title: 'Healthcare Mobile Apps',
    description: 'HIPAA-compliant mobile applications for healthcare providers and patients.',
    platforms: ['HIPAA Compliant', 'Healthcare APIs'],
    features: [
      'Patient data security',
      'Telemedicine features',
      'EHR integration',
      'Appointment scheduling',
      'Secure messaging',
    ],
  },
  {
    icon: Store,
    title: 'Enterprise Mobile Solutions',
    description: 'Custom mobile applications for enterprise workflows and productivity.',
    platforms: ['Enterprise MDM', 'Corporate App Stores'],
    features: [
      'Employee productivity',
      'Workflow automation',
      'Data visualization',
      'Offline capabilities',
      'Enterprise security',
    ],
  },
];

const technologies: string[] = [
  'React Native',
  'Flutter',
  'Swift',
  'Kotlin',
  'Java',
  'Dart',
  'Expo',
  'Xamarin',
  'Ionic',
  'Cordova',
  'Firebase',
  'AWS Amplify',
  'Redux',
  'MobX',
  'SQLite',
  'Realm',
  'Core Data',
  'Room',
];

const appFeatures: string[] = [
  'Push Notifications',
  'Offline Functionality',
  'Real-time Sync',
  'Biometric Authentication',
  'Camera Integration',
  'GPS & Location Services',
  'Payment Processing',
  'Social Media Integration',
  'Analytics & Tracking',
  'In-App Purchases',
  'Chat & Messaging',
  'File Upload/Download',
];

export default function MobileAppsPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <PhoneAndroid className="w-16 h-16 text-green-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Mobile App Development</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Transform your ideas into powerful mobile applications. Native iOS, Android, and
            cross-platform solutions for any business need.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Start Your App Project
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Mobile Development Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mobileServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className="w-8 h-8 text-green-400 mr-3" />
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Platforms:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.platforms.map((platform, platformIndex) => (
                        <span
                          key={platformIndex}
                          className="px-2 py-1 bg-green-600 text-xs rounded-full"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Mobile Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition-colors duration-300"
              >
                <span className="text-sm font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">App Features We Implement</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {appFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-750 transition-colors duration-300"
              >
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Launch Your Mobile App?</h2>
          <p className="text-gray-400 mb-8">
            From concept to app store, we'll guide you through every step of mobile app development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Get App Quote
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-3 border border-green-600 text-green-400 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-colors duration-300"
            >
              View Mobile Apps
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

