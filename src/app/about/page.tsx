'use client';

import React from 'react';

import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
} from '@mui/joy';
import {
  School,
  Work,
  EmojiEvents,
  Security,
  Code,
  Architecture,
  Business,
  HealthAndSafety,
} from '@mui/icons-material';

const achievements = [
  {
    icon: Work,
    title: 'Fortune 500 Experience',
    description:
      'Extensive experience working with Fortune 500 companies to design and deploy enterprise-level software solutions.',
  },
  {
    icon: HealthAndSafety,
    title: 'Healthcare Specialization',
    description:
      'Deep expertise in healthcare software development with comprehensive understanding of HIPAA compliance requirements.',
  },
  {
    icon: Architecture,
    title: 'Software Architecture',
    description:
      'Proven track record in designing scalable, secure, and maintainable software architectures for complex healthcare systems.',
  },
  {
    icon: Security,
    title: 'Enterprise Security',
    description:
      'Advanced knowledge in implementing enterprise-grade security measures and compliance frameworks.',
  },
];

const expertise = [
  'Healthcare Software Development',
  'HIPAA Compliance & Security',
  'Enterprise Software Architecture',
  'Cloud Infrastructure & DevOps',
  'Database Design & Optimization',
  'API Development & Integration',
  'Mobile Application Development',
  'Quality Assurance & Testing',
  'Project Management & Leadership',
  'Regulatory Compliance',
  'Data Analytics & Reporting',
  'System Integration',
];

const timeline = [
  {
    year: '2008',
    title: 'Software Engineering Career Begins',
    description:
      'Started professional software development career with focus on enterprise applications.',
  },
  {
    year: '2012',
    title: 'Healthcare Specialization',
    description:
      'Transitioned to healthcare software development, recognizing the critical need for HIPAA-compliant solutions.',
  },
  {
    year: '2015',
    title: 'Fortune 500 Collaboration',
    description:
      'Began working with Fortune 500 companies on large-scale healthcare software implementations.',
  },
  {
    year: '2018',
    title: 'Software Architecture Leadership',
    description:
      'Advanced to senior software architect role, leading design of complex healthcare systems.',
  },
  {
    year: '2020',
    title: 'Software Pros Founded',
    description:
      'Established Software Pros to provide specialized healthcare software solutions to medical practices.',
  },
  {
    year: '2024',
    title: 'Industry Recognition',
    description:
      'Recognized as a leading provider of HIPAA-compliant software solutions with 500+ successful implementations.',
  },
];

export default function AboutPage() {
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
                About Software Pros
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
                Pioneering healthcare software solutions with uncompromising commitment to
                excellence, security, and regulatory compliance.
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Founder Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.body' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 200,
                      height: 200,
                      mx: 'auto',
                      mb: 3,
                      fontSize: '4rem',
                      backgroundColor: 'primary.500',
                    }}
                  >
                    MT
                  </Avatar>
                  <Typography level="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Michael Trevino
                  </Typography>
                  <Typography level="title-md" sx={{ color: 'primary.600', mb: 2 }}>
                    Founder & CEO
                  </Typography>
                  <Typography level="body-md" sx={{ color: 'neutral.600' }}>
                    Brownsville, Texas
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            <Grid xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography level="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Visionary Leadership in Healthcare Technology
                </Typography>
                <Typography level="body-lg" sx={{ mb: 3, lineHeight: 1.8, color: 'neutral.700' }}>
                  Michael Trevino, the founder and Chief Executive Officer of Software Pros, brings
                  over fifteen years of distinguished experience in software engineering and
                  architectural design to the healthcare technology sector. Based in Brownsville,
                  Texas, Mr. Trevino has established himself as a preeminent authority in the
                  development of HIPAA-compliant software solutions for medical institutions.
                </Typography>
                <Typography level="body-lg" sx={{ mb: 3, lineHeight: 1.8, color: 'neutral.700' }}>
                  Throughout his illustrious career, Mr. Trevino has collaborated extensively with
                  Fortune 500 corporations, spearheading the design and implementation of
                  enterprise-level software systems that serve millions of users. His expertise
                  encompasses the full spectrum of software development lifecycle management, from
                  initial architectural conceptualization to deployment and ongoing maintenance of
                  mission-critical applications.
                </Typography>
                <Typography level="body-lg" sx={{ mb: 4, lineHeight: 1.8, color: 'neutral.700' }}>
                  Recognizing the unique challenges and stringent regulatory requirements inherent
                  in healthcare technology, Mr. Trevino founded Software Pros with the express
                  purpose of delivering specialized software solutions that not only meet but exceed
                  industry standards for security, compliance, and operational excellence. Under his
                  leadership, Software Pros has successfully served thousands of healthcare
                  providers across diverse medical specialties, establishing an unparalleled
                  reputation for reliability and innovation.
                </Typography>

                {/* Expertise Tags */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {expertise.slice(0, 6).map((skill) => (
                    <Chip key={skill} variant="soft" color="primary" size="sm">
                      {skill}
                    </Chip>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Achievements Section */}
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
              Core Competencies & Achievements
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {achievements.map((achievement, index) => (
              <Grid key={achievement.title} xs={12} md={6}>
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
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '12px',
                            backgroundColor: 'primary.100',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <achievement.icon sx={{ fontSize: 24, color: 'primary.600' }} />
                        </Box>
                        <Typography level="title-md" sx={{ fontWeight: 'bold' }}>
                          {achievement.title}
                        </Typography>
                      </Box>
                      <Typography level="body-md" sx={{ color: 'neutral.600', lineHeight: 1.6 }}>
                        {achievement.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Timeline Section */}
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
              Our Journey of Excellence
            </Typography>
          </motion.div>

          <Box sx={{ position: 'relative', maxWidth: '800px', mx: 'auto' }}>
            {/* Timeline Line */}
            <Box
              sx={{
                position: 'absolute',
                left: { xs: '20px', md: '50%' },
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: 'primary.200',
                transform: { md: 'translateX(-50%)' },
              }}
            />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    mb: 6,
                    pl: { xs: 6, md: 0 },
                    display: { md: 'flex' },
                    alignItems: 'center',
                    justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                  }}
                >
                  {/* Timeline Dot */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: { xs: '11px', md: '50%' },
                      top: '12px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: 'primary.500',
                      border: '4px solid',
                      borderColor: 'background.body',
                      transform: { md: 'translateX(-50%)' },
                      zIndex: 1,
                    }}
                  />

                  {/* Content Card */}
                  <Card
                    variant="outlined"
                    sx={{
                      maxWidth: { md: '400px' },
                      width: '100%',
                      ml: { md: index % 2 === 0 ? 0 : 4 },
                      mr: { md: index % 2 === 0 ? 4 : 0 },
                      '&:hover': {
                        boxShadow: 'lg',
                        borderColor: 'primary.300',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        level="title-md"
                        sx={{
                          color: 'primary.600',
                          fontWeight: 'bold',
                          mb: 1,
                        }}
                      >
                        {item.year}
                      </Typography>
                      <Typography level="title-md" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {item.title}
                      </Typography>
                      <Typography level="body-md" sx={{ color: 'neutral.600', lineHeight: 1.6 }}>
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Mission & Values Section */}
      <Box sx={{ py: 8, backgroundColor: 'neutral.50' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography level="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Our Mission
                </Typography>
                <Typography level="body-lg" sx={{ mb: 4, lineHeight: 1.8, color: 'neutral.700' }}>
                  To revolutionize healthcare delivery through innovative, secure, and compliant
                  software solutions that empower medical professionals to provide exceptional
                  patient care while maintaining the highest standards of data protection and
                  regulatory adherence.
                </Typography>
                <Typography level="body-lg" sx={{ lineHeight: 1.8, color: 'neutral.700' }}>
                  We are committed to bridging the gap between cutting-edge technology and practical
                  healthcare applications, ensuring that our solutions not only meet current
                  industry needs but anticipate future challenges and opportunities in the evolving
                  healthcare landscape.
                </Typography>
              </motion.div>
            </Grid>

            <Grid xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography level="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Our Values
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[
                    {
                      title: 'Excellence',
                      description:
                        'Unwavering commitment to delivering superior software solutions that exceed expectations.',
                    },
                    {
                      title: 'Security',
                      description:
                        'Paramount focus on data protection and regulatory compliance in every solution we develop.',
                    },
                    {
                      title: 'Innovation',
                      description:
                        'Continuous pursuit of technological advancement to solve complex healthcare challenges.',
                    },
                    {
                      title: 'Integrity',
                      description:
                        'Transparent, ethical business practices that build lasting partnerships with our clients.',
                    },
                  ].map((value) => (
                    <Box key={value.title}>
                      <Typography level="title-md" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {value.title}
                      </Typography>
                      <Typography level="body-md" sx={{ color: 'neutral.600', lineHeight: 1.6 }}>
                        {value.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
