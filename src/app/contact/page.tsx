'use client';

import React, { useState } from 'react';

// Force dynamic rendering to prevent framer-motion SSG issues
export const dynamic = 'force-dynamic';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Business,
  CheckCircle,
  Email,
  LocationOn,
  Phone,
  Schedule,
  Send,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from '@mui/joy';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name is required'),
  serviceType: z.string().min(1, 'Please select a service type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceTypes = [
  'Medical Clinic Software',
  'Dental Practice Management',
  'Hospital Management System',
  'HIPAA Compliance Solutions',
  'Cloud Infrastructure',
  'System Integration',
  'Custom Software Development',
  'Consultation & Assessment',
];

const contactInfo = [
  {
    icon: LocationOn,
    title: 'Office Location',
    details: ['950 E. Van Buren St.', 'Brownsville, TX 78520'],
    color: '#0066CC',
  },
  {
    icon: Email,
    title: 'Email Address',
    details: ['info@softwarepros.org', 'support@softwarepros.org'],
    color: '#00AA44',
  },
  {
    icon: Phone,
    title: 'Phone Number',
    details: ['(956) 357-5588', 'Mon-Fri 8AM-6PM CST'],
    color: '#CC6600',
  },
  {
    icon: Schedule,
    title: 'Business Hours',
    details: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 2:00 PM'],
    color: '#AA0066',
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Form submitted:', data);
    setSubmitSuccess(true);
    setIsSubmitting(false);
    reset();

    // Hide success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

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
                Contact Us
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
                Ready to transform your healthcare practice with professional software solutions?
                Let's discuss your needs and create a custom solution that works for you.
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Form & Info Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.body' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card variant="outlined" sx={{ p: 4 }}>
                  <CardContent>
                    <Typography level="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
                      Get Your Free Consultation
                    </Typography>
                    <Typography level="body-lg" sx={{ color: 'neutral.600', mb: 4 }}>
                      Fill out the form below and we'll get back to you within 24 hours to discuss
                      your healthcare software needs and provide a customized solution.
                    </Typography>

                    {submitSuccess && (
                      <Alert color="success" startDecorator={<CheckCircle />} sx={{ mb: 3 }}>
                        Thank you! Your message has been sent successfully. We'll contact you within
                        24 hours.
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={6}>
                          <FormControl error={!!errors.name}>
                            <FormLabel>Full Name *</FormLabel>
                            <Input
                              {...register('name')}
                              placeholder="Enter your full name"
                              disabled={isSubmitting}
                            />
                            {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
                          </FormControl>
                        </Grid>

                        <Grid xs={12} sm={6}>
                          <FormControl error={!!errors.email}>
                            <FormLabel>Email Address *</FormLabel>
                            <Input
                              {...register('email')}
                              type="email"
                              placeholder="Enter your email"
                              disabled={isSubmitting}
                            />
                            {errors.email && (
                              <FormHelperText>{errors.email.message}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid xs={12} sm={6}>
                          <FormControl error={!!errors.phone}>
                            <FormLabel>Phone Number *</FormLabel>
                            <Input
                              {...register('phone')}
                              placeholder="(555) 123-4567"
                              disabled={isSubmitting}
                            />
                            {errors.phone && (
                              <FormHelperText>{errors.phone.message}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid xs={12} sm={6}>
                          <FormControl error={!!errors.company}>
                            <FormLabel>Company/Practice Name *</FormLabel>
                            <Input
                              {...register('company')}
                              placeholder="Enter your organization name"
                              disabled={isSubmitting}
                            />
                            {errors.company && (
                              <FormHelperText>{errors.company.message}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid xs={12}>
                          <FormControl error={!!errors.serviceType}>
                            <FormLabel>Service Type *</FormLabel>
                            <Controller
                              name="serviceType"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  placeholder="Select the service you're interested in"
                                  disabled={isSubmitting}
                                >
                                  {serviceTypes.map((service) => (
                                    <Option key={service} value={service}>
                                      {service}
                                    </Option>
                                  ))}
                                </Select>
                              )}
                            />
                            {errors.serviceType && (
                              <FormHelperText>{errors.serviceType.message}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid xs={12}>
                          <FormControl error={!!errors.message}>
                            <FormLabel>Message *</FormLabel>
                            <Textarea
                              {...register('message')}
                              placeholder="Tell us about your project requirements, current challenges, and goals..."
                              minRows={4}
                              disabled={isSubmitting}
                            />
                            {errors.message && (
                              <FormHelperText>{errors.message.message}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid xs={12}>
                          <Button
                            type="submit"
                            size="lg"
                            loading={isSubmitting}
                            endDecorator={<Send />}
                            sx={{
                              background: 'linear-gradient(45deg, #0066CC, #004499)',
                              '&:hover': {
                                background: 'linear-gradient(45deg, #004499, #002266)',
                              },
                            }}
                          >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Contact Information */}
            <Grid xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography level="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                  Get in Touch
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card
                        variant="outlined"
                        sx={{
                          p: 3,
                          '&:hover': {
                            boxShadow: 'md',
                            borderColor: info.color,
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
                                backgroundColor: `${info.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <info.icon sx={{ fontSize: 24, color: info.color }} />
                            </Box>
                            <Typography level="title-md" sx={{ fontWeight: 'bold' }}>
                              {info.title}
                            </Typography>
                          </Box>
                          {info.details.map((detail, detailIndex) => (
                            <Typography
                              key={detailIndex}
                              level="body-md"
                              sx={{
                                color: detailIndex === 0 ? 'neutral.800' : 'neutral.600',
                                fontWeight: detailIndex === 0 ? 'medium' : 'normal',
                              }}
                            >
                              {detail}
                            </Typography>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
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
