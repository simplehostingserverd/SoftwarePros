'use client';

import React from 'react';

// Force dynamic rendering to prevent framer-motion SSG issues
export const dynamic = 'force-dynamic';

import {
  Business,
  CheckCircle,
  Healing,
  LocalHospital,
  MedicalServices,
  FormatQuote as Quote,
  Security,
  Speed,
  TrendingUp,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from '@mui/joy';
import { Rating } from '@mui/material';
import { motion } from 'framer-motion';

const caseStudies = [
  {
    title: 'Regional Medical Center - Complete EHR Implementation',
    client: 'Regional Medical Center',
    type: 'Hospital System',
    industry: 'Multi-Specialty Hospital',
    challenge:
      'Legacy paper-based system causing inefficiencies, compliance issues, and poor patient experience.',
    solution:
      'Implemented comprehensive EHR system with patient portal, automated billing, and clinical decision support.',
    results: [
      '60% reduction in patient wait times',
      '40% improvement in billing accuracy',
      '99.9% system uptime achieved',
      'Full HIPAA compliance certification',
      '85% increase in patient satisfaction',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'HL7 FHIR'],
    duration: '8 months',
    teamSize: '12 developers',
    icon: LocalHospital,
    color: '#0066CC',
  },
  {
    title: 'Dental Excellence Group - Multi-Location Practice Management',
    client: 'Dental Excellence Group',
    type: 'Dental Practice',
    industry: 'Multi-Location Dental Chain',
    challenge: 'Managing 15 dental locations with inconsistent systems and poor data visibility.',
    solution:
      'Unified practice management system with centralized reporting, digital imaging integration, and automated scheduling.',
    results: [
      '50% reduction in administrative overhead',
      '30% decrease in appointment no-shows',
      '25% increase in treatment acceptance rates',
      'Centralized reporting across all locations',
      '95% staff adoption rate',
    ],
    technologies: ['Vue.js', 'Python', 'MySQL', 'Azure', 'DICOM'],
    duration: '6 months',
    teamSize: '8 developers',
    icon: Healing,
    color: '#00AA44',
  },
  {
    title: 'Metro Clinic Network - Telemedicine Platform',
    client: 'Metro Clinic Network',
    type: 'Clinic Network',
    industry: 'Primary Care Clinics',
    challenge:
      'Need for remote patient consultations and virtual care capabilities during pandemic.',
    solution:
      'Custom telemedicine platform with video consultations, remote monitoring, and integrated EHR.',
    results: [
      '300% increase in patient consultations',
      '90% patient satisfaction with virtual visits',
      'Maintained continuity of care during lockdowns',
      'Expanded service area by 200%',
      'Reduced overhead costs by 35%',
    ],
    technologies: ['React Native', 'WebRTC', 'Node.js', 'MongoDB', 'AWS'],
    duration: '4 months',
    teamSize: '10 developers',
    icon: MedicalServices,
    color: '#CC6600',
  },
];

const testimonials = [
  {
    name: 'Dr. Sarah Johnson',
    title: 'Chief Medical Officer',
    company: 'Regional Medical Center',
    avatar: 'SJ',
    rating: 5,
    testimonial:
      'Software Pros transformed our entire healthcare delivery system. The EHR implementation was seamless, and the ongoing support has been exceptional. Our patient satisfaction scores have never been higher.',
  },
  {
    name: 'Dr. Michael Chen',
    title: 'Practice Owner',
    company: 'Dental Excellence Group',
    avatar: 'MC',
    rating: 5,
    testimonial:
      'The practice management system has revolutionized how we operate across our 15 locations. Real-time reporting and centralized management have improved our efficiency tremendously.',
  },
  {
    name: 'Dr. Emily Rodriguez',
    title: 'Medical Director',
    company: 'Metro Clinic Network',
    avatar: 'ER',
    rating: 5,
    testimonial:
      'The telemedicine platform allowed us to continue serving our patients during the most challenging times. The technology is robust, secure, and user-friendly for both staff and patients.',
  },
  {
    name: 'James Wilson',
    title: 'IT Director',
    company: 'Coastal Healthcare System',
    avatar: 'JW',
    rating: 5,
    testimonial:
      "Software Pros' HIPAA compliance solutions gave us peace of mind. Their thorough approach to security and ongoing monitoring has protected our organization from potential breaches.",
  },
];

const stats = [
  { number: '500+', label: 'Healthcare Clients Served' },
  { number: '1M+', label: 'Patients Impacted' },
  { number: '99.9%', label: 'System Uptime' },
  { number: '100%', label: 'HIPAA Compliance Rate' },
];

export default function PortfolioPage() {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                level="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 'bold',
                  mb: 3,
                  background: 'linear-gradient(45deg, #0066CC, #004499)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Portfolio & Case Studies
              </Typography>
              <Typography
                level="h4"
                sx={{
                  color: 'neutral.600',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Discover how we've helped healthcare organizations transform their operations with
                innovative, secure, and compliant software solutions.
              </Typography>
            </Box>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid key={stat.label} xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      level="h2"
                      sx={{
                        fontWeight: 'bold',
                        color: 'primary.600',
                        mb: 1,
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography level="body-md" sx={{ color: 'neutral.600', fontWeight: 'medium' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Case Studies Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.body' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              level="h2"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                mb: 6,
                color: 'neutral.800',
              }}
            >
              Success Stories
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {caseStudies.map((study, index) => (
              <Grid key={study.title} xs={12}>
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
                      '&:hover': {
                        boxShadow: 'lg',
                        borderColor: study.color,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={4}>
                        {/* Project Header */}
                        <Grid xs={12} md={4}>
                          <Box sx={{ mb: 3 }}>
                            <Box
                              sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '16px',
                                backgroundColor: `${study.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 3,
                              }}
                            >
                              <study.icon sx={{ fontSize: 40, color: study.color }} />
                            </Box>
                            <Typography
                              level="title-lg"
                              sx={{ fontWeight: 'bold', mb: 1, color: 'neutral.800' }}
                            >
                              {study.title}
                            </Typography>
                            <Typography level="body-md" sx={{ color: 'neutral.600', mb: 2 }}>
                              {study.client} • {study.industry}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                              <Chip size="sm" variant="soft" color="primary">
                                {study.duration}
                              </Chip>
                              <Chip size="sm" variant="soft" color="neutral">
                                {study.teamSize}
                              </Chip>
                            </Box>
                          </Box>
                        </Grid>

                        {/* Project Details */}
                        <Grid xs={12} md={8}>
                          <Grid container spacing={3}>
                            {/* Challenge & Solution */}
                            <Grid xs={12}>
                              <Typography
                                level="title-md"
                                sx={{ fontWeight: 'bold', mb: 1, color: 'neutral.800' }}
                              >
                                Challenge
                              </Typography>
                              <Typography
                                level="body-md"
                                sx={{ color: 'neutral.600', mb: 3, lineHeight: 1.6 }}
                              >
                                {study.challenge}
                              </Typography>

                              <Typography
                                level="title-md"
                                sx={{ fontWeight: 'bold', mb: 1, color: 'neutral.800' }}
                              >
                                Solution
                              </Typography>
                              <Typography
                                level="body-md"
                                sx={{ color: 'neutral.600', mb: 3, lineHeight: 1.6 }}
                              >
                                {study.solution}
                              </Typography>
                            </Grid>

                            {/* Results */}
                            <Grid xs={12} sm={6}>
                              <Typography
                                level="title-md"
                                sx={{ fontWeight: 'bold', mb: 2, color: 'neutral.800' }}
                              >
                                Key Results
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {study.results.map((result) => (
                                  <Box
                                    key={result}
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                  >
                                    <CheckCircle sx={{ fontSize: 16, color: 'success.500' }} />
                                    <Typography level="body-sm" sx={{ color: 'neutral.700' }}>
                                      {result}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            </Grid>

                            {/* Technologies */}
                            <Grid xs={12} sm={6}>
                              <Typography
                                level="title-md"
                                sx={{ fontWeight: 'bold', mb: 2, color: 'neutral.800' }}
                              >
                                Technologies Used
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {study.technologies.map((tech) => (
                                  <Chip key={tech} size="sm" variant="outlined" color="neutral">
                                    {tech}
                                  </Chip>
                                ))}
                              </Box>
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

      {/* Testimonials Section */}
      <Box sx={{ py: 8, backgroundColor: 'neutral.50' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              level="h2"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                mb: 6,
                color: 'neutral.800',
              }}
            >
              What Our Clients Say
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid key={testimonial.name} xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      p: 3,
                      '&:hover': {
                        boxShadow: 'lg',
                        borderColor: 'primary.300',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      {/* Quote Icon */}
                      <Quote
                        sx={{
                          fontSize: 32,
                          color: 'primary.300',
                          mb: 2,
                          transform: 'rotate(180deg)',
                        }}
                      />

                      {/* Testimonial Text */}
                      <Typography
                        level="body-lg"
                        sx={{
                          color: 'neutral.700',
                          lineHeight: 1.6,
                          mb: 3,
                          flexGrow: 1,
                          fontStyle: 'italic',
                        }}
                      >
                        "{testimonial.testimonial}"
                      </Typography>

                      {/* Rating */}
                      <Box sx={{ mb: 3 }}>
                        <Rating value={testimonial.rating} readOnly size="small" />
                      </Box>

                      {/* Author Info */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            backgroundColor: 'primary.500',
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        >
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Typography level="title-md" sx={{ fontWeight: 'bold' }}>
                            {testimonial.name}
                          </Typography>
                          <Typography level="body-sm" sx={{ color: 'neutral.600' }}>
                            {testimonial.title}
                          </Typography>
                          <Typography level="body-sm" sx={{ color: 'primary.600' }}>
                            {testimonial.company}
                          </Typography>
                        </Box>
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
      <Box sx={{ py: 8, backgroundColor: 'background.body' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                p: 6,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #0066CC, #004499)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <Typography level="h3" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
                Ready to Join Our Success Stories?
              </Typography>
              <Typography
                level="title-lg"
                sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}
              >
                Let's discuss how we can help transform your healthcare organization with custom
                software solutions that deliver real results.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  size="lg"
                  variant="solid"
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.600',
                    '&:hover': {
                      backgroundColor: 'neutral.100',
                    },
                  }}
                >
                  Start Your Project
                </Button>
                <Button
                  size="lg"
                  variant="outlined"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Schedule Consultation
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
