"use client";

import {
  Android,
  Apple,
  ArrowForward,
  CheckCircle,
  Cloud,
  PhoneAndroid,
  Security,
  Speed,
  Sync,
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
import Link from "next/link";
import React from "react";

const mobileServices = [
  {
    id: "native-ios",
    icon: Apple,
    title: "Native iOS Development",
    description:
      "High-performance iOS applications built with Swift and SwiftUI for optimal user experience.",
    features: [
      "Swift & SwiftUI development",
      "App Store optimization",
      "iOS design guidelines",
      "Core Data integration",
      "Push notifications",
      "Apple Pay integration",
    ],
    color: "#000000",
  },
  {
    id: "native-android",
    icon: Android,
    title: "Native Android Development",
    description:
      "Robust Android applications using Kotlin and modern Android development practices.",
    features: [
      "Kotlin & Jetpack Compose",
      "Google Play Store optimization",
      "Material Design guidelines",
      "Room database",
      "Firebase integration",
      "Google Pay integration",
    ],
    color: "#3DDC84",
  },
  {
    id: "cross-platform",
    icon: PhoneAndroid,
    title: "Cross-Platform Development",
    description:
      "Build once, deploy everywhere with React Native and Flutter for maximum efficiency.",
    features: [
      "React Native & Flutter",
      "Shared codebase",
      "Platform-specific optimizations",
      "Native module integration",
      "Hot reload development",
      "Code sharing with web",
    ],
    color: "#0066CC",
  },
  {
    id: "pwa",
    icon: Cloud,
    title: "Progressive Web Apps",
    description:
      "App-like experiences that work on any device with offline capabilities and push notifications.",
    features: [
      "Offline functionality",
      "Push notifications",
      "App store distribution",
      "Responsive design",
      "Fast loading times",
      "Automatic updates",
    ],
    color: "#00AA44",
  },
  {
    id: "backend",
    icon: Sync,
    title: "Mobile Backend Services",
    description:
      "Scalable backend infrastructure with APIs, databases, and cloud services for your mobile apps.",
    features: [
      "RESTful & GraphQL APIs",
      "Real-time synchronization",
      "User authentication",
      "Cloud database",
      "File storage & CDN",
      "Analytics & monitoring",
    ],
    color: "#CC6600",
  },
  {
    id: "maintenance",
    icon: Security,
    title: "App Maintenance & Support",
    description:
      "Ongoing maintenance, updates, and support to keep your mobile applications running smoothly.",
    features: [
      "Regular security updates",
      "Performance monitoring",
      "Bug fixes & improvements",
      "OS compatibility updates",
      "Feature enhancements",
      "24/7 technical support",
    ],
    color: "#AA0066",
  },
];

const appTypes = [
  "Business & Productivity",
  "Healthcare & Medical",
  "E-commerce & Retail",
  "Education & Training",
  "Finance & Banking",
  "Real Estate",
  "IoT & Smart Devices",
  "Government & Municipal",
];

const technologies = [
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "Firebase",
  "AWS Amplify",
  "MongoDB",
  "PostgreSQL",
  "Node.js",
  "GraphQL",
  "WebRTC",
  "Socket.io",
];

export default function MobileDevelopmentPage() {
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
                Mobile App Development
              </Typography>
              <Typography
                level="h4"
                sx={{
                  color: "neutral.600",
                  maxWidth: "800px",
                  mx: "auto",
                  lineHeight: 1.6,
                  mb: 4,
                }}
              >
                Transform your business with custom mobile applications. We build native iOS,
                Android, and cross-platform apps that engage users and drive results.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  component={Link}
                  href="/contact"
                  variant="solid"
                  size="lg"
                  endDecorator={<ArrowForward />}
                  sx={{ backgroundColor: "#0066CC" }}
                >
                  Start Your App Project
                </Button>
                <Button
                  component={Link}
                  href="/portfolio"
                  variant="outlined"
                  size="lg"
                  sx={{ borderColor: "#0066CC", color: "#0066CC" }}
                >
                  View Mobile Portfolio
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Services Grid */}
      <Box sx={{ py: 8, backgroundColor: "background.body" }}>
        <Container maxWidth="lg">
          <Typography
            level="h2"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 6,
              color: "neutral.800",
            }}
          >
            Mobile Development Services
          </Typography>
          <Grid container spacing={4}>
            {mobileServices.map((service, index) => (
              <Grid key={service.id} xs={12} md={6}>
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
                        borderColor: service.color,
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "12px",
                          backgroundColor: `${service.color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 3,
                        }}
                      >
                        <service.icon sx={{ fontSize: 30, color: service.color }} />
                      </Box>
                      <Typography
                        level="h4"
                        sx={{ fontWeight: "bold", mb: 2, color: "neutral.800" }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        level="body-lg"
                        sx={{ color: "neutral.600", lineHeight: 1.6, mb: 3 }}
                      >
                        {service.description}
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
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Development Process */}
      <Box sx={{ py: 8, backgroundColor: "neutral.50" }}>
        <Container maxWidth="lg">
          <Typography
            level="h2"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 6,
              color: "neutral.800",
            }}
          >
            Our Mobile Development Process
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                description:
                  "We analyze your requirements, target audience, and business goals to create a comprehensive development strategy.",
              },
              {
                step: "02",
                title: "UI/UX Design",
                description:
                  "Create intuitive, engaging designs that follow platform guidelines and provide exceptional user experiences.",
              },
              {
                step: "03",
                title: "Development",
                description:
                  "Build your app using modern frameworks and best practices, with regular updates and testing throughout.",
              },
              {
                step: "04",
                title: "Testing & QA",
                description:
                  "Comprehensive testing across devices and platforms to ensure optimal performance and reliability.",
              },
              {
                step: "05",
                title: "App Store Launch",
                description:
                  "Handle the entire app store submission process and optimize for maximum visibility and downloads.",
              },
              {
                step: "06",
                title: "Support & Updates",
                description:
                  "Ongoing maintenance, updates, and feature enhancements to keep your app competitive and secure.",
              },
            ].map((process, index) => (
              <Grid key={process.step} xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        backgroundColor: "#0066CC",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      {process.step}
                    </Box>
                    <Typography level="h4" sx={{ fontWeight: "bold", mb: 2, color: "neutral.800" }}>
                      {process.title}
                    </Typography>
                    <Typography level="body-lg" sx={{ color: "neutral.600", lineHeight: 1.6 }}>
                      {process.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* App Types */}
      <Box sx={{ py: 8, backgroundColor: "background.body" }}>
        <Container maxWidth="lg">
          <Typography
            level="h2"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 2,
              color: "neutral.800",
            }}
          >
            Types of Mobile Apps We Build
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              textAlign: "center",
              color: "neutral.600",
              maxWidth: "600px",
              mx: "auto",
              mb: 6,
            }}
          >
            From simple utility apps to complex enterprise solutions, we have experience across all
            industries and app categories.
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
            {appTypes.map((type) => (
              <Chip
                key={type}
                variant="soft"
                size="lg"
                sx={{ backgroundColor: "#0066CC15", color: "#0066CC" }}
              >
                {type}
              </Chip>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Technologies */}
      <Box sx={{ py: 8, backgroundColor: "neutral.50" }}>
        <Container maxWidth="lg">
          <Typography
            level="h2"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 2,
              color: "neutral.800",
            }}
          >
            Mobile Technologies & Frameworks
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              textAlign: "center",
              color: "neutral.600",
              maxWidth: "600px",
              mx: "auto",
              mb: 6,
            }}
          >
            We use cutting-edge technologies and frameworks to build fast, scalable, and
            maintainable mobile applications.
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
            {technologies.map((tech) => (
              <Chip
                key={tech}
                variant="outlined"
                size="lg"
                sx={{ borderColor: "#0066CC", color: "#0066CC" }}
              >
                {tech}
              </Chip>
            ))}
          </Box>
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
            <Typography level="h2" sx={{ fontWeight: "bold", mb: 3, color: "white" }}>
              Ready to Build Your Mobile App?
            </Typography>
            <Typography level="body-lg" sx={{ mb: 4, opacity: 0.9, maxWidth: "600px", mx: "auto" }}>
              Let's turn your mobile app idea into reality. Contact us to discuss your project and
              get a free consultation.
            </Typography>
            <Button
              component={Link}
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
              Start Your Mobile Project
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
