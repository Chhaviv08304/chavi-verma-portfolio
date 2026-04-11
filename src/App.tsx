import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Download, Menu, X, Sun, Moon, Briefcase, Award, Terminal, Database, Layout, Server, Shield, Cloud, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Hooks ---
const useTypingEffect = (words: string[], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
};

// --- Components ---

const Navbar = ({ isDarkMode, toggleTheme }: { isDarkMode: boolean, toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'Experience', 'Projects', 'Skills', 'Education'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/50 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#home" className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2" aria-label="Home">
          <Terminal className="w-6 h-6 text-pink-500" />
          Chavi Verma
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-zinc-400 hover:text-pink-400 transition-colors">
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full text-zinc-400 hover:text-pink-400 hover:bg-zinc-800 transition-colors" aria-label="Toggle Dark Mode">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <a href="#contact" className="px-5 py-2.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 text-sm font-medium hover:bg-pink-500 hover:text-zinc-900 transition-all duration-300">
            Contact Me
          </a>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-zinc-400 hover:text-pink-400" aria-label="Toggle Dark Mode">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className="text-zinc-400 hover:text-pink-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 right-0 bg-zinc-900 border-b border-zinc-800 p-6 md:hidden flex flex-col gap-4 shadow-xl">
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-pink-400 font-medium">
                {link}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-pink-400 font-medium pt-2 border-t border-zinc-800">Contact Me</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const typedText = useTypingEffect(["Full-Stack Developer", "AI/ML Enthusiast", "Competitive Programmer"]);

  return (
    <section id="home" className="pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 min-h-[90vh]">
      <div className="flex-1 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            Available for Internships 🚀
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-4">
            Hi, I'm <span className="text-pink-500">Chavi Verma</span> 👋
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-zinc-400 h-10">
            I am a <span className="text-white">{typedText}</span><span className="animate-pulse text-pink-500">|</span>
          </h2>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-lg text-zinc-400 max-w-xl leading-relaxed space-y-4">
          <p>
            B.Tech CSE student at Inderprastha Engineering College 🎓 (<strong className="text-white">8.0 CGPA</strong>). I specialize in building scalable products, mastering the MERN stack, and exploring AI/ML 💡.
          </p>
          <div className="flex items-center gap-3 text-sm font-mono text-pink-400 bg-pink-500/5 border border-pink-500/10 p-3 rounded-xl w-fit">
            <Code2 className="w-5 h-5" />
            <span>Solved 200+ LeetCode problems 🧠</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap items-center gap-4 pt-4">
          <a href="#projects" className="px-8 py-3.5 rounded-xl bg-pink-500 text-black font-bold hover:bg-pink-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            View Projects
          </a>
          <a href="/chavi_resume.txt" target="_blank" rel="noreferrer" className="px-8 py-3.5 rounded-xl border border-zinc-700 font-semibold text-white hover:border-pink-500 hover:bg-zinc-800 hover:scale-105 transition-all flex items-center gap-2">
            Resume <Download className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex items-center gap-6 pt-6">
          <a href="https://www.linkedin.com/in/chavi-verma/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-pink-400 hover:scale-110 transition-all" aria-label="LinkedIn"><Linkedin className="w-6 h-6" /></a>
          <a href="https://github.com/Chhaviv08304" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-pink-400 hover:scale-110 transition-all" aria-label="GitHub"><Github className="w-6 h-6" /></a>
          <a href="https://leetcode.com/u/chhavi_verma__/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-pink-400 hover:scale-110 transition-all" aria-label="LeetCode"><Code2 className="w-6 h-6" /></a>
        </motion.div>
      </div>
      
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-64 h-64 md:w-96 md:h-96 relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500/30 to-rose-500/30 blur-3xl animate-pulse"></div>
        <div className="w-full h-full rounded-full border-2 border-pink-500/30 p-2 relative z-10">
          <img src="/profile.jpg" alt="Chavi Verma" className="w-full h-full object-cover rounded-full border border-zinc-800" onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/chavi/800/800'; }} />
        </div>
      </motion.div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      role: "Microsoft Azure Intern ☁️",
      company: "Microsoft Elevate Program & AICTE",
      date: "Jan 2026 – Feb 2026",
      icon: <Cloud className="w-5 h-5 text-pink-400" />,
      achievements: [
        "Provisioned Azure infrastructure maintaining 99.9% uptime for IaaS/PaaS deployments.",
        "Optimized resource utilization using Azure Monitor, reducing simulated over-provisioning by 30%."
      ]
    },
    {
      role: "Cybersecurity Intern 🛡️",
      company: "Cisco Networking Academy",
      date: "Jun 2025 – Aug 2025",
      icon: <Shield className="w-5 h-5 text-rose-400" />,
      achievements: [
        "Identified and mitigated 2+ critical threat vectors via vulnerability assessments.",
        "Completed 10+ hands-on labs in firewall configuration and access control, improving security posture by 40%."
      ]
    },
    {
      role: "AI & Machine Learning Intern 🤖",
      company: "Edunet Foundation & AICTE",
      date: "Jun 2025 – Jul 2025",
      icon: <Database className="w-5 h-5 text-purple-400" />,
      achievements: [
        "Built 3+ supervised ML models (Python, Scikit-learn, Pandas), achieving up to 85% classification accuracy.",
        "Developed NLP pipelines for text classification with tokenization and feature extraction."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
          <Briefcase className="w-8 h-8 text-pink-500" />
          Experience Timeline
        </h2>
        <p className="text-zinc-400 mt-4">My professional journey and internships.</p>
      </motion.div>

      <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-0 space-y-12">
        {experiences.map((exp, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative pl-8 md:pl-12">
            <div className="absolute -left-[21px] top-1 w-10 h-10 rounded-full bg-black border-2 border-zinc-800 flex items-center justify-center shadow-lg">
              {exp.icon}
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 md:p-8 hover:border-pink-500/30 transition-colors shadow-sm">
              <h3 className="text-xl md:text-2xl font-bold text-white">{exp.role}</h3>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2 mb-6">
                <span className="text-pink-400 font-medium">{exp.company}</span>
                <span className="hidden md:block text-zinc-600">•</span>
                <span className="text-sm text-zinc-500 font-mono">{exp.date}</span>
              </div>
              <ul className="space-y-3">
                {exp.achievements.map((ach, j) => (
                  <li key={j} className="text-zinc-400 flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Neural Search Engine 🔍",
      desc: "Architected a semantic search engine cutting retrieval time by ~40% over keyword search across 50+ documents using sentence-transformer embeddings and cosine similarity ranking.",
      tech: ["Python", "Streamlit", "NLP", "Vector Embeddings"],
      github: "https://github.com/Chhaviv08304/neural-search-engine",
      live: "https://chavi-neural-search.streamlit.app/",
      image: "/neural.png",
      colSpan: "md:col-span-1",
      accent: "from-pink-500/20 to-blue-500/20"
    },
    {
      title: "MERN Expense Tracker 💰",
      desc: "Engineered full-stack MERN app with JWT auth, role-based access control, and RESTful backend. Designed React dashboards for real-time analytics.",
      tech: ["React.js", "Node.js", "MongoDB", "JWT", "REST API"],
      github: "https://github.com/Chhaviv08304/expense-tracker",
      live: null,
      image: "/expense.jpeg",
      colSpan: "md:col-span-1",
      accent: "from-rose-500/20 to-teal-500/20"
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
          <Layout className="w-8 h-8 text-pink-500" />
          Featured Projects
        </h2>
        <p className="text-zinc-400 mt-4">Real-world applications I've built from the ground up.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} 
            className={`group relative bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 md:p-8 overflow-hidden hover:-translate-y-2 transition-all duration-300 ${project.colSpan}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <div className="relative z-10 flex flex-col h-full">
              {project.image && (
                <div className="w-full h-48 md:h-64 mb-6 rounded-2xl overflow-hidden border border-zinc-800/50 relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${project.title.replace(/\s+/g, '')}/800/400`; }} />
                </div>
              )}
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-zinc-800/50 border border-zinc-700/50">
                  <Code2 className="w-6 h-6 text-pink-400" />
                </div>
                <div className="flex gap-3">
                  <a href={project.github} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors" aria-label="GitHub">
                    <Github className="w-5 h-5" />
                  </a>
                  {project.live && project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors" aria-label="Live Demo">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">{project.title}</h3>
              <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">{project.desc}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 text-xs font-medium text-pink-300 bg-pink-500/10 border border-pink-500/20 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Skills = () => {
  const skillGroups = [
    { title: "Languages 🗣️", icon: <Code2 className="w-5 h-5" />, skills: ["C++", "Python", "JavaScript", "HTML5", "CSS3"] },
    { title: "Core Concepts 🧠", icon: <Terminal className="w-5 h-5" />, skills: ["Data Structures", "Algorithms", "System Design", "OOP"] },
    { title: "Development 💻", icon: <Server className="w-5 h-5" />, skills: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API", "JWT"] },
    { title: "Tools & Cloud ☁️", icon: <Cloud className="w-5 h-5" />, skills: ["Microsoft Azure", "GCP", "Git", "GitHub", "Scikit-learn", "Streamlit"] }
  ];

  return (
    <section id="skills" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
          <Terminal className="w-8 h-8 text-pink-500" />
          Skills Bento
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillGroups.map((group, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 hover:border-pink-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-6 text-white">
              <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
                {group.icon}
              </div>
              <h3 className="font-bold">{group.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-sm text-zinc-300 hover:text-pink-300 hover:border-pink-500/30 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Education = () => {
  return (
    <section id="education" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
          <Award className="w-8 h-8 text-pink-500" />
          Education & Certifications
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 hover:border-pink-500/30 transition-colors">
          <h3 className="text-2xl font-bold text-white mb-2">B.Tech in Computer Science & Engineering 🎓</h3>
          <p className="text-pink-400 font-medium mb-4">Inderprastha Engineering College, Ghaziabad</p>
          <p className="text-zinc-400 text-sm font-mono mb-6">Aug 2023 – Aug 2027 (Expected)</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30">
              <span className="text-zinc-300 font-medium">Current CGPA</span>
              <span className="text-xl font-bold text-pink-400">8.0 / 10</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-300">Coursework:</strong> DSA, Operating Systems, DBMS, Computer Networks, System Design, OOP
            </p>
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 hover:border-pink-500/30 transition-colors flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 shrink-0">
              <Award className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Oracle Certified Generative AI Professional 📜</h3>
              <p className="text-zinc-400 text-sm">Oracle University • Sep 2025</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 hover:border-pink-500/30 transition-colors flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 shrink-0">
              <Award className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Oracle Certified Foundations Associate 🏅</h3>
              <p className="text-zinc-400 text-sm">Oracle University • Oct 2025</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" className="border-t border-zinc-800 bg-black py-12 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-white mb-2">Let's Connect 🤝</h2>
        <p className="text-zinc-400 text-sm">Open for Software Development & Full-Stack Internships 🚀.</p>
        <a href="mailto:chaviverma100@gmail.com" className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 mt-4 font-medium transition-colors">
          <Mail className="w-4 h-4" /> chaviverma100@gmail.com
        </a>
      </div>
      
      <div className="flex items-center gap-4">
        <a href="https://www.linkedin.com/in/chavi-verma/" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-pink-400 hover:border-pink-500/30 hover:-translate-y-1 transition-all" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
        <a href="https://github.com/Chhaviv08304" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-pink-400 hover:border-pink-500/30 hover:-translate-y-1 transition-all" aria-label="GitHub"><Github className="w-5 h-5" /></a>
        <a href="https://leetcode.com/u/chhavi_verma__/" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-pink-400 hover:border-pink-500/30 hover:-translate-y-1 transition-all" aria-label="LeetCode"><Code2 className="w-5 h-5" /></a>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-800/50 text-center text-zinc-500 text-sm">
      © 2026 Chavi Verma. Built with React & Tailwind.
    </div>
  </footer>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved !== 'light';
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
      </main>
      <Footer />
    </div>
  );
}
