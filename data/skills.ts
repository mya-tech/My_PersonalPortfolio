import { Skill } from "@/types";

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "Python", "SQL (PostgreSQL, DuckDB)", "HTML5", "CSS3", "PHP"]
  },
  {
    category: "Frameworks",
    items: ["React", "Next.js 14", "Node.js", "Express.js", "FastAPI", "Tailwind CSS", "Framer Motion"]
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS (EC2, S3, Cognito, ECR)", "Docker", "GitHub Actions", "Vercel", "Linux/Bash", "VPC Networking"]
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "Supabase", "DuckDB", "Amazon DynamoDB", "Redis (Vercel KV)", "SQLite"]
  },
  {
    category: "AI & Testing",
    items: ["NVIDIA NIM LLMs", "Prompt Engineering", "Jest", "Cypress", "Supertest", "TDD"]
  },
  {
    category: "Tools",
    items: ["Git/GitHub", "Figma", "Postman", "VS Code", "Vite", "SWR", "npm / yarn / pnpm"]
  }
];
