"use client";

import {
  ArrowForward,
  CheckCircle,
  Code,
  DesignServices,
  Language,
  PhoneAndroid,
  Search,
  Security,
  Speed,
  Storage,
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

const webServices = [
  {
    id: "custom-web",
    icon: Code,
    title: "Custom Web Applications",
    description:
      "Tailored web applications built from the ground up to meet your specific business requirements.",
    features: [
      "Full-stack development",
      "Custom business logic",
      "Database design & optimization",
      "API development & integration",
      "User authentication & authorization",
      "Real-time features",
    ],
    color: "#0066CC",
  },
  {
    id: "responsive",
    icon: PhoneAndroid,
    title: "Responsive Web Design",
    description:
      "Mobile-first designs that look and perform flawlessly across all devices and screen sizes.",
    features: [
      "Mobile-first approach",
      "Cross-browser compatibility",
      "Optimized performance",
      "Touch-friendly interfaces",
      "Progressive Web App (PWA)",
      "Accessibility compliance",
    ],
    color: "#00AA44",
  },
  {
    id: "ecommerce",
    icon: Storage,
    title: "E-commerce Solutions",
    description:
      "Complete online stores with payment processing, inventory management, and customer analytics.",
    features: [
      "Shopping cart & checkout",
      "Payment gateway integration",
      "Inventory management",
      "Order tracking",
      "Customer accounts",
      "Analytics & reporting",
    ],
    color: "#CC6600",
  },
  {
    id: "cms",
    icon: DesignServices,
    title: "Content Management Systems",
    description:
      "Easy-to-use content management systems that empower you to update your website independently.",
    features: [
      "User-friendly admin panels",
      "WYSIWYG editors",
      "Media management",
      "SEO optimization tools",
      "Multi-user permissions",
      "Version control",
    ],
    color: "#AA0066",
  },
  {
    id: "performance",
    icon: Speed,
    title: "Performance Optimization",
    description:
      "Speed up your existing websites with modern optimization techniques and best practices.",
    features: [
      "Core Web Vitals optimization",
      "Image optimization",
      "Code splitting & lazy loading",
      "CDN implementation",
      "Database optimization",
      "Caching strategies",
    ],
    color: "#6600CC",
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO & Digital Marketing",
    description:
      "Improve your online visibility with technical SEO, content optimization, and digital marketing.",
    features: [
      "Technical SEO audits",
      "On-page optimization",
      "Schema markup",
      "Google Analytics setup",
      "Conversion optimization",
      "Local SEO",
    ],
    color: "#CC0066",
  },
];

const industries = [
  "Healthcare & Medical",
  "Real Estate",
  "Government Contracting",
  "Educational Institutions",
  "Financial Services & Banking",
  "Retail & E-commerce",
  "Manufacturing",
  "Logistics & Transportation",
];

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PHP",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
];

export default function WebDevelopmentPage() {
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
                Web Development Services
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
                Professional web development solutions that drive business growth. From custom
                applications to e-commerce platforms, we build modern, scalable, and secure web
                experiences.
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
                  Start Your Project
                </Button>
                <Button
                  component={Link}
                  href="/portfolio"
                  variant="outlined"
                  size="lg"
                  sx={{ borderColor: "#0066CC", color: "#0066CC" }}
                >
                  View Portfolio
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
            Our Web Development Services
          </Typography>
          <Grid container spacing={4}>
            {webServices.map((service, index) => (
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

      {/* Industries We Serve */}
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
            Industries We Serve
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
            We have experience building web solutions across various industries, understanding
            unique requirements and compliance needs.
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
            {industries.map((industry) => (
              <Chip
                key={industry}
                variant="soft"
                size="lg"
                sx={{ backgroundColor: "#0066CC15", color: "#0066CC" }}
              >
                {industry}
              </Chip>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Technologies */}
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
            Technologies We Use
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
            We stay current with the latest technologies to deliver modern, efficient, and scalable
            web solutions.
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
              Ready to Build Your Web Solution?
            </Typography>
            <Typography level="body-lg" sx={{ mb: 4, opacity: 0.9, maxWidth: "600px", mx: "auto" }}>
              Let's discuss your project requirements and create a web solution that drives your
              business forward.
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
              Get Started Today
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
