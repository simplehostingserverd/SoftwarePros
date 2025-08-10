'use client';

import React, { useEffect, useState } from 'react';

// Force dynamic rendering to prevent framer-motion SSG issues
export const dynamic = 'force-dynamic';

import AnimatedDiv from '@/components/AnimatedDiv';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Email, LocationOn, Phone, Schedule, Send } from '@mui/icons-material';
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
  Select,
  Textarea,
  Typography,
  Checkbox,
} from '@mui/joy';
import Option from '@mui/joy/Option';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name is required'),
  serviceType: z.string().min(1, 'Please select a service type'),
  subject: z.string().optional(),
  budget: z.string().min(1, 'Please select a budget'),
  timeline: z.string().optional(),
  contactMethod: z.string().optional(),
  bestTimeToReach: z.string().min(1, 'Please select a preferred time'),
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  hearAboutUs: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy policy' }),
  }),
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
  'Support & Maintenance',
  'Security & Compliance',
];

const budgets = [
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000 - $250,000',
  '$250,000 - $500,000',
  '$500,000 - $1,000,000',
  '$1,000,000 - $2,500,000',
  '$2,500,000 - $5,000,000',
  '$5,000,000 - $10,000,000',
  '$10,000,000+',
];

const timelines = ['ASAP', '1-3 months', '3-6 months', '6+ months'];

const contactMethods = ['Email', 'Phone'];

const bestTimes = ['Morning', 'Afternoon', 'Evening'];

const hearAboutOptions = ['Google Search', 'Referral', 'Social Media', 'Advertisement', 'Other'];

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
    watch,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      contactMethod: 'Email',
    },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');

  const emailValue = watch('email');

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    async function validateEmailLive(email: string) {
      if (!email) {
        if (!isActive) return;
        setEmailStatus('idle');
        return;
      }

      // Basic RFC-like check first
      const simple = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!simple.test(email)) {
        if (!isActive) return;
        setEmailStatus('invalid');
        return;
      }

      setEmailStatus('checking');

      try {
        const domain = email.split('@')[1];
        // Use Cloudflare DoH to check MX for the domain
        const res = await fetch(
          `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`,
          {
            method: 'GET',
            headers: { Accept: 'application/dns-json' },
            signal: controller.signal,
          }
        );
        if (!res.ok) throw new Error('DNS query failed');
        const data = (await res.json()) as { Answer?: Array<{ data: string }>; Status: number };

        // Status 0 is NOERROR; presence of MX indicates a receiving domain
        const hasMx =
          Array.isArray(data.Answer) && data.Answer.some((a) => /\sMX\s/.test(a.data) || a.data);
        if (!isActive) return;
        setEmailStatus(hasMx ? 'valid' : 'invalid');
      } catch {
        if (!isActive) return;
        // On network error, fall back to syntactic validation result
        setEmailStatus('valid');
      }
    }

    const handle = setTimeout(() => {
      void validateEmailLive(emailValue);
    }, 500);

    return () => {
      isActive = false;
      controller.abort();
      clearTimeout(handle);
    };
  }, [emailValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Failed to send message');
      }

      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Something went wrong';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
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
          <AnimatedDiv animation="fade">
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
          </AnimatedDiv>
        </Container>
      </Box>

      {/* Contact Form & Info Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.body' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid xs={12} md={8}>
              <AnimatedDiv animation="slide-left">
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

                    {submitError && (
                      <Alert color="danger" sx={{ mb: 3 }}>
                        {submitError}
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
                            <FormHelperText>
                              {emailStatus === 'idle' && 'We will never share your email.'}
                              {emailStatus === 'checking' && 'Checking email domain…'}
                              {emailStatus === 'valid' && (
                                <span style={{ color: 'var(--joy-palette-success-500)' }}>
                                  Email looks valid
                                </span>
                              )}
                              {(emailStatus === 'invalid' || errors.email) && (
                                <span style={{ color: 'var(--joy-palette-danger-500)' }}>
                                  {errors.email?.message || 'Email appears invalid'}
                                </span>
                              )}
                            </FormHelperText>
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
                                  value={field.value ?? null}
                                  onChange={(_, value) => field.onChange(value ?? '')}
                                  onBlur={field.onBlur}
                                  name={field.name}
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
                          <FormControl>
                            <FormLabel>Project Subject</FormLabel>
                            <Input
                              {...register('subject')}
                              placeholder="e.g., New HIPAA-compliant portal"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                        </Grid>

                        <Grid xs={12} sm={6}>
                          <FormControl error={!!errors.budget}>
                            <FormLabel>Estimated Budget</FormLabel>
                            <Controller
                              name="budget"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value ?? null}
                                  onChange={(_, value) => field.onChange(value ?? '')}
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  placeholder="Select a range"
                                  disabled={isSubmitting}
                                >
                                  {budgets.map((b) => (
                                    <Option key={b} value={b}>
                                      {b}
                                    </Option>
                                  ))}
                                </Select>
                              )}
                            />
                            {errors.budget && (
                              <FormHelperText>{errors.budget.message}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid xs={12} sm={6}>
                          <FormControl>
                            <FormLabel>Timeline</FormLabel>
                            <Controller
                              name="timeline"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value ?? null}
                                  onChange={(_, value) => field.onChange(value ?? '')}
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  placeholder="Select a timeline"
                                  disabled={isSubmitting}
                                >
                                  {timelines.map((t) => (
                                    <Option key={t} value={t}>
                                      {t}
                                    </Option>
                                  ))}
                                </Select>
                              )}
                            />
                          </FormControl>
                        </Grid>

                        <Grid xs={12} sm={6}>
                          <FormControl>
                            <FormLabel>Preferred Contact Method</FormLabel>
                            <Controller
                              name="contactMethod"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value ?? null}
                                  onChange={(_, value) => field.onChange(value ?? '')}
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  placeholder="Select method"
                                  disabled={isSubmitting}
                                >
                                  {contactMethods.map((m) => (
                                    <Option key={m} value={m}>
                                      {m}
                                    </Option>
                                  ))}
                                </Select>
                              )}
                            />
                          </FormControl>
                        </Grid>

                        <Grid xs={12} sm={6}>
                          <FormControl error={!!errors.bestTimeToReach}>
                            <FormLabel>Best Time to Reach</FormLabel>
                            <Controller
                              name="bestTimeToReach"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value ?? null}
                                  onChange={(_, value) => field.onChange(value ?? '')}
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  placeholder="Select time"
                                  disabled={isSubmitting}
                                >
                                  {bestTimes.map((t) => (
                                    <Option key={t} value={t}>
                                      {t}
                                    </Option>
                                  ))}
                                </Select>
                              )}
                            />
                            {errors.bestTimeToReach && (
                              <FormHelperText>{errors.bestTimeToReach.message}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid xs={12} sm={6}>
                          <FormControl error={!!errors.website}>
                            <FormLabel>Website (optional)</FormLabel>
                            <Input
                              {...register('website')}
                              placeholder="https://example.com"
                              disabled={isSubmitting}
                            />
                            {errors.website && (
                              <FormHelperText>{errors.website.message}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid xs={12} sm={6}>
                          <FormControl>
                            <FormLabel>How did you hear about us?</FormLabel>
                            <Controller
                              name="hearAboutUs"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value ?? null}
                                  onChange={(_, value) => field.onChange(value ?? '')}
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  placeholder="Select an option"
                                  disabled={isSubmitting}
                                >
                                  {hearAboutOptions.map((o) => (
                                    <Option key={o} value={o}>
                                      {o}
                                    </Option>
                                  ))}
                                </Select>
                              )}
                            />
                          </FormControl>
                        </Grid>

                        <Grid xs={12}>
                          <FormControl error={!!errors.message}>
                            <FormLabel>Message *</FormLabel>
                            <Textarea
                              {...register('message')}
                              placeholder="Tell us about your project requirements, current challenges, and goals..."
                              minRows={5}
                              disabled={isSubmitting}
                            />
                            {errors.message && (
                              <FormHelperText>{errors.message.message}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid xs={12}>
                          <FormControl error={!!errors.consent}>
                            <Checkbox
                              {...register('consent')}
                              label="I agree to the privacy policy and terms of service"
                              disabled={isSubmitting}
                            />
                            {errors.consent && (
                              <FormHelperText>{errors.consent.message as string}</FormHelperText>
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
              </AnimatedDiv>
            </Grid>

            {/* Contact Information */}
            <Grid xs={12} md={4}>
              <AnimatedDiv animation="slide-right">
                <Typography level="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                  Get in Touch
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {contactInfo.map((info, index) => (
                    <AnimatedDiv key={info.title} animation="fade" delay={index * 100}>
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
                            {info.details.map((detail) => (
                            <Typography
                              key={detail}
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
                    </AnimatedDiv>
                  ))}
                </Box>
              </AnimatedDiv>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
