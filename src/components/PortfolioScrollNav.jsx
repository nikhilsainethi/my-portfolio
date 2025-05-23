import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";

function PortfolioScrollNav() {
  const [activeSection, setActiveSection] = useState('about');
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  
  // Parallax effects
  const heroY = useTransform(scrollY, [0, 800], [0, -200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Floating animation variants
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Custom hook for scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'education', 'experience', 'projects', 'connect'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const AnimatedSection = ({ children, id, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.1 });
    
    return (
      <motion.section
        ref={ref}
        id={id}
        className={className}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.section>
    );
  };

  return (
    <div className="text-white min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#16213e] relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-2 h-2 bg-white rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Enhanced Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <ul className="flex justify-center space-x-8">
            {['about', 'education', 'experience', 'projects', 'connect'].map((id) => (
              <motion.li key={id}>
                <a 
                  href={`#${id}`} 
                  className={`relative px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 ${
                    activeSection === id 
                      ? 'text-cyan-300' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                  {activeSection === id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
                      layoutId="activeTab"
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          className="min-h-screen flex items-center justify-center px-4 text-center relative"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-[#0a0a0f] to-[#1a0a2e] rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">N</span>
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Nikhil Sai Nethi
            </motion.h1>
            
            <motion.div
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-semibold">QA Automation Engineer</span>
              <br />
              Crafting scalable test systems with Cypress, TypeScript & Playwright
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {['Cypress', 'TypeScript', 'Playwright', 'AWS', 'Kubernetes'].map((tech, i) => (
                <span key={tech} className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300">
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <a 
                href="#education"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              >
                Explore My Journey
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* Education Section */}
        <AnimatedSection id="education" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Education
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                className="group p-8 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-400/20 rounded-2xl hover:border-yellow-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-black font-bold text-xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-300 group-hover:text-yellow-200 transition-colors">California State University East Bay</h3>
                    <p className="text-gray-300">MS in Computer Science</p>
                  </div>
                </div>
                <p className="text-yellow-200/80">2022–2023</p>
              </motion.div>

              <motion.div 
                className="group p-8 bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm border border-pink-400/20 rounded-2xl hover:border-pink-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">🏛</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-pink-300 group-hover:text-pink-200 transition-colors">VIT University</h3>
                    <p className="text-gray-300">B.Tech in Computer Science</p>
                  </div>
                </div>
                <p className="text-pink-200/80">2016–2021</p>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection id="experience" className="py-24 px-4 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Experience
            </motion.h2>
            
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  title: "QA Analyst @ Moody's Ratings",
                  items: [
                    "Working as a QA Automation Engineer using Cypress, TypeScript, and Playwright",
                    "Collaborating closely with dev teams to enhance CI/CD coverage"
                  ],
                  gradient: "from-cyan-500/10 to-blue-500/10",
                  border: "border-cyan-400/20 hover:border-cyan-400/40",
                  titleColor: "text-cyan-300",
                  shadow: "hover:shadow-cyan-500/20"
                },
                {
                  title: "Software Dev Co-op @ Verisk",
                  items: [
                    "Migrated monolith to AWS Lambda/S3/Step Functions/DynamoDB",
                    "Added 100+ tests and enhanced monitoring metrics"
                  ],
                  gradient: "from-purple-500/10 to-indigo-500/10",
                  border: "border-purple-400/20 hover:border-purple-400/40",
                  titleColor: "text-purple-300",
                  shadow: "hover:shadow-purple-500/20"
                },
                {
                  title: "Software Engineer @ Nokia",
                  items: [
                    "Created Python wrappers for 300+ legacy C APIs",
                    "Built scalable infrastructure for CI pipelines using Kubernetes"
                  ],
                  gradient: "from-emerald-500/10 to-teal-500/10",
                  border: "border-emerald-400/20 hover:border-emerald-400/40",
                  titleColor: "text-emerald-300",
                  shadow: "hover:shadow-emerald-500/20"
                }
              ].map((exp, i) => (
                <motion.div 
                  key={i}
                  className={`group p-8 bg-gradient-to-br ${exp.gradient} backdrop-blur-sm border ${exp.border} rounded-2xl transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl ${exp.shadow}`}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                >
                  <h3 className={`text-2xl font-bold ${exp.titleColor} mb-4 group-hover:text-opacity-90 transition-all`}>
                    {exp.title}
                  </h3>
                  <ul className="space-y-3">
                    {exp.items.map((item, j) => (
                      <motion.li 
                        key={j}
                        className="flex items-start text-gray-200"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.1 }}
                      >
                        <span className="text-cyan-400 mr-3 mt-1.5">▶</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projects" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Projects
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  title: "Network Config Tool",
                  description: "Dockerized Flask app to push configurations to network edge devices.",
                  gradient: "from-green-500/20 to-emerald-500/20",
                  titleColor: "text-green-300",
                  icon: "🌐"
                },
                {
                  title: "Key Pair Rotation",
                  description: "AWS KMS + OpenSSL tool to auto-rotate secure keypairs for 50+ services.",
                  gradient: "from-blue-500/20 to-indigo-500/20",
                  titleColor: "text-blue-300",
                  icon: "🔐"
                },
                {
                  title: "Network Performance Monitor",
                  description: "Prometheus + SNMP + K8s = real-time dashboards for 10,000+ devices.",
                  gradient: "from-cyan-500/20 to-teal-500/20",
                  titleColor: "text-cyan-300",
                  icon: "📊"
                }
              ].map((project, i) => (
                <motion.div 
                  key={i}
                  className={`group p-8 bg-gradient-to-br ${project.gradient} backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl`}
                  variants={itemVariants}
                  whileHover={{ y: -10, rotateX: 5 }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                  <h3 className={`text-xl font-bold ${project.titleColor} mb-3 group-hover:text-opacity-90 transition-all`}>
                    {project.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="connect" className="py-24 px-4 bg-gradient-to-t from-purple-900/20 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h3 
              className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Let's Connect 🌐
            </motion.h3>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-6 mt-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  type: "Email",
                  value: "nikhilsainethi@gmail.com",
                  href: "mailto:nikhilsainethi@gmail.com",
                  icon: "📧",
                  gradient: "from-red-500/20 to-pink-500/20"
                },
                {
                  type: "LinkedIn",
                  value: "linkedin.com/in/nikhilsai",
                  href: "https://www.linkedin.com/in/nikhilsai",
                  icon: "💼",
                  gradient: "from-blue-500/20 to-cyan-500/20"
                },
                {
                  type: "GitHub",
                  value: "github.com/nikhilsainethi",
                  href: "https://github.com/nikhilsainethi",
                  icon: "💻",
                  gradient: "from-gray-500/20 to-slate-500/20"
                }
              ].map((contact, i) => (
                <motion.a
                  key={i}
                  href={contact.href}
                  className={`group block p-6 bg-gradient-to-br ${contact.gradient} backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl`}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {contact.icon}
                  </div>
                  <div className="text-white font-semibold mb-1">{contact.type}</div>
                  <div className="text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors">
                    {contact.value}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </main>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default PortfolioScrollNav;