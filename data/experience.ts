import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "gemini-univ",
    role: "Junior Frontend Developer",
    company: "Gemini Université",
    period: "Sept 2025 - Present",
    bullets: [
      "Engineered responsive dashboard panels and data visualizations using Next.js, React, and TypeScript.",
      "Collaborated with UI/UX designers to implement pixel-perfect design systems with strict Tailwind CSS standards.",
      "Optimized client-side rendering times by 30% through dynamic imports, code splitting, and smart image optimization.",
      "Wrote comprehensive unit and integration tests using Jest and Cypress to support continuous integration."
    ],
    type: "research"
  },
  {
    id: "samyah",
    role: "Founder & CEO",
    company: "Samyah For Skin",
    period: "June 2023 - Present",
    bullets: [
      "Launched and scaled an e-commerce skincare brand serving 1,000+ customers across North America.",
      "Architected and deployed Samyah OS, a custom multi-tenant SaaS ERP to manage formulation sheets, raw materials, and suppliers.",
      "Created fully responsive landing pages and high-converting checkouts utilizing React and payment gateway APIs.",
      "Designed brand identities, product packaging guidelines, and targeted digital marketing campaigns."
    ],
    type: "founder"
  },
  {
    id: "seneca",
    role: "Research Assistant Frontend Developer",
    company: "Seneca Polytechnic",
    period: "Jan 2025 - Aug 2025",
    bullets: [
      "Built and optimized interactive research visualization platforms utilizing React and WebGL.",
      "Developed secure, containerized microservices deployed on AWS with fully automated CI/CD pipelines.",
      "Authored research reports on cloud-native technologies and microservices API latency optimizations.",
      "Mentored junior team members on Git workflows, TypeScript code guidelines, and responsive layouts."
    ],
    type: "research"
  },
  {
    id: "tdsb",
    role: "Junior Web Developer Co-op",
    company: "Toronto District School Board (TDSB)",
    period: "Sept 2024 - Dec 2024",
    bullets: [
      "Maintained and updated internal web applications using HTML, CSS, JavaScript, and PHP.",
      "Conformed old web forms to modern WCAG 2.1 accessibility guidelines, making them usable with screen readers.",
      "Automated database sanitization and export processes using custom Bash and SQL scripts, reducing admin hours by 15%.",
      "Investigated and resolved user-reported interface bugs and browser compatibility issues."
    ],
    type: "coop"
  }
];
