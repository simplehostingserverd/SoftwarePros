import type { Client, OnboardingStep, EmailTemplate, Milestone, Deliverable } from "@/types/onboarding";

// Email templates for automated onboarding communications
export const emailTemplates: Record<string, EmailTemplate> = {
  welcome: {
    id: "welcome",
    name: "Welcome Email",
    type: "welcome",
    subject: "Welcome to SoftwarePros - {{companyName}} Project Kickoff 🚀",
    content: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to SoftwarePros</title>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #e1e5e9; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #666; }
        .btn { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
        .steps { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .step { display: flex; align-items: center; margin: 10px 0; }
        .step-number { background: #667eea; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; }
        .feature { display: flex; align-items: center; margin: 10px 0; }
        .feature-icon { margin-right: 10px; font-size: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to SoftwarePros!</h1>
            <p>Your {{projectType}} project journey begins now</p>
        </div>

        <div class="content">
            <h2>Hi {{clientName}},</h2>

            <p>Welcome to the SoftwarePros family! We're thrilled to partner with {{companyName}} on your upcoming {{projectType}} project. This email confirms that we've successfully started your onboarding process.</p>

            <h3>🎯 What's Next?</h3>
            <div class="steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div>
                        <strong>Project Kickoff Meeting</strong><br>
                        We'll schedule a comprehensive kickoff meeting to finalize scope, timelines, and deliverables.
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div>
                        <strong>Access & Credentials Setup</strong><br>
                        Collect necessary account access and credentials for seamless project execution.
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div>
                        <strong>Training & Resources</strong><br>
                        Access documentation, videos, and resources to get you up to speed.
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <div>
                        <strong>Communication Cadence</strong><br>
                        Establish regular check-ins and communication schedules.
                    </div>
                </div>
            </div>

            <h3>🚀 Your Client Portal</h3>
            <p>We've created a dedicated client portal where you can:</p>

            <div class="feature">
                <div class="feature-icon">📊</div>
                <div>Track project progress and milestones in real-time</div>
            </div>
            <div class="feature">
                <div class="feature-icon">📁</div>
                <div>Access and review deliverables as they're completed</div>
            </div>
            <div class="feature">
                <div class="feature-icon">💬</div>
                <div>Communicate directly with your project team</div>
            </div>
            <div class="feature">
                <div class="feature-icon">📅</div>
                <div>View upcoming meetings and deadlines</div>
            </div>
            <div class="feature">
                <div class="feature-icon">📋</div>
                <div>Complete required tasks and provide feedback</div>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="{{portalUrl}}" class="btn">Access Your Client Portal</a>
            </div>

            <h3>💼 Project Details</h3>
            <ul>
                <li><strong>Project Type:</strong> {{projectType}}</li>
                <li><strong>Expected Launch:</strong> {{expectedLaunchDate}}</li>
                <li><strong>Project Budget:</strong> {{budget}}</li>
            </ul>

            <h3>👥 Your Project Team</h3>
            <p>You'll be working with our experienced team of professionals:</p>
            <ul>
                <li><strong>Project Manager:</strong> Will coordinate all aspects of your project</li>
                <li><strong>Lead Developer:</strong> Technical implementation and architecture</li>
                <li><strong>UI/UX Designer:</strong> User experience and visual design</li>
                <li><strong>Quality Assurance:</strong> Testing and quality control</li>
            </ul>

            <p><strong>Need Help?</strong> Reply to this email or contact us at <a href="mailto:support@softwarepros.org">support@softwarepros.org</a></p>

            <p>We're excited to bring your vision to life!</p>

            <p>Best regards,<br>
            The SoftwarePros Team</p>
        </div>

        <div class="footer">
            <p>SoftwarePros | Professional Software Development Services</p>
            <p>🌐 <a href="https://www.softwarepros.org">www.softwarepros.org</a> | 📧 <a href="mailto:hello@softwarepros.org">hello@softwarepros.org</a></p>
        </div>
    </div>
</body>
</html>
    `,
    variables: ["clientName", "companyName", "projectType", "expectedLaunchDate", "budget", "portalUrl"],
  },

  kickoff_scheduled: {
    id: "kickoff_scheduled",
    name: "Kickoff Meeting Scheduled",
    type: "milestone",
    subject: "{{companyName}} Project Kickoff - {{kickoffDate}} 📅",
    content: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Kickoff Meeting Scheduled</title>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #e1e5e9; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #666; }
        .btn { display: inline-block; padding: 12px 24px; background: #28a745; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
        .meeting-details { background: #e8f5e8; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #28a745; }
        .agenda-item { margin: 10px 0; padding-left: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Kickoff Meeting Scheduled!</h1>
            <p>Let's officially start your {{projectType}} project</p>
        </div>

        <div class="content">
            <h2>Hi {{clientName}},</h2>

            <p>Great news! We've scheduled your project kickoff meeting. This is where we'll finalize all project details and officially begin development.</p>

            <div class="meeting-details">
                <h3>📅 Meeting Details</h3>
                <p><strong>Date & Time:</strong> {{kickoffDate}}</p>
                <p><strong>Duration:</strong> 90 minutes</p>
                <p><strong>Meeting Type:</strong> Video Conference</p>
                <p><strong>Platform:</strong> SoftwarePros Meeting Room</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="{{meetingUrl}}" class="btn">Join Meeting Room</a>
            </div>

            <h3>📋 Meeting Agenda</h3>
            <div class="agenda-item">• <strong>Project Scope Review</strong> - Confirm requirements and deliverables</div>
            <div class="agenda-item">• <strong>Timeline & Milestones</strong> - Review project schedule and payment milestones</div>
            <div class="agenda-item">• <strong>Team Introductions</strong> - Meet your dedicated project team</div>
            <div class="agenda-item">• <strong>Communication Plan</strong> - Establish check-in schedules and preferred communication channels</div>
            <div class="agenda-item">• <strong>Technical Requirements</strong> - Discuss hosting, domains, and technical specifications</div>
            <div class="agenda-item">• <strong>Next Steps</strong> - Define immediate action items and responsibilities</div>

            <h3>📝 Please Prepare</h3>
            <ul>
                <li>Any additional requirements or changes to scope</li>
                <li>Brand assets (logos, colors, fonts) if applicable</li>
                <li>Examples of designs or features you like</li>
                <li>Questions about the development process</li>
                <li>Access credentials we discussed earlier</li>
            </ul>

            <h3>👥 Meeting Attendees</h3>
            <ul>
                <li><strong>{{projectManager}}</strong> - Project Manager</li>
                <li><strong>{{leadDeveloper}}</strong> - Lead Developer</li>
                <li><strong>{{designer}}</strong> - UI/UX Designer</li>
                <li><strong>You and your team</strong> - {{companyName}}</li>
            </ul>

            <p><strong>Need to reschedule?</strong> Reply to this email at least 24 hours before the meeting.</p>

            <p>Looking forward to officially starting your project!</p>

            <p>Best regards,<br>
            {{projectManager}}<br>
            Project Manager, SoftwarePros</p>
        </div>

        <div class="footer">
            <p>SoftwarePros | Professional Software Development Services</p>
            <p>📧 <a href="mailto:{{projectManagerEmail}}">{{projectManagerEmail}}</a> | 📱 {{projectManagerPhone}}</p>
        </div>
    </div>
</body>
</html>
    `,
    variables: ["clientName", "companyName", "projectType", "kickoffDate", "meetingUrl", "projectManager", "leadDeveloper", "designer", "projectManagerEmail", "projectManagerPhone"],
  },

  milestone_completed: {
    id: "milestone_completed",
    name: "Milestone Completed",
    type: "milestone",
    subject: "🎉 Milestone Completed: {{milestoneName}} - {{companyName}}",
    content: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Milestone Completed</title>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #e1e5e9; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #666; }
        .btn { display: inline-block; padding: 12px 24px; background: #ffc107; color: #333; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
        .milestone-details { background: #fff3cd; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #ffc107; }
        .progress-bar { background: #e9ecef; height: 20px; border-radius: 10px; overflow: hidden; margin: 10px 0; }
        .progress-fill { background: linear-gradient(135deg, #28a745, #20c997); height: 100%; transition: width 0.3s ease; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Milestone Achieved!</h1>
            <p>{{milestoneName}} has been completed</p>
        </div>

        <div class="content">
            <h2>Hi {{clientName}},</h2>

            <p>Excellent news! We've successfully completed the <strong>{{milestoneName}}</strong> milestone for your {{projectType}} project.</p>

            <div class="milestone-details">
                <h3>📊 Milestone Summary</h3>
                <p><strong>Milestone:</strong> {{milestoneName}}</p>
                <p><strong>Completed:</strong> {{completedDate}}</p>
                <p><strong>Status:</strong> ✅ Completed</p>
                {{#if paymentAmount}}
                <p><strong>Milestone Payment:</strong> {{paymentAmount}}</p>
                {{/if}}
            </div>

            <h3>📈 Project Progress</h3>
            <p>Overall project completion:</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: {{progressPercentage}}%;"></div>
            </div>
            <p style="text-align: center; margin: 5px 0;"><strong>{{progressPercentage}}% Complete</strong></p>

            <h3>✅ Deliverables Completed</h3>
            <ul>
                {{#each deliverables}}
                <li>{{this}}</li>
                {{/each}}
            </ul>

            <h3>🔄 What's Next?</h3>
            <p>{{nextStepsDescription}}</p>

            {{#if nextMilestone}}
            <div style="background: #e3f2fd; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <h4>📅 Next Milestone: {{nextMilestone.name}}</h4>
                <p>Expected completion: {{nextMilestone.dueDate}}</p>
                <p>{{nextMilestone.description}}</p>
            </div>
            {{/if}}

            <div style="text-align: center; margin: 30px 0;">
                <a href="{{portalUrl}}" class="btn">View Progress in Portal</a>
            </div>

            {{#if paymentAmount}}
            <h3>💰 Payment Information</h3>
            <p>This milestone includes a payment of <strong>{{paymentAmount}}</strong>. You'll receive a separate invoice within 1 business day.</p>
            {{/if}}

            <h3>💬 Feedback Welcome</h3>
            <p>We'd love to hear your thoughts on this milestone! Please review the deliverables in your client portal and let us know if you have any feedback or questions.</p>

            <p>Thank you for your continued trust in SoftwarePros!</p>

            <p>Best regards,<br>
            {{projectManager}}<br>
            Project Manager, SoftwarePros</p>
        </div>

        <div class="footer">
            <p>SoftwarePros | Professional Software Development Services</p>
            <p>📧 <a href="mailto:{{projectManagerEmail}}">{{projectManagerEmail}}</a></p>
        </div>
    </div>
</body>
</html>
    `,
    variables: ["clientName", "companyName", "projectType", "milestoneName", "completedDate", "paymentAmount", "progressPercentage", "deliverables", "nextStepsDescription", "nextMilestone", "portalUrl", "projectManager", "projectManagerEmail"],
  },

  feedback_request: {
    id: "feedback_request",
    name: "Feedback Request",
    type: "feedback",
    subject: "📝 Your Feedback Needed: {{deliverableName}} - {{companyName}}",
    content: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Feedback Requested</title>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6f42c1 0%, #6610f2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #e1e5e9; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #666; }
        .btn { display: inline-block; padding: 12px 24px; background: #6f42c1; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
        .deliverable-box { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #6f42c1; }
        .feedback-options { background: #e9ecef; padding: 15px; border-radius: 6px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📝 Feedback Requested</h1>
            <p>Your input helps us deliver excellence</p>
        </div>

        <div class="content">
            <h2>Hi {{clientName}},</h2>

            <p>We've completed <strong>{{deliverableName}}</strong> and would love your feedback! Your input is crucial for ensuring we're meeting your expectations and vision.</p>

            <div class="deliverable-box">
                <h3>📁 Deliverable Details</h3>
                <p><strong>Name:</strong> {{deliverableName}}</p>
                <p><strong>Type:</strong> {{deliverableType}}</p>
                <p><strong>Description:</strong> {{deliverableDescription}}</p>
                <p><strong>Completed:</strong> {{completedDate}}</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="{{portalUrl}}" class="btn">Review & Provide Feedback</a>
            </div>

            <h3>🎯 What We Need From You</h3>
            <div class="feedback-options">
                <h4>Please Review and Let Us Know:</h4>
                <ul>
                    <li>✅ <strong>Approve</strong> - Looks great, move to next phase</li>
                    <li>📝 <strong>Request Changes</strong> - Specific modifications needed</li>
                    <li>❓ <strong>Questions</strong> - Need clarification on anything</li>
                </ul>
            </div>

            <h3>⏰ Response Timeline</h3>
            <p>To keep your project on schedule, we'd appreciate your feedback within <strong>{{feedbackDeadline}}</strong>. This helps us maintain momentum and meet your expected launch date.</p>

            <h3>💡 Feedback Tips</h3>
            <ul>
                <li><strong>Be Specific:</strong> Detailed feedback helps us make precise improvements</li>
                <li><strong>Reference Examples:</strong> Screenshots or examples are incredibly helpful</li>
                <li><strong>Priority Levels:</strong> Let us know which changes are most important</li>
                <li><strong>Overall Direction:</strong> Tell us if we're on the right track</li>
            </ul>

            <h3>🤔 Questions?</h3>
            <p>If you have any questions about the deliverable or need clarification on anything, don't hesitate to reach out. We're here to ensure everything meets your vision!</p>

            <p>Looking forward to your feedback!</p>

            <p>Best regards,<br>
            {{projectManager}}<br>
            Project Manager, SoftwarePros</p>
        </div>

        <div class="footer">
            <p>SoftwarePros | Professional Software Development Services</p>
            <p>📧 <a href="mailto:{{projectManagerEmail}}">{{projectManagerEmail}}</a> | 📱 {{projectManagerPhone}}</p>
        </div>
    </div>
</body>
</html>
    `,
    variables: ["clientName", "companyName", "deliverableName", "deliverableType", "deliverableDescription", "completedDate", "portalUrl", "feedbackDeadline", "projectManager", "projectManagerEmail", "projectManagerPhone"],
  },

  project_completion: {
    id: "project_completion",
    name: "Project Completion",
    type: "completion",
    subject: "🎊 Project Complete: {{projectName}} - Thank You {{companyName}}!",
    content: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Project Completed</title>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #e83e8c 0%, #fd7e14 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #e1e5e9; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #666; }
        .btn { display: inline-block; padding: 12px 24px; background: #e83e8c; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
        .success-box { background: #d4edda; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #28a745; }
        .stats { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; display: flex; justify-content: space-between; text-align: center; }
        .stat { flex: 1; }
        .maintenance-box { background: #fff3cd; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #ffc107; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎊 Congratulations!</h1>
            <p>Your {{projectType}} project is now live!</p>
        </div>

        <div class="content">
            <h2>Hi {{clientName}},</h2>

            <p>It's official! We've successfully completed your {{projectName}} project. What started as an idea has now become a reality, and we couldn't be more excited to see it live!</p>

            <div class="success-box">
                <h3>🚀 Project Successfully Launched!</h3>
                <p><strong>Project:</strong> {{projectName}}</p>
                <p><strong>Launch Date:</strong> {{launchDate}}</p>
                <p><strong>Live URL:</strong> <a href="{{projectUrl}}">{{projectUrl}}</a></p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="{{projectUrl}}" class="btn">View Your Live Project</a>
            </div>

            <h3>📊 Project Summary</h3>
            <div class="stats">
                <div class="stat">
                    <h4>{{projectDuration}}</h4>
                    <p>Project Duration</p>
                </div>
                <div class="stat">
                    <h4>{{milestonesCompleted}}</h4>
                    <p>Milestones Achieved</p>
                </div>
                <div class="stat">
                    <h4>{{deliverablesCount}}</h4>
                    <p>Deliverables</p>
                </div>
            </div>

            <h3>✅ What We Delivered</h3>
            <ul>
                {{#each deliverables}}
                <li>{{this}}</li>
                {{/each}}
            </ul>

            <h3>🛠️ Ongoing Support & Maintenance</h3>
            <div class="maintenance-box">
                <h4>30-Day Support Period</h4>
                <p>We provide <strong>30 days of complimentary support</strong> to ensure everything runs smoothly. This includes:</p>
                <ul>
                    <li>Bug fixes and minor adjustments</li>
                    <li>Technical support and troubleshooting</li>
                    <li>Performance monitoring</li>
                    <li>Security updates</li>
                </ul>
            </div>

            <h3>📚 Important Resources</h3>
            <ul>
                <li><strong>Documentation:</strong> Complete user guides and technical documentation</li>
                <li><strong>Admin Access:</strong> Login credentials and administrative controls</li>
                <li><strong>Backup Information:</strong> Data backup procedures and schedules</li>
                <li><strong>Support Contacts:</strong> Direct lines for technical assistance</li>
            </ul>

            <h3>🔮 Future Enhancements</h3>
            <p>As your business grows, we're here to help scale your {{projectType}} solution. Whether you need new features, integrations, or optimizations, we'd love to continue supporting your success.</p>

            <h3>⭐ We'd Love Your Feedback!</h3>
            <p>Your experience matters to us. If you have a moment, we'd appreciate:</p>
            <ul>
                <li>A testimonial about your experience</li>
                <li>A review on Google or our preferred platforms</li>
                <li>Referrals to other businesses who might benefit from our services</li>
            </ul>

            <div style="text-align: center; margin: 30px 0;">
                <a href="{{testimonialUrl}}" class="btn">Share Your Experience</a>
            </div>

            <h3>🤝 Thank You!</h3>
            <p>Working with {{companyName}} has been an absolute pleasure. Your vision, feedback, and collaboration made this project a success. We're proud to have been part of bringing your ideas to life.</p>

            <p>Here's to your continued success!</p>

            <p>Best regards,<br>
            The Entire SoftwarePros Team</p>

            <hr>

            <p><small><strong>Need Support?</strong> Contact us at <a href="mailto:support@softwarepros.org">support@softwarepros.org</a> or reply to this email.</small></p>
        </div>

        <div class="footer">
            <p>SoftwarePros | Professional Software Development Services</p>
            <p>🌐 <a href="https://www.softwarepros.org">www.softwarepros.org</a> | 📧 <a href="mailto:hello@softwarepros.org">hello@softwarepros.org</a></p>
        </div>
    </div>
</body>
</html>
    `,
    variables: ["clientName", "companyName", "projectName", "projectType", "launchDate", "projectUrl", "projectDuration", "milestonesCompleted", "deliverablesCount", "deliverables", "testimonialUrl"],
  },
};

// Email automation service
export class EmailAutomationService {
  private templates = emailTemplates;

  // Send automated emails based on onboarding events
  async sendOnboardingEmail(
    type: keyof typeof emailTemplates,
    client: Client,
    additionalData: Record<string, any> = {}
  ) {
    const template = this.templates[type];
    if (!template) {
      throw new Error(`Email template '${type}' not found`);
    }

    const emailData = {
      clientName: client.contactName,
      companyName: client.companyName,
      projectType: client.projectType,
      expectedLaunchDate: client.expectedLaunchDate ? new Date(client.expectedLaunchDate).toLocaleDateString() : "TBD",
      budget: client.budget?.toLocaleString() || "Contact us",
      portalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/portal?clientId=${client.id}`,
      ...additionalData,
    };

    const renderedSubject = this.renderTemplate(template.subject, emailData);
    const renderedContent = this.renderTemplate(template.content, emailData);

    await this.sendEmail({
      to: client.email,
      subject: renderedSubject,
      html: renderedContent,
    });

    console.log(`Sent ${type} email to ${client.email}`);
  }

  // Render email template with data
  private renderTemplate(template: string, data: Record<string, any>): string {
    let rendered = template;

    // Simple template replacement (replace with proper template engine like Handlebars in production)
    Object.entries(data).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      rendered = rendered.replace(regex, String(value || ''));
    });

    return rendered;
  }

  // Send email using secure nodemailer service
  private async sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
    try {
      // Import the secure email function dynamically to avoid circular dependencies
      const { sendContactEmail } = await import('./mailer');

      // Create a minimal contact data object for the email
      const emailData = {
        name: "Email Automation System",
        email: "automation@softwarepros.org",
        phone: "",
        company: "SoftwarePros",
        serviceType: "Email Automation",
        message: html,
        subject: subject,
      };

      // Send using the secure email system
      const result = await sendContactEmail(emailData);

      console.log(`Automated email sent successfully to ${to}:`, result.messageId);
      return result;
    } catch (error) {
      console.error('Error sending automated email:', error);

      // Enhanced error handling for automation emails
      if (error instanceof Error) {
        if (error.message.includes("Rate limit")) {
          console.warn("Email automation rate limit reached, will retry later");
          // Could implement retry logic with exponential backoff here
        }
        if (error.message.includes("Validation failed")) {
          console.error("Email automation validation failed:", error.message);
        }
      }

      throw error;
    }
  }

  // Trigger automated emails based on onboarding step completion
  async handleStepCompletion(step: OnboardingStep, client: Client) {
    switch (step.step) {
      case 'welcome':
        // Send kickoff scheduling email
        await this.sendOnboardingEmail('kickoff_scheduled', client, {
          kickoffDate: client.kickoffDate ? new Date(client.kickoffDate).toLocaleDateString() : 'TBD',
          meetingUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/join/${step.id}`,
          projectManager: 'Sarah Johnson',
          leadDeveloper: 'Mike Chen',
          designer: 'Alex Rodriguez',
          projectManagerEmail: 'sarah@softwarepros.org',
          projectManagerPhone: '+1 (555) 123-4567',
        });
        break;

      case 'access_setup':
        // Could trigger training material email
        console.log('Access setup completed - training materials available');
        break;

      case 'training':
        // Could trigger communication setup email
        console.log('Training completed - setting up communication cadence');
        break;

      case 'communication':
        // Move to active project status
        console.log('Onboarding complete - project now active');
        break;
    }
  }

  // Trigger milestone completion email
  async handleMilestoneCompletion(milestone: Milestone, client: Client, additionalData: any = {}) {
    await this.sendOnboardingEmail('milestone_completed', client, {
      milestoneName: milestone.name,
      completedDate: new Date().toLocaleDateString(),
      paymentAmount: milestone.paymentAmount,
      progressPercentage: additionalData.progressPercentage || 50,
      deliverables: additionalData.deliverables || [],
      nextStepsDescription: additionalData.nextStepsDescription || 'Continuing with next phase of development.',
      nextMilestone: additionalData.nextMilestone,
      projectManager: 'Sarah Johnson',
      projectManagerEmail: 'sarah@softwarepros.org',
    });
  }

  // Trigger feedback request email
  async requestFeedback(deliverable: Deliverable, client: Client) {
    await this.sendOnboardingEmail('feedback_request', client, {
      deliverableName: deliverable.name,
      deliverableType: deliverable.type,
      deliverableDescription: deliverable.description,
      completedDate: deliverable.completedDate ? new Date(deliverable.completedDate).toLocaleDateString() : new Date().toLocaleDateString(),
      feedbackDeadline: '3 business days',
      projectManager: 'Sarah Johnson',
      projectManagerEmail: 'sarah@softwarepros.org',
      projectManagerPhone: '+1 (555) 123-4567',
    });
  }
}

// Export singleton instance
export const emailAutomation = new EmailAutomationService();