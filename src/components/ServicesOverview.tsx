'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Container, Grid, Card, CardContent, Button } from '@mui/joy';
import {
  LocalHospital,
  MedicalServices,
  Healing,
  Security,
  Cloud,
  Hub as Integration,
  ArrowForward,
} from '@mui/icons-material';

const services = [
  {
    icon: LocalHospital,
    title: 'Medical Clinic Software',
    description:
      'Comprehensive practice management systems for medical clinics of all sizes. Electronic health records, appointment scheduling, billing, and patient portal integration.',
    features: [
      'EHR/EMR Systems',
      'Patient Management',
      'Billing & Claims',
      'Appointment Scheduling',
    ],
    color: '#0066CC',
  },
  {
    icon: Healing,
    title: 'Dental Practice Management',
    description:
      'Specialized software solutions for dental practices. Digital imaging integration, treatment planning, insurance management, and patient communication tools.',
    features: [
      'Digital Imaging',
      'Treatment Planning',
      'Insurance Processing',
      'Patient Communication',
    ],
    color: '#00AA44',
  },
  {
    icon: MedicalServices,
    title: 'Hospital Systems',
    description:
      'Enterprise-level hospital management systems. Patient flow optimization, resource management, clinical decision support, and multi-department integration.',
    features: [
      'Patient Flow Management',
      'Resource Optimization',
      'Clinical Decision Support',
      'Department Integration',
    ],
    color: '#CC6600',
  },
  {
    icon: Security,
    title: 'HIPAA Compliance',
    description:
      'Comprehensive HIPAA compliance solutions ensuring your healthcare data is protected. Security audits, risk assessments, and compliance monitoring.',
    features: ['Security Audits', 'Risk Assessment', 'Compliance Monitoring', 'Staff Training'],
    color: '#AA0066',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description:
      'Secure cloud-based healthcare solutions with 99.9% uptime guarantee. Scalable infrastructure, automatic backups, and disaster recovery.',
    features: [
      'Cloud Migration',
      'Scalable Infrastructure',
      'Automatic Backups',
      'Disaster Recovery',
    ],
    color: '#6600CC',
  },
  {
    icon: Integration,
    title: 'System Integration',
    description:
      'Seamless integration of existing healthcare systems. API development, data migration, and workflow optimization for improved efficiency.',
    features: [
      'API Development',
      'Data Migration',
      'Workflow Optimization',
      'Legacy System Integration',
    ],
    color: '#CC0066',
  },
];

export default function ServicesOverview() {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.body' }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              level="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 'bold',
                mb: 2,
                color: 'neutral.800',
              }}
            >
              Comprehensive Healthcare Software Solutions
            </Typography>
            <Typography
              level="title-lg"
              sx={{
                color: 'neutral.600',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              From small clinics to large hospital systems, we provide tailored software solutions
              that meet the unique needs of healthcare providers while ensuring HIPAA compliance and
              enterprise-grade security.
            </Typography>
          </Box>
        </motion.div>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid key={service.title} xs={12} md={6} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    p: 3,
                    '&:hover': {
                      boxShadow: 'lg',
                      borderColor: service.color,
                    },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Icon and Title */}
                    <Box sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '12px',
                          backgroundColor: `${service.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <service.icon sx={{ fontSize: 32, color: service.color }} />
                      </Box>
                      <Typography
                        level="title-md"
                        sx={{ fontWeight: 'bold', mb: 1, color: 'neutral.800' }}
                      >
                        {service.title}
                      </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                      level="body-md"
                      sx={{ color: 'neutral.600', mb: 3, lineHeight: 1.6, flexGrow: 1 }}
                    >
                      {service.description}
                    </Typography>

                    {/* Features List */}
                    <Box sx={{ mb: 3 }}>
                      {service.features.map((feature, featureIndex) => (
                        <Box
                          key={feature}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: service.color,
                            }}
                          />
                          <Typography level="body-sm" sx={{ color: 'neutral.700' }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* Learn More Button */}
                    <Button
                      variant="plain"
                      endDecorator={<ArrowForward />}
                      sx={{
                        alignSelf: 'flex-start',
                        color: service.color,
                        '&:hover': {
                          backgroundColor: `${service.color}10`,
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              mt: 8,
              p: 6,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0066CC, #004499)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Typography level="h3" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
              Ready to Transform Your Healthcare Practice?
            </Typography>
            <Typography
              level="title-lg"
              sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}
            >
              Let our experienced team help you implement a custom software solution that meets your
              specific needs and ensures HIPAA compliance.
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
                endDecorator={<ArrowForward />}
              >
                Schedule Consultation
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
                View Case Studies
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
