const mongoose = require('mongoose');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import Models
const About = require('./models/About');
const Experience = require('./models/Experience');
const Project = require('./models/Project');
const Skill = require('./models/Skill');

// CV Data
const CV_DATA = {
    about: {
        bio: "Mid-level Software Engineer with 3+ years of experience building production-grade web and mobile applications. Specialized in full-stack development, real-time systems, and AI-powered solutions. Strong expertise in React, React Native (Expo), Node.js, and Python ecosystems. Proven ability to design scalable architectures, integrate APIs, and deliver high-performance applications from Figma to production.",
        summary: "Full Stack Engineer & AI Explorer based in Addis Ababa, Ethiopia.",
        socialLinks: {
            github: "https://github.com/yamlaknegash96",
            linkedin: "https://linkedin.com/in/yamlak-negash",
            twitter: "",
            website: "mailto:yamlaknegash96@gmail.com"
        }
    },
    experiences: [
        {
            company: "NYDev Co",
            role: "Full Stack Developer",
            description: "Built SJCS Digital Platform (school management system with RBAC). Architected Adama Bakery & Cake app (React Native + Chapa). Developed Bed Notification System (BNS) for hospitals using WebSockets. Co-developed JobsPark job marketplace. Designed scalable architectures with caching.",
            startDate: new Date('2025-01-01'),
            endDate: null,
            order: 1
        },
        {
            company: "Gondar & Addis Ababa Universities",
            role: "Lead Frontend Developer & Project Manager",
            description: "Led development of Procedure Notifier & BNS systems for hospital use. Translated Figma designs into production-ready interfaces. Coordinated a cross-university team.",
            startDate: new Date('2025-06-01'),
            endDate: null,
            order: 2
        },
        {
            company: "Ethronics Co",
            role: "Frontend Developer",
            description: "Engineered TG Mart e-commerce platform with multi-role architecture. Built responsive UI with React and Tailwind CSS. Integrated backend APIs for inventory, checkout, and dashboards.",
            startDate: new Date('2025-03-01'),
            endDate: new Date('2025-09-01'),
            order: 3
        },
        {
            company: "Addis Ababa University",
            role: "Teaching Assistant",
            description: "Assisted in teaching programming fundamentals. Mentored students and guided project development. Conducted tutorials and supported coursework delivery.",
            startDate: new Date('2022-01-01'),
            endDate: new Date('2023-01-01'),
            order: 4
        }
    ],
    projects: [
        {
            title: "SJCS Digital Platform",
            description: "Full institutional system with analytics, academic tracking, and financial modules. Implemented secure RBAC and real-time dashboards.",
            techStack: ["React", "Node.js", "Express", "MongoDB", "WebSockets"],
            featured: true,
            order: 1
        },
        {
            title: "Adama Bakery & Cake (ABC App)",
            description: "Full-stack e-commerce + mobile system. Payment integration (Chapa), real-time tracking, admin analytics.",
            techStack: ["React Native", "Expo", "Node.js", "MongoDB", "Chapa"],
            featured: true,
            order: 2
        },
        {
            title: "Bed Notification System (BNS)",
            description: "Real-time hospital dashboard using WebSockets. Data visualization for patient and bed management.",
            techStack: ["React", "Express", "WebSockets", "MongoDB"],
            featured: false,
            order: 3
        },
        {
            title: "JobsPark Platform",
            description: "Job marketplace with authentication, payments, and role-based flows.",
            techStack: ["React", "Node.js", "Tailwind CSS"],
            featured: false,
            order: 4
        },
        {
            title: "Banking App Reviews Analysis",
            description: "Scraped and analyzed 1,200+ reviews using NLP. Built sentiment analysis system with DistilBERT.",
            techStack: ["Python", "Hugging Face", "NLP", "Pandas"],
            featured: true,
            order: 5
        },
        {
            title: "Insurance Risk Prediction",
            description: "Built ML models (XGBoost) for insurance pricing. Applied SHAP for explainability and business insights.",
            techStack: ["Python", "XGBoost", "Scikit-Learn", "SHAP"],
            featured: true,
            order: 6
        }
    ],
    skills: [
        {
            category: "frontend",
            order: 1,
            items: [
                { name: "React", level: 95, icon: "react" },
                { name: "Next.js", level: 85, icon: "nextjs" },
                { name: "TypeScript", level: 90, icon: "typescript" },
                { name: "Tailwind CSS", level: 95, icon: "css" },
                { name: "GSAP / Framer Motion", level: 80, icon: "animation" }
            ]
        },
        {
            category: "backend",
            order: 2,
            items: [
                { name: "Node.js", level: 90, icon: "nodejs" },
                { name: "Express", level: 90, icon: "backend" },
                { name: "Django", level: 80, icon: "python" },
                { name: "FastAPI", level: 80, icon: "api" },
                { name: "MongoDB", level: 85, icon: "database" }
            ]
        },
        {
            category: "mobile",
            order: 3,
            items: [
                { name: "React Native (Expo)", level: 85, icon: "mobile" },
                { name: "Context API", level: 90, icon: "state" },
                { name: "Push Notifications", level: 80, icon: "notifications" }
            ]
        },
        {
            category: "ai",
            order: 4,
            items: [
                { name: "Python", level: 85, icon: "python" },
                { name: "Scikit-Learn", level: 80, icon: "ml" },
                { name: "Hugging Face (RAG/NLP)", level: 75, icon: "ai" },
                { name: "Pandas", level: 85, icon: "data" }
            ]
        },
        {
            category: "tools",
            order: 5,
            items: [
                { name: "Git / GitHub", level: 95, icon: "git" },
                { name: "Docker", level: 70, icon: "docker" },
                { name: "CI/CD", level: 75, icon: "pipeline" }
            ]
        }
    ]
};

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/myportfolio';
        await mongoose.connect(uri);
        console.log('MongoDB Connected correctly for Seeding...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log('Clearing existing collections (Skipping Users)...');
        await About.deleteMany({});
        await Experience.deleteMany({});
        await Project.deleteMany({});
        await Skill.deleteMany({});
        console.log('Collections cleared.');

        console.log('Seeding About...');
        await About.create(CV_DATA.about);

        console.log('Seeding Experience...');
        await Experience.insertMany(CV_DATA.experiences);

        console.log('Seeding Projects...');
        await Project.insertMany(CV_DATA.projects);

        console.log('Seeding Skills...');
        await Skill.insertMany(CV_DATA.skills);

        console.log('Data successfully seeded!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDatabase();
