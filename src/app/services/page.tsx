"use client";

import React from "react";

// Force dynamic rendering to prevent framer-motion SSG issues
export const dynamic = "force-dynamic";

import {
  ArrowForward,
  Assessment,
  Backup,
  CheckCircle,
  Cloud,
  Healing,
  Hub as Integration,
  LocalHospital,
  MedicalServices,
  PhoneAndroid as Mobile,
  Payment,
  Schedule,
  Security,
  SupportAgent as Support,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import { motion } from "framer-motion";

const services = [
  {
    id: "clinic",
    icon: LocalHospital,
    title: "Medical Clinic Software",
    subtitle: "Comprehensive Practice Management Solutions",
    description:
      "Complete software ecosystem designed specifically for medical clinics, from solo practitioners to multi-location practices. Our solutions streamline operations, improve patient care, and ensure regulatory compliance.",
    features: [
      "Electronic Health Records (EHR/EMR)",
      "Patient Portal & Communication",
      "Appointment Scheduling & Management",
      "Billing & Revenue Cycle Management",
      "Insurance Claims Processing",
      "Prescription Management",
      "Lab Results Integration",
      "Reporting & Analytics",
      "HIPAA Compliance Tools",
      "Mobile Access & Apps",
    ],
    benefits: [
      "Reduce administrative overhead by 40%",
      "Improve patient satisfaction scores",
      "Streamline billing and collections",
      "Enhance clinical decision-making",
      "Ensure regulatory compliance",
    ],
    color: "#0066CC",
  },
  {
    id: "dental",
    icon: Healing,
    title: "Dental Practice Management",
    subtitle: "Specialized Solutions for Dental Professionals",
    description:
      "Tailored software solutions designed specifically for dental practices. Integrate digital imaging, treatment planning, and practice management into one seamless platform.",
    features: [
      "Digital Imaging & X-Ray Integration",
      "Treatment Planning & Charting",
      "Appointment Scheduling",
      "Insurance & Claims Management",
      "Patient Communication Tools",
      "Inventory Management",
      "Financial Reporting",
      "Recall & Follow-up Systems",
      "HIPAA Compliance",
      "Multi-location Support",
    ],
    benefits: [
      "Improve treatment planning accuracy",
      "Reduce appointment no-shows by 30%",
      "Streamline insurance processing",
      "Enhance patient communication",
      "Optimize inventory management",
    ],
    color: "#00AA44",
  },
  {
    id: "hospital",
    icon: MedicalServices,
    title: "Hospital Management Systems",
    subtitle: "Enterprise-Level Healthcare Solutions",
    description:
      "Comprehensive hospital management systems designed for large healthcare institutions. Manage patient flow, resources, and clinical operations across multiple departments.",
    features: [
      "Patient Flow Management",
      "Resource Allocation & Scheduling",
      "Clinical Decision Support",
      "Department Integration",
      "Pharmacy Management",
      "Laboratory Information Systems",
      "Radiology & Imaging",
      "Emergency Department Management",
      "Quality Assurance & Reporting",
      "Interoperability Standards",
    ],
    benefits: [
      "Optimize patient flow and reduce wait times",
      "Improve resource utilization",
      "Enhance clinical outcomes",
      "Reduce medical errors",
      "Streamline interdepartmental communication",
    ],
    color: "#CC6600",
  },
  {
    id: "hipaa",
    icon: Security,
    title: "HIPAA Compliance Solutions",
    subtitle: "Comprehensive Security & Compliance Framework",
    description:
      "Complete HIPAA compliance solutions including security assessments, policy development, staff training, and ongoing monitoring to protect patient data.",
    features: [
      "Security Risk Assessments",
      "HIPAA Policy Development",
      "Staff Training Programs",
      "Audit Trail Management",
      "Breach Response Planning",
      "Business Associate Agreements",
      "Encryption & Data Protection",
      "Access Control Management",
      "Compliance Monitoring",
      "Incident Response Systems",
    ],
    benefits: [
      "Achieve full HIPAA compliance",
      "Reduce risk of data breaches",
      "Avoid costly penalties",
      "Build patient trust",
      "Streamline compliance processes",
    ],
    color: "#AA0066",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Infrastructure Solutions",
    subtitle: "Secure, Scalable Cloud Platforms",
    description:
      "HIPAA-compliant cloud infrastructure solutions with 99.9% uptime guarantee. Secure data storage, automatic backups, and disaster recovery.",
    features: [
      "HIPAA-Compliant Cloud Hosting",
      "Automatic Data Backups",
      "Disaster Recovery Planning",
      "Scalable Infrastructure",
      "24/7 Monitoring & Support",
      "Data Encryption at Rest & Transit",
      "Multi-factor Authentication",
      "Load Balancing & Optimization",
      "Compliance Reporting",
      "Migration Services",
    ],
    benefits: [
      "Reduce IT infrastructure costs",
      "Ensure 99.9% uptime",
      "Automatic scaling during peak times",
      "Enhanced data security",
      "Simplified compliance management",
    ],
    color: "#6600CC",
  },
  {
    id: "integration",
    icon: Integration,
    title: "System Integration Services",
    subtitle: "Seamless Healthcare System Connectivity",
    description:
      "Expert system integration services to connect disparate healthcare systems, improve data flow, and optimize workflows across your organization.",
    features: [
      "API Development & Integration",
      "HL7 & FHIR Standards",
      "Legacy System Modernization",
      "Data Migration Services",
      "Workflow Optimization",
      "Real-time Data Synchronization",
      "Third-party Integrations",
      "Custom Connector Development",
      "Testing & Quality Assurance",
      "Ongoing Support & Maintenance",
    ],
    benefits: [
      "Eliminate data silos",
      "Improve operational efficiency",
      "Reduce manual data entry",
      "Enhance data accuracy",
      "Streamline workflows",
    ],
    color: "#CC0066",
  },
];

const industries = [
  {
    id: "healthcare",
    title: "Healthcare & Medical",
    description: "HIPAA-compliant software solutions for medical practices, hospitals, and healthcare providers.",
    icon: LocalHospital,
    features: ["EHR/EMR Systems", "Patient Portals", "Telemedicine", "Medical Billing", "Compliance Tools"],
    color: "#0066CC",
  },
  {
    id: "real-estate", 
    title: "Real Estate",
    description: "Comprehensive property management and real estate CRM solutions for agents and brokers.",
    icon: MedicalServices,
    features: ["Property Management", "CRM Systems", "MLS Integration", "Transaction Management", "Lead Generation"],
    color: "#00AA44",
  },
  {
    id: "government",
    title: "Government Contracting",
    description: "Secure, compliant software solutions for government agencies and contractors.",
    icon: Security,
    features: ["Compliance Management", "Secure Communications", "Document Management", "Audit Trails", "Access Control"],
    color: "#CC6600",
  },
  {
    id: "education",
    title: "Schools & Municipalities",
    description: "Educational technology and municipal management systems for public institutions.",
    icon: Assessment,
    features: ["Student Information Systems", "Learning Management", "Municipal Services", "Public Portals", "Resource Management"],
    color: "#AA0066",
  },
  {
    id: "ai-hardware",
    title: "AI Hardware & Software Development",
    description: "Cutting-edge AI solutions and hardware integration for intelligent systems.",
    icon: Cloud,
    features: ["Machine Learning Models", "AI Integration", "Hardware Controls", "IoT Connectivity", "Predictive Analytics"],
    color: "#6600CC",
  },
  {
    id: "iot",
    title: "IoT & Industrial",
    description: "Internet of Things and industrial automation solutions for smart manufacturing.",
    icon: Integration,
    features: ["Sensor Integration", "Real-time Monitoring", "Predictive Maintenance", "Industrial Controls", "Data Analytics"],
    color: "#CC0066",
  },
  {
    id: "financial",
    title: "Financial Services & Banking",
    description: "Secure financial technology solutions with regulatory compliance and fraud protection.",
    icon: Payment,
    features: ["Payment Processing", "Risk Management", "Regulatory Compliance", "Mobile Banking", "Fraud Detection"],
    color: "#0066AA",
  },
  {
    id: "retail",
    title: "Retail & E-commerce",
    description: "Complete e-commerce platforms and retail management systems for online and brick-and-mortar stores.",
    icon: Assessment,
    features: ["E-commerce Platforms", "Inventory Management", "Point of Sale", "Customer Analytics", "Supply Chain"],
    color: "#CC9900",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Manufacturing execution systems and quality control solutions for production environments.",
    icon: Backup,
    features: ["Production Planning", "Quality Control", "Supply Chain Management", "Equipment Monitoring", "Compliance Tracking"],
    color: "#009966",
  },
  {
    id: "logistics",
    title: "Logistics & Transportation",
    description: "Transportation management and logistics optimization systems for efficient operations.",
    icon: Schedule,
    features: ["Fleet Management", "Route Optimization", "Tracking Systems", "Warehouse Management", "Delivery Analytics"],
    color: "#9900CC",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          py: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                level="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: "bold",
                  mb: 3,
                  background: "linear-gradient(45deg, #0066CC, #004499)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Healthcare Software Services
              </Typography>
              <Typography
                level="h4"
                sx={{
                  color: "neutral.600",
                  maxWidth: "800px",
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                Comprehensive software solutions tailored for medical practices, hospitals, and
                healthcare providers. HIPAA-compliant, secure, and designed for excellence.
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Services Grid */}
      <Box sx={{ py: 8, backgroundColor: "background.body" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {services.map((service, index) => (
              <Grid key={service.id} xs={12}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      p: 4,
                      "&:hover": {
                        boxShadow: "lg",
                        borderColor: service.color,
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={4}>
                        {/* Service Header */}
                        <Grid xs={12} md={4}>
                          <Box sx={{ mb: 3 }}>
                            <Box
                              sx={{
                                width: 80,
                                height: 80,
                                borderRadius: "16px",
                                backgroundColor: `${service.color}15`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 3,
                              }}
                            >
                              <service.icon sx={{ fontSize: 40, color: service.color }} />
                            </Box>
                            <Typography
                              level="h4"
                              sx={{ fontWeight: "bold", mb: 1, color: "neutral.800" }}
                            >
                              {service.title}
                            </Typography>
                            <Typography
                              level="title-md"
                              sx={{ color: service.color, mb: 2, fontWeight: "medium" }}
                            >
                              {service.subtitle}
                            </Typography>
                            <Typography
                              level="body-lg"
                              sx={{ color: "neutral.600", lineHeight: 1.6, mb: 3 }}
                            >
                              {service.description}
                            </Typography>
                            <Button
                              variant="solid"
                              endDecorator={<ArrowForward />}
                              sx={{
                                backgroundColor: service.color,
                                "&:hover": {
                                  backgroundColor: `${service.color}CC`,
                                },
                              }}
                            >
                              Learn More
                            </Button>
                          </Box>
                        </Grid>

                        {/* Features & Benefits */}
                        <Grid xs={12} md={8}>
                          <Grid container spacing={3}>
                            {/* Features */}
                            <Grid xs={12} sm={6}>
                              <Typography
                                level="title-md"
                                sx={{ fontWeight: "bold", mb: 2, color: "neutral.800" }}
                              >
                                Key Features
                              </Typography>
                              <List size="sm">
                                {service.features.map((feature) => (
                                  <ListItem key={feature}>
                                    <ListItemDecorator>
                                      <CheckCircle sx={{ fontSize: 16, color: service.color }} />
                                    </ListItemDecorator>
                                    <Typography level="body-sm" sx={{ color: "neutral.700" }}>
                                      {feature}
                                    </Typography>
                                  </ListItem>
                                ))}
                              </List>
                            </Grid>

                            {/* Benefits */}
                            <Grid xs={12} sm={6}>
                              <Typography
                                level="title-md"
                                sx={{ fontWeight: "bold", mb: 2, color: "neutral.800" }}
                              >
                                Key Benefits
                              </Typography>
                              <List size="sm">
                                {service.benefits.map((benefit) => (
                                  <ListItem key={benefit}>
                                    <ListItemDecorator>
                                      <CheckCircle sx={{ fontSize: 16, color: "success.500" }} />
                                    </ListItemDecorator>
                                    <Typography level="body-sm" sx={{ color: "neutral.700" }}>
                                      {benefit}
                                    </Typography>
                                  </ListItem>
                                ))}
                              </List>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Industries Section */}
      <Box sx={{ py: 8, backgroundColor: "neutral.50" }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                level="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: "bold",
                  mb: 3,
                  color: "neutral.800",
                }}
              >
                Industries We Serve
              </Typography>
              <Typography
                level="h4"
                sx={{
                  color: "neutral.600",
                  maxWidth: "800px",
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                Specialized software solutions tailored to meet the unique requirements and compliance needs of various industries.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {industries.map((industry, index) => (
              <Grid key={industry.id} xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      p: 3,
                      height: "100%",
                      "&:hover": {
                        boxShadow: "lg",
                        borderColor: industry.color,
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "12px",
                            backgroundColor: `${industry.color}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: 3,
                            flexShrink: 0,
                          }}
                        >
                          <industry.icon sx={{ fontSize: 30, color: industry.color }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            level="h4"
                            sx={{ fontWeight: "bold", mb: 1, color: "neutral.800" }}
                          >
                            {industry.title}
                          </Typography>
                          <Typography
                            level="body-lg"
                            sx={{ color: "neutral.600", lineHeight: 1.6, mb: 3 }}
                          >
                            {industry.description}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        level="title-md"
                        sx={{ fontWeight: "bold", mb: 2, color: "neutral.800" }}
                      >
                        Key Solutions
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {industry.features.map((feature) => (
                          <Chip
                            key={feature}
                            variant="soft"
                            size="sm"
                            sx={{
                              backgroundColor: `${industry.color}15`,
                              color: industry.color,
                              fontWeight: "medium",
                            }}
                          >
                            {feature}
                          </Chip>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #0066CC 0%, #004499 100%)",
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              level="h2"
              sx={{ fontWeight: "bold", mb: 3, color: "white" }}
            >
              Ready to Transform Your Business?
            </Typography>
            <Typography
              level="body-lg"
              sx={{ mb: 4, opacity: 0.9, maxWidth: "600px", mx: "auto" }}
            >
              Whether you need healthcare software, enterprise solutions, or industry-specific applications, we're here to help you succeed.
            </Typography>
            <Button
              component="a"
              href="/contact"
              variant="solid"
              size="lg"
              endDecorator={<ArrowForward />}
              sx={{
                backgroundColor: "white",
                color: "#0066CC",
                "&:hover": { backgroundColor: "#f8fafc" },
              }}
            >
              Get Started Today
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
