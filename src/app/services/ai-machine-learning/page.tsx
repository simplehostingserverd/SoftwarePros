import {
  Analytics,
  AutoAwesome,
  Chat,
  DataObject,
  Memory,
  ModelTraining,
  Psychology,
  SmartToy,
} from "@mui/icons-material";
import type { Metadata } from "next";
import Link from "next/link";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: "AI & Machine Learning Services - SoftwarePros | Custom AI Solutions",
  description:
    "Professional AI and machine learning development services including custom ML models, natural language processing, computer vision, and intelligent automation solutions.",
  openGraph: {
    title: "AI & Machine Learning Services - SoftwarePros",
    description: "Custom AI and machine learning solutions for businesses of all sizes.",
    url: "https://softwarepros.org/services/ai-machine-learning",
  },
};

interface AIService {
  icon: React.ElementType;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
}

const aiServices: AIService[] = [
  {
    icon: Memory,
    title: "Custom Machine Learning Models",
    description:
      "Tailored ML models designed to solve your specific business challenges and optimize operations.",
    technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "Python"],
    features: [
      "Predictive analytics",
      "Classification models",
      "Regression analysis",
      "Time series forecasting",
      "Model optimization",
    ],
  },
  {
    icon: Chat,
    title: "Natural Language Processing",
    description:
      "Advanced NLP solutions for text analysis, sentiment detection, and language understanding.",
    technologies: ["OpenAI GPT", "spaCy", "NLTK", "Transformers"],
    features: [
      "Text classification",
      "Sentiment analysis",
      "Language translation",
      "Chatbot development",
      "Document processing",
    ],
  },
  {
    icon: Psychology,
    title: "Computer Vision",
    description: "Intelligent image and video analysis solutions for automation and insights.",
    technologies: ["OpenCV", "TensorFlow Vision", "YOLO", "MediaPipe"],
    features: [
      "Object detection",
      "Image classification",
      "Facial recognition",
      "Quality control automation",
      "Medical imaging analysis",
    ],
  },
  {
    icon: SmartToy,
    title: "Intelligent Automation",
    description: "AI-powered automation systems to streamline workflows and reduce manual tasks.",
    technologies: ["RPA", "AI Workflows", "API Integration", "Cloud AI"],
    features: [
      "Process automation",
      "Intelligent routing",
      "Decision support systems",
      "Workflow optimization",
      "Real-time monitoring",
    ],
  },
  {
    icon: DataObject,
    title: "Data Analytics & Insights",
    description: "Transform your data into actionable insights with advanced analytics and AI.",
    technologies: ["Pandas", "NumPy", "Apache Spark", "Tableau"],
    features: [
      "Data preprocessing",
      "Statistical analysis",
      "Pattern recognition",
      "Anomaly detection",
      "Business intelligence",
    ],
  },
  {
    icon: ModelTraining,
    title: "MLOps & Model Deployment",
    description: "End-to-end ML pipeline management and scalable model deployment solutions.",
    technologies: ["MLflow", "Kubeflow", "Docker", "Kubernetes"],
    features: [
      "Model versioning",
      "Automated training",
      "Performance monitoring",
      "A/B testing",
      "Scalable deployment",
    ],
  },
];

const technologies: string[] = [
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "OpenAI API",
  "Hugging Face",
  "Python",
  "R",
  "Jupyter",
  "Pandas",
  "NumPy",
  "OpenCV",
  "spaCy",
  "NLTK",
  "Transformers",
  "Apache Spark",
  "MLflow",
  "Kubeflow",
  "Docker",
  "Kubernetes",
  "AWS SageMaker",
  "Google Cloud AI",
  "Azure ML",
  "FastAPI",
  "Flask",
];

export default function AIMachineLearningPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <AutoAwesome className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">AI & Machine Learning Services</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Harness the power of artificial intelligence to transform your business processes, gain
            competitive advantages, and unlock insights from your data.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Start Your AI Journey
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our AI & ML Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className="w-8 h-8 text-purple-400 mr-3" />
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-purple-600 text-xs rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-300">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
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

      {/* Use Cases Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Industry Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Analytics className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Healthcare</h3>
              <p className="text-gray-400">
                Medical imaging analysis, drug discovery, patient outcome prediction
              </p>
            </div>
            <div className="text-center">
              <DataObject className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Finance</h3>
              <p className="text-gray-400">
                Fraud detection, algorithmic trading, credit scoring, risk assessment
              </p>
            </div>
            <div className="text-center">
              <SmartToy className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Manufacturing</h3>
              <p className="text-gray-400">
                Quality control, predictive maintenance, supply chain optimization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Technologies & Frameworks</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors duration-300"
              >
                <span className="text-sm font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our AI Development Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your business needs and data landscape",
              },
              {
                step: "02",
                title: "Design",
                description: "Architecting the AI solution and selecting optimal algorithms",
              },
              {
                step: "03",
                title: "Development",
                description: "Building, training, and fine-tuning your AI models",
              },
              {
                step: "04",
                title: "Deployment",
                description: "Integrating AI solutions into your existing systems",
              },
            ].map((phase) => (
              <div key={phase.step} className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">{phase.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                <p className="text-gray-400">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Implement AI in Your Business?</h2>
          <p className="text-gray-400 mb-8">
            Let's explore how artificial intelligence can revolutionize your operations and drive
            unprecedented growth for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Schedule AI Consultation
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-3 border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white font-semibold rounded-lg transition-colors duration-300"
            >
              View AI Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
