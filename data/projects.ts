import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: 'torch',
    title: 'TORCH',
    tagline: 'Voice-controlled urban risk management system',
    description: 'A real-time 3D command center for visualizing city-wide risk hotspots across Toronto using AI-powered voice commands.',
    story: `### The Problem
During crisis situations or urban emergencies, first responders and city planners are bogged down by complex dashboard UIs and slow database queries. Information needs to be immediately accessible, visual, and action-oriented.

### The Build
TORCH was built over 48 hours at NVIDIA Spark Hack Toronto during Toronto Tech Week 2025. It integrates an AI-powered voice assistant with a real-time 3D command center. The system uses NVIDIA NIM LLMs to translate spoken natural language commands (e.g., "Show me traffic collisions near the Eaton Center") into spatial queries executed against DuckDB. The results are visualised instantly in 3D using deck.gl, and routing optimizations are computed in real time via the Google Routes API.

### What I Learned
- **High-throughput spatial querying**: Learned to optimize spatial database queries on the fly using DuckDB and WebSockets.
- **AI Tool Integration**: Handled real-time voice-to-query conversions with low latency using custom speech recognition interfaces connected to NVIDIA NIM endpoints.
- **Interactive WebGL**: Learned how to layer massive datasets smoothly in a web browser using Deck.gl and Mapbox templates.`,
    techStack: ['Python', 'FastAPI', 'React', 'Next.js', 'TypeScript', 'DuckDB', 'NVIDIA NIM LLMs', 'deck.gl', 'WebSockets', 'Google Routes API'],
    screenshots: ['/TORCH.png', '/TORCH2.png'],
    videoUrl: undefined,
    githubUrl: 'https://github.com/mya-tech/torch',
    liveUrl: undefined,
    featured: true,
  },
  {
    slug: 'samyah-os',
    title: 'Samyah OS',
    tagline: 'Multi-tenant SaaS ERP & supply chain platform',
    description: 'A full SaaS ERP with PostgreSQL Row-Level Security, SSR auth, real-time inventory dashboards, and PWA offline support.',
    story: `### The Problem
Running a direct-to-consumer skincare business like "Samyah For Skin" requires managing formulations, raw ingredients, suppliers, purchase orders, and sales channels. Existing ERP solutions are either enterprise-grade and unaffordable, or simple spreadsheets that fall short when scaling.

### The Build
Samyah OS was born from running Samyah For Skin and realizing there was no affordable ERP for small DTC brands. Built on Next.js, it uses a multi-tenant PostgreSQL database with Row-Level Security (RLS) managed via Supabase. It features an interactive dashboard showcasing real-time inventory levels, dynamic formulation calculators, and automated purchase ordering. To ensure warehouse staff can continue scanning inventory in low-connectivity areas, I implemented full PWA support with offline syncing via IndexedDB.

### What I Learned
- **Multi-Tenant Security**: Designed and audited Postgres RLS policies to guarantee strict data isolation across tenants.
- **Offline-First Architectures**: Worked with Service Workers and background sync API protocols to cache database edits and resolve sync conflicts gracefully.
- **Enterprise UI**: Learned to create complex tables, charts, and transaction audits that remain clear and easy to navigate for non-technical users.`,
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'PWA'],
    screenshots: ['/Samyah_Os_FInance.png', '/Samyah_Os.png'],
    videoUrl: undefined,
    githubUrl: 'https://github.com/mya-tech/samyah-os',
    liveUrl: undefined,
    featured: true,
  },
  {
    slug: 'eduportal',
    title: 'EduPortal GMI',
    tagline: 'Centralized educational management platform and PWA',
    description: 'A responsive, multi-role portal designed to streamline grades, attendance tracking, scheduling, and notifications for university students, teachers, and administrators.',
    story: `### The Problem
Universities with thousands of active students and teachers often struggle with fragmented administrative workflows. Keeping schedules, course materials, grades, and attendance updated in real time usually requires juggling disjointed portals, emails, paper sheets, and spreadsheets. This leads to communication gaps, zero audit trails for grade alterations, and delayed notifications for critical academic updates.

### The Build
EduPortal GMI was built to centralize academic operations for Gemini University (supporting 2,400+ students and 124+ teachers). Built on Next.js, React, and Tailwind CSS, the platform delivers customized dashboards tailored to three distinct user roles (STUDENT, TEACHER, and ADMIN). The system uses PostgreSQL and Prisma to enforce a robust schema. It features historical grade audit tracking (storing score modifications and editor footprints), transactional email notifications via Nodemailer, bulk CSV imports with validation for admin registries, and instant updates using the Web Push API.

### What I Learned
- **Secure Role-Based Access Control**: Configured role-based protection utilizing NextAuth.js credentials and middleware to safeguard routes and dashboard panels.
- **Relational Integrity & Audit Trails**: Designed a detailed 20+ model relational schema in Prisma to enforce constraints across courses, sessions, evaluations, and grades with historical score tracking.
- **Asynchronous Batch Processing**: Built backend pipelines for importing large datasets of student/teacher records using server-side CSV parsing, validating fields with Zod, and generating structured error reports.
- **Web Push Notifications & PWAs**: Implemented service workers and Web Push protocols to deliver real-time notifications directly to students' devices when grades are published or schedules change.`,
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'NextAuth.js', 'Web Push API', 'Nodemailer', 'Zod', 'next-safe-action'],
    screenshots: ['/EduPortal.png', '/eduportal2.png'],
    videoUrl: undefined,
    githubUrl: 'https://github.com/mya-tech/eduportal-gmi',
    liveUrl: undefined,
    featured: true,
  },

  {
    slug: 'fragments',
    title: 'Fragments Microservice',
    tagline: 'Cloud-native REST API with full CI/CD',
    description: 'A secure Express.js microservice with JWT/Cognito auth, deployed to AWS EC2 via Docker with 74+ integration tests.',
    story: `### The Problem
Building enterprise-grade applications requires break-apart, highly scalable backends. Handing off large monolithic architectures limits deployment agility and slows down independent team deployments.

### The Build
Fragments was built for CCP 555 (Cloud Computing) at Seneca Polytechnic. It is a highly optimized Node.js/Express.js microservice designed to ingest, process, and convert various data fragments (text, markdown, JSON, images). The service is containerized using Docker and utilizes AWS Cognito for user authentication, storing metadata in Amazon DynamoDB, and file payloads in AWS S3. The deployment is fully automated via GitHub Actions, building and pushing docker images to AWS ECR and updating EC2 server clusters.

### What I Learned
- **DevOps & CI/CD**: Mastered container orchestration using Docker, writing multi-stage Dockerfiles, and building auto-deployment pipelines.
- **Cloud Architecture**: Configured secure VPCs, security groups, application load balancers, and identity pools in AWS.
- **Rigorous Testing**: Maintained 95%+ code coverage using Jest, verifying request routing, auth gates, and edge cases.`,
    techStack: ['Node.js', 'Express.js', 'AWS EC2', 'AWS Cognito', 'S3', 'Docker', 'Jest', 'GitHub Actions'],
    screenshots: ['/Fragments.png'],
    videoUrl: undefined,
    githubUrl: 'https://github.com/mya-tech/fragments',
    liveUrl: undefined,
    featured: true,
  },

]
