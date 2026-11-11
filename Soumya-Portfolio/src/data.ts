export const profile = {
  name: "Venkata Soumya Sri Allamsetti",
  firstName: "Soumya",
  title: "B.Tech CSE Student | Software Engineer",
  location: "Visakhapatnam, Andhra Pradesh, India",
  email: "soumyasriau123@gmail.com",
  phone: "+91-9490872744",
  github: "https://github.com/Soumyasriau",
  linkedin: "https://www.linkedin.com/in/venkata-soumya-sri-allamsetti-248530331",
  tagline: "Building thoughtful web and AI tools, one project at a time.",
  about: [
    "I'm a Computer Science and Engineering student at Andhra University College of Engineering, and I love turning ideas into working software.",
    "I've built web applications and AI-powered tools with Python, Java, JavaScript and Flask, and I'm comfortable with DSA, OOP, SQL, REST API design and Git/GitHub.",
    "Over three internships in front-end development, AI/ML and data analytics, I've learned to take feedback, debug patiently and keep improving.",
    "I'm now looking for a Graduate Trainee or Software Engineer role where I can build reliable, scalable software and keep learning.",
  ],
};

export const experience = [
  {
    role: "Front End Web Development Intern",
    org: "Council for Skills and Competencies (CSC India), under AICTE–APSCHE Student Internship Initiative",
    dates: "15 May 2025 – 15 Jul 2025",
    place: "Virtual",
    bullets: [
      "Completed a structured 3-month virtual internship, building 10+ responsive, cross-browser web components using HTML, CSS and JavaScript under expert mentorship.",
      "Debugged and refined UI components based on mentor code reviews, improving component reusability and reducing layout inconsistencies.",
      "Received a Certificate of Completion issued by the Andhra Pradesh State Council of Higher Education (APSCHE).",
    ],
  },
  {
    role: "Artificial Intelligence & Machine Learning Intern (6 Weeks)",
    org: "Edunet Foundation / AICTE / IBM SkillsBuild",
    dates: "18 Jun 2025 – 30 Jul 2025",
    place: "",
    bullets: [
      "Gained practical exposure to AI/ML through structured technical training and project-based learning.",
      "Developed and presented an AI/ML-based project under mentor guidance.",
    ],
  },
  {
    role: "Artificial Intelligence & Data Analytics Intern (4 Weeks)",
    org: "Edunet Foundation / AICTE / Shell India Markets Pvt. Ltd. – Skills4Future",
    dates: "16 Jun 2025 – 16 Jul 2025",
    place: "Virtual",
    bullets: [
      "Developed foundational knowledge of AI and Data Analytics through structured virtual training.",
      "Explored practical, real-world and sustainability (Green Skills) use cases.",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  techLabel?: string;
  badge?: string;
  note?: string;
  live?: string;
  github?: string;
  repos?: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    title: "AI Story Generator",
    description: "An AI-powered application that generates unique and creative stories based on user inputs. Integrates Generative AI APIs to deliver engaging, personalized storytelling experiences. Features relevant cover images through the Unsplash API and a responsive, user-friendly interface.",
    tech: ["Python", "Flask", "Generative AI", "REST API", "Unsplash API", "HTML", "CSS", "JavaScript"],
    live: "https://storylearnai.pages.dev/",
    github: "https://github.com/Soumyasriau/AI-Story-Generator",
  },
  {
    title: "Employee Salary Prediction",
    description: "Machine learning application that predicts employee salaries based on experience, education, and job-related factors.",
    tech: ["Python", "Machine Learning", "Regression", "Streamlit"],
    live: "https://soumya-salary-predictor.streamlit.app/",
    github: "https://github.com/Soumyasriau/Employee-Salary-Prediction",
  },
  {
    title: "To-Do List",
    description: "A task management web application that helps users organize, manage, and track daily activities.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://todolist-web-6j81.onrender.com/",
    github: "https://github.com/Soumyasriau/ToDoList",
  },
  {
    title: "Weather-GPT",
    description: "A weather application that provides weather information through a simple and interactive web interface.",
    tech: ["JavaScript", "APIs", "HTML", "CSS"],
    live: "https://soumya-weather-gpt.vercel.app/",
    github: "https://github.com/Soumyasriau/Weather-GPT",
  },
  {
    title: "Smart Study Planner",
    description: "A study planning application that allows users to add tasks, track study goals, and view their schedules on a timeline.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://studysmartplanner.pages.dev/",
    github: "https://github.com/Soumyasriau/Smart-Study-Planner",
  },
  {
    title: "Snake Game",
    description: "A browser-based Snake Game featuring game logic, collision detection, and score tracking.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://soumya-snake-game.vercel.app/",
    github: "https://github.com/Soumyasriau/Snake-Game",
  },
  {
    title: "AI Mentor – Uptoskills Internship Contribution",
    description: "Part of my internship at Uptoskills, where I contribute to the existing AI Mentor platform as an intern. I receive assigned development tasks, fork and clone the repository, work on the tasks, make code improvements, and raise Pull Requests (PRs) for review and integration.",
    techLabel: "Key activities",
    tech: ["Git", "GitHub", "Repository Forking", "Cloning", "Issue-Based Development", "Code Contributions", "Pull Requests", "Team Collaboration"],
    badge: "Internship Contribution",
    github: "https://github.com/Soumyasriau/Ai_Mentor",
  },
  {
    title: "GreenIndexAI",
    description: "An AI-based project focused on environmental awareness and sustainability.",
    tech: [],
    github: "https://github.com/Soumyasriau/GreenIndexAI",
  },
  {
    title: "Garbage Classification",
    description: "A project focused on classifying garbage into different categories using a structured development workflow.",
    tech: [],
    repos: [
      { label: "Week 1", url: "https://github.com/Soumyasriau/Week-1" },
      { label: "Week 2", url: "https://github.com/Soumyasriau/Week-2" },
      { label: "Week 3", url: "https://github.com/Soumyasriau/Week-3" },
    ],
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "Java", "JavaScript", "C", "C++"] },
  { group: "Web Development", items: ["HTML5", "CSS3", "JavaScript", "Flask (REST APIs)"] },
  { group: "Databases", items: ["SQL"] },
  { group: "Core CS", items: ["Data Structures & Algorithms", "Object-Oriented Programming", "Database Management Systems", "REST API Design & Integration", "Software Development Life Cycle", "Machine Learning Fundamentals"] },
  { group: "Tools & Platforms", items: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Debugging", "Unit Testing"] },
  { group: "Soft Skills", items: ["Problem Solving", "Communication", "Critical Thinking", "Time Management", "Adaptability", "Teamwork"] },
];

export const education = [
  { school: "Andhra University College of Engineering", degree: "B.Tech – Computer Science and Engineering", detail: "CGPA: 7.35/10", years: "2023 – 2027" },
  { school: "Ascent Junior College", degree: "Intermediate (MPC), Andhra Pradesh State Board of Intermediate Education", detail: "65%", years: "2021 – 2023" },
  { school: "Sri Chaitanya Techno School, Ramnagar", degree: "Secondary School Certificate (SSC), Andhra Pradesh State Board", detail: "98%", years: "2021" },
];

export const certifications = [
  "AI For Beginners (Infosys Springboard)",
  "HTML, CSS for Beginners (freeCodeCamp)",
  "Frontend Development (GeeksforGeeks)",
  "Data Science & Analytics / Entrepreneurship Foundations (HP LIFE)",
  "MERN Stack Bootcamp: 'Launch Your Startup Idea' (5-Day Bootcamp)",
  "IBM Agentic AI: From Learner to Builder (CSRBOX)",
  "Problem Solving Basic (HackerRank)",
  "Data Structures & Algorithms (Saylor Academy)",
  "Mobile E-Commerce Mastery (Local Wala Academy)",
];

export const languages = ["Telugu (Native)", "English (Professional Proficiency)"];
