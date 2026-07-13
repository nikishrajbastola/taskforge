User Stories
Project

TaskForge – Student Project Marketplace Platform

Version

1.0

Author

Nikish Bastola

Overview

This document captures the Agile user stories for TaskForge. The stories represent business requirements from the perspective of the platform's primary stakeholders and are intended to guide feature development, sprint planning, and user acceptance testing.

Epic 1 – User Registration & Authentication
US-001 Student Registration

As a student seeking real-world project experience,

I want to create an account,

So that I can discover and apply for opportunities that align with my academic background and career interests.

Business Value

Provides students with secure access to the platform and enables personalized experiences.

Priority

High

Acceptance Criteria
Student can register using email and password.
Student profile is created successfully.
Student role is assigned automatically.
Student can log into the platform.
US-002 Organization Registration

As an organization representative,

I want to register an organization account,

So that I can post projects and recruit qualified student contributors.

Business Value

Allows organizations to participate in the project marketplace.

Priority

High

Acceptance Criteria
Organization account can be created.
Organization role is assigned.
Organization can access organization dashboard.
Epic 2 – Project Management
US-003 Create Project

As an organization,

I want to create project opportunities,

So that students can discover and apply for relevant work.

Business Value

Creates opportunities for student engagement while helping organizations source talent efficiently.

Priority

High

Acceptance Criteria
Title is required.
Description is required.
Required skills can be entered.
Project is visible after publishing.
US-004 Manage Projects

As an organization,

I want to update existing projects,

So that project information remains accurate throughout the recruitment process.

Business Value

Improves information quality and reduces applicant confusion.

Priority

Medium

Acceptance Criteria
Organization can edit project.
Organization can archive project.
Changes are saved successfully.
Epic 3 – Student Applications
US-005 Browse Projects

As a student,

I want to browse available projects,

So that I can identify opportunities matching my interests and skills.

Business Value

Improves project visibility and increases student participation.

Priority

High

Acceptance Criteria
Students can view available projects.
Students can view project details.
Required skills are displayed.
US-006 Submit Application

As a student,

I want to submit an application,

So that organizations can evaluate my qualifications.

Business Value

Creates a standardized application process across all projects.

Priority

High

Acceptance Criteria
Student can submit application.
Student can include application message.
Application is stored successfully.
US-007 Track Application Status

As a student,

I want to monitor my application status,

So that I understand my progress throughout the recruitment process.

Business Value

Improves transparency and user satisfaction.

Priority

Medium

Acceptance Criteria
Student can view current application status.
Status updates are displayed immediately.
Epic 4 – Applicant Workflow
US-008 Review Applicants

As an organization,

I want to review submitted applications,

So that I can identify the most qualified candidates.

Business Value

Supports informed hiring decisions.

Priority

High

Acceptance Criteria
Organization can view applicants.
Applicant information is displayed.
Resume link is available when uploaded.
US-009 Manage Recruitment Workflow

As an organization,

I want to move applicants through recruitment stages,

So that the hiring process remains organized and measurable.

Workflow States
Applied
Under Review
Interviewing
Accepted
Rejected
Completed
Business Value

Provides a structured hiring pipeline and improves recruitment visibility.

Priority

High

Acceptance Criteria
Organization can update applicant status.
Status changes are saved.
Students see updated status.
Epic 5 – Analytics & Reporting
US-010 View Analytics Dashboard

As an organization,

I want to view key performance metrics,

So that I can evaluate recruitment performance and project engagement.

Business Value

Supports data-driven decision-making.

Priority

Medium

Acceptance Criteria

Dashboard displays:

Total Projects
Total Applications
Pending Applications
Accepted Applications
Acceptance Rate
Top Requested Skills
Application Status Chart
US-011 Export Applicant Data

As an organization,

I want to export applicant information,

So that I can perform offline reporting and analysis.

Business Value

Enables external reporting and operational record keeping.

Priority

Medium

Acceptance Criteria
CSV export is available.
Applicant details are included.
Download completes successfully.
Epic 6 – Platform Administration
US-012 Role-Based Access Control

As a platform administrator,

I want users to access only the functionality appropriate for their assigned role,

So that platform security and data integrity are maintained.

Business Value

Protects sensitive information while enforcing role-based permissions.

Priority

High

Acceptance Criteria
Students cannot access organization dashboards.
Organizations cannot access administrative functions.
Unauthorized access attempts are prevented.