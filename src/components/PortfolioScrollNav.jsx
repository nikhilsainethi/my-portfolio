import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
// For icons, you would need to install lucide-react: npm install lucide-react
import { ChevronRight, Share2, ArrowDown, Briefcase, GraduationCap, Lightbulb, Mail, Linkedin, Github } from 'lucide-react';

// Data for sections - consider moving to a separate data file for larger projects
const educationData = [
  {
    icon: <GraduationCap className="w-6 h-6 text-yellow-400" />,
    title: "California State University East Bay",
    degree: "MS in Computer Science",
    years: "2022–2023",
    gradient: "from-yellow-500/10 to-orange-500/10",
    border: "border-yellow-400/20 hover:border-yellow-400/50",
    shadow: "hover:shadow-yellow-500/20",
    titleColor: "text-yellow-300 group-hover:text-yellow-200",
    dateColor: "text-yellow-200/80",
    iconBg: "bg-gradient-to-r from-yellow-400 to-orange-400",
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-pink-400" />,
    title: "VIT University",
    degree: "B.Tech in Computer Science",
    years: "2016–2021",
    gradient: "from-pink-500/10 to-purple-500/10",
    border: "border-pink-400/20 hover:border-pink-400/50",
    shadow: "hover:shadow-pink-500/20",
    titleColor: "text-pink-300 group-hover:text-pink-200",
    dateColor: "text-pink-200/80",
    iconBg: "bg-gradient-to-r from-pink-400 to-purple-400",
  }
];

const experienceData = [
  {
    title: "QA Analyst @ Moody's Ratings",
    items: [
      "Spearheaded QA automation using Cypress, TypeScript, and Playwright, enhancing test coverage.",
      "Collaborated closely with development teams to integrate automated tests into CI/CD pipelines."
    ],
    gradient: "from-cyan-500/10 to-blue-500/10",
    border: "border-cyan-400/20 hover:border-cyan-400/50",
    titleColor: "text-cyan-300",
    shadow: "hover:shadow-cyan-500/20",
    iconColor: "text-cyan-400"
  },
  {
    title: "Software Dev Co-op @ Verisk",
    items: [
      "Key contributor in migrating monolithic applications to a serverless architecture using AWS Lambda, S3, Step Functions, and DynamoDB.",
      "Developed and implemented over 100 automated tests, significantly improving code quality and reducing regression bugs."
    ],
    gradient: "from-purple-500/10 to-indigo-500/10",
    border: "border-purple-400/20 hover:border-purple-400/50",
    titleColor: "text-purple-300",
    shadow: "hover:shadow-purple-500/20",
    iconColor: "text-purple-400"
  },
  {
    title: "Software Engineer @ Nokia",
    items: [
      "Engineered Python wrappers for over 300 legacy C APIs, enabling modern integration capabilities.",
      "Architected and deployed scalable CI infrastructure using Kubernetes, streamlining development workflows."
    ],
    gradient: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-400/20 hover:border-emerald-400/50",
    titleColor: "text-emerald-300",
    shadow: "hover:shadow-emerald-500/20",
    iconColor: "text-emerald-400"
  }
];

const projectData = [
  {
    title: "Network Config Tool",
    description: "Dockerized Flask application to streamline pushing configurations to network edge devices, enhancing operational efficiency.",
    gradient: "from-green-600/15 to-emerald-600/15", // Slightly deeper/richer gradient
    titleColor: "text-green-300",
    icon: <Lightbulb className="w-10 h-10 text-green-400" />, // Example Lucide icon
    borderColor: "border-green-500/30 hover:border-green-500/60"
  },
  {
    title: "Key Pair Rotation",
    description: "Automated AWS KMS and OpenSSL based tool for secure keypair rotation across 50+ microservices, bolstering security posture.",
    gradient: "from-blue-600/15 to-indigo-600/15",
    titleColor: "text-blue-300",
    icon: <Github className="w-10 h-10 text-blue-400" />, // Example Lucide icon
    borderColor: "border-blue-500/30 hover:border-blue-500/60"
  },
  {
    title: "Network Performance Monitor",
    description: "Real-time monitoring solution using Prometheus, SNMP, and Kubernetes for 10,000+ devices, providing critical performance insights.",
    gradient: "from-cyan-600/15 to-teal-600/15",
    titleColor: "text-cyan-300",
    icon: <Briefcase className="w-10 h-10 text-cyan-400" />, // Example Lucide icon
    borderColor: "border-cyan-500/30 hover:border-cyan-500/60"
  }
];

const contactData = [
  {
    type: "Email",
    value: "nikhilsainethi@gmail.com",
    href: "mailto:nikhilsainethi@gmail.com",
    icon: <Mail className="w-8 h-8 text-red-400" />,
    gradient: "from-red-500/15 to-pink-500/15",
    borderColor: "border-red-400/30 hover:border-red-400/60",
    textColor: "text-red-300"
  },
  {
    type: "LinkedIn",
    value: "linkedin.com/in/nikhilsai",
    href: "https://www.linkedin.com/in/nikhilsai",
    icon: <Linkedin className="w-8 h-8 text-blue-400" />,
    gradient: "from-blue-500/15 to-cyan-500/15",
    borderColor: "border-blue-400/30 hover:border-blue-400/60",
    textColor: "text-blue-300"
  },
  {
    type: "GitHub",
    value: "github.com/nikhilsainethi",
    href: "https://github.com/nikhilsainethi",
    icon: <Github className="w-8 h-8 text-slate-400" />,
    gradient: "from-gray-600/15 to-slate-500/15", // Darker GitHub theme
    borderColor: "border-slate-400/30 hover:border-slate-400/60",
    textColor: "text-slate-300"
  }
];


function PortfolioScrollNav() {
  const [activeSection, setActiveSection] = useState('about');
  const { scrollY } = useScroll();
  const heroRef = useRef(null);

  // Parallax effects for Hero section (remains effective)
  const heroY = useTransform(scrollY, [0, 800], [0, -250]); // Slightly increased parallax
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]); // Fade out a bit sooner

  // Floating animation for Hero Icon
  const floatingVariants = {
    animate: {
      y: [0, -12, 0], // Slightly more pronounced float
      transition: {
        duration: 3.5, // A bit slower
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Container variants for staggered animations (remains effective)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Slightly increased stagger
      }
    }
  };

  // Item variants for individual element animations
  const itemVariants = {
    hidden: { y: 25, opacity: 0 }, // Start slightly lower
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6, // Slightly longer duration for smoother feel
        ease: "easeInOut" // Changed from custom cubic-bezier array
      }
    }
  };

  // Scroll Spy Logic (remains effective)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'education', 'experience', 'projects', 'connect'];
      // Adjust scroll offset based on fixed nav height + some buffer
      const scrollOffset = document.querySelector('nav')?.offsetHeight + 40 || 100; 
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the top of the section is within the offset range from the top of the viewport
          return rect.top <= scrollOffset && rect.bottom >= scrollOffset;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reusable AnimatedSection component with refined animation
  const AnimatedSection = ({ children, id, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 }); // Trigger when 20% is visible

    return (
      <motion.section
        ref={ref}
        id={id}
        className={`py-28 md:py-36 px-4 ${className}`} // Increased padding for more breathing room
        initial={{ opacity: 0, y: 40, scale: 0.98 }} // Softer entry: slightly lower, scaled down
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.9, ease: "easeInOut", delay: 0.1 }} // Changed from custom cubic-bezier array
      >
        {children}
      </motion.section>
    );
  };

  return (
    // Added font-sans for a cleaner, modern typography. Consider importing a specific font like 'Inter'.
    <div className="font-sans text-gray-100 min-h-screen bg-gradient-to-br from-[#08080d] via-[#120822] to-[#0f172a] relative overflow-x-hidden selection:bg-cyan-500 selection:text-white">
      {/* Animated background elements - more subtle and blended */}
      <div className="fixed inset-0 z-0">
        {/* Using mix-blend-screen for a lighter, ethereal effect. Reduced opacity, increased blur. */}
        <div className="absolute top-10 left-5 w-60 h-60 md:w-80 md:h-80 bg-purple-700/80 rounded-full mix-blend-screen filter blur-3xl opacity-[0.08] animate-subtle-pulse"></div>
        <div className="absolute top-1/3 right-5 w-72 h-72 md:w-96 md:h-96 bg-cyan-600/80 rounded-full mix-blend-screen filter blur-3xl opacity-[0.07] animate-subtle-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 md:w-80 md:h-80 bg-pink-600/80 rounded-full mix-blend-screen filter blur-3xl opacity-[0.09] animate-subtle-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles - more varied and subtle */}
      {[...Array(25)].map((_, i) => {
        const size = Math.random() * 2 + 0.5; // Vary size from 0.5px to 2.5px
        const duration = 5 + Math.random() * 7; // Slower, more varied duration (5s to 12s)
        return (
          <motion.div
            key={i}
            className="fixed rounded-full bg-white/70" // Slightly more visible base
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 1, // Ensure they are above the background blobs
            }}
            animate={{
              y: [0, Math.random() * -60 - 20, 0], // Increased Y movement range
              x: [0, Math.random() * 40 - 20, 0], // Added subtle X movement
              opacity: [0, Math.random() * 0.4 + 0.1, 0], // Fade in and out, more subtle max opacity
              scale: [Math.random() * 0.5 + 0.8, Math.random() * 0.5 + 1, Math.random() * 0.5 + 0.8], // Subtle scale change
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: Math.random() * duration, // Delay relative to its own duration for better spread
              ease: "linear"
            }}
          />
        );
      })}

      {/* Enhanced Navigation - more integrated and refined */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0f]/60 border-b border-white/10 shadow-lg" // Slightly more opaque bg, added shadow
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }} // Changed from custom cubic-bezier array
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3"> {/* Reduced py for a slimmer nav */}
          <ul className="flex justify-center items-center space-x-6 md:space-x-8">
            {['about', 'education', 'experience', 'projects', 'connect'].map((id) => (
              <motion.li key={id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={`#${id}`}
                  className={`relative px-3 py-2 text-sm md:text-[0.9rem] font-medium transition-colors duration-300 ${ // Slightly smaller base font
                    activeSection === id
                      ? 'text-cyan-300'
                      : 'text-slate-300 hover:text-white' // Softer inactive color
                    }`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                  {activeSection === id && (
                    <motion.div
                      className="absolute -bottom-0.5 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-t-sm" // Thicker, rounded indicator
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }} // Springy transition
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      <main className="relative z-10">
        {/* Hero Section - Refined typography and elements */}
        <motion.section
          ref={heroRef}
          id="about" // Added ID for scroll spy
          className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative pt-20" // Added pt for nav offset
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="mb-6 md:mb-8"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 relative"> {/* Slightly smaller logo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full animate-spin-slower"></div> {/* Slower spin, adjusted gradient */}
                <div className="absolute inset-1.5 md:inset-2 bg-gradient-to-br from-[#0a0a0f] via-[#100f1d] to-[#16213e] rounded-full flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">N</span>
                </div>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-5 tracking-tight bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent" // Adjusted size, tracking
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }} // Changed from custom cubic-bezier array
            >
              Nikhil Sai Nethi
            </motion.h1>

            <motion.div
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed" // Softer text color, relaxed leading
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }} // Changed from custom cubic-bezier array
            >
              <span className="font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">QA Automation Engineer</span>
              <br />
              Crafting scalable test systems with Cypress, TypeScript & Playwright. Passionate about robust and efficient software solutions.
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-12" // Reduced gap slightly
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }} // Changed from custom cubic-bezier array
            >
              {['Cypress', 'TypeScript', 'Playwright', 'AWS', 'Kubernetes', 'CI/CD'].map((tech) => ( // Added CI/CD
                <span key={tech} className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg text-xs md:text-sm font-medium hover:bg-white/20 transition-all duration-300 shadow-md"> {/* Rounded-lg, slightly more visible bg */}
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }} // Changed from custom cubic-bezier array
            >
              <a
                href="#education"
                className="inline-flex items-center px-7 py-3.5 md:px-8 md:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-base md:text-lg hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a0a0f]" // Rounded-xl, more prominent shadow, focus states
              >
                Explore My Journey
                <motion.span
                  className="ml-2.5" // Slightly more space
                  animate={{ y: [0, 3, 0] }} // Vertical bounce for arrow
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown size={20} /> {/* Lucide icon */}
                </motion.span>
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* Education Section - Refined cards */}
        <AnimatedSection id="education">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-20 tracking-tight bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Education
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-2 gap-8 md:gap-10" // Increased gap
              variants={containerVariants}
              initial="hidden"
              whileInView="visible" // Use whileInView for better scroll-triggered animation
              viewport={{ once: true, amount: 0.2 }}
            >
              {educationData.map((edu, i) => (
                <motion.div
                  key={i}
                  className={`group p-6 md:p-8 bg-gradient-to-br ${edu.gradient} backdrop-blur-md border ${edu.border} rounded-xl shadow-lg hover:shadow-2xl ${edu.shadow} transition-all duration-400 hover:!scale-[1.03]`} // Softer scale, !important to override potential conflicts
                  variants={itemVariants}
                  whileHover={{ y: -8 }} // Slightly more lift
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${edu.iconBg} rounded-lg flex items-center justify-center mr-5 shadow-md`}> {/* Icon bg, shadow */}
                      {edu.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl md:text-2xl font-semibold ${edu.titleColor} transition-colors duration-300 tracking-tight`}>{edu.title}</h3>
                      <p className="text-slate-300 text-sm md:text-base">{edu.degree}</p>
                    </div>
                  </div>
                  <p className={`${edu.dateColor} text-sm md:text-base`}>{edu.years}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Experience Section - Refined cards and list items */}
        <AnimatedSection id="experience" className="bg-[#0f172a]/30"> {/* Subtle bg change for section separation */}
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-20 tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Experience
            </motion.h2>
            <motion.div
              className="space-y-10 md:space-y-12" // Increased space
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }} // Trigger when 10% is visible for longer content
            >
              {experienceData.map((exp, i) => (
                <motion.div
                  key={i}
                  className={`group p-6 md:p-8 bg-gradient-to-br ${exp.gradient} backdrop-blur-md border ${exp.border} rounded-xl shadow-lg hover:shadow-2xl ${exp.shadow} transition-all duration-400 hover:!scale-[1.02]`}
                  variants={itemVariants}
                  whileHover={{ x: 8 }} // Subtle horizontal shift
                >
                  <h3 className={`text-xl md:text-2xl font-semibold ${exp.titleColor} mb-5 group-hover:text-opacity-90 transition-colors duration-300 tracking-tight`}>
                    {exp.title}
                  </h3>
                  <ul className="space-y-3 md:space-y-4">
                    {exp.items.map((item, j) => (
                      <motion.li
                        key={j}
                        className="flex items-start text-slate-200 leading-relaxed text-sm md:text-base" // Relaxed leading
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }} // Animate when item itself is in view
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: j * 0.15 + 0.2, ease: "easeInOut" }} // Changed from custom cubic-bezier array
                      >
                        <ChevronRight className={`${exp.iconColor} mr-2.5 mt-1 flex-shrink-0`} size={18} /> {/* Lucide icon, adjusted size and margin */}
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Projects Section - Refined cards */}
        <AnimatedSection id="projects">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-20 tracking-tight bg-gradient-to-r from-green-400 to-sky-400 bg-clip-text text-transparent" // Adjusted gradient
              variants={itemVariants}
            >
              Projects
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10" // Responsive grid
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {projectData.map((project, i) => (
                <motion.div
                  key={i}
                  className={`group p-6 md:p-8 bg-gradient-to-br ${project.gradient} backdrop-blur-md border ${project.borderColor} rounded-xl shadow-lg hover:shadow-2xl transition-all duration-400 hover:!scale-105`}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }} // Springy lift
                >
                  <div className="mb-5 text-left group-hover:scale-105 transition-transform duration-300"> {/* Icon wrapper */}
                    {project.icon}
                  </div>
                  <h3 className={`text-xl md:text-2xl font-semibold ${project.titleColor} mb-3 group-hover:text-opacity-90 transition-colors duration-300 tracking-tight`}>
                    {project.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Contact Section - Refined cards */}
        <AnimatedSection id="connect" className="bg-gradient-to-t from-[#120822]/50 to-transparent"> {/* Subtle bg gradient */}
          <div className="max-w-4xl mx-auto text-center">
            <motion.h3
              className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center justify-center"
              variants={itemVariants}
            >
              Let's Connect <Share2 className="ml-3 text-purple-400" size={30} /> {/* Lucide icon */}
            </motion.h3>
             <motion.p 
              className="text-slate-300 mb-12 md:mb-16 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
              initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{delay: 0.2, ease: "easeInOut"}} // Ensured ease is standard
            >
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </motion.p>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {contactData.map((contact, i) => (
                <motion.a
                  key={i}
                  href={contact.href}
                  className={`group block p-6 bg-gradient-to-br ${contact.gradient} backdrop-blur-md border ${contact.borderColor} rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:!scale-105`}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {contact.icon}
                  </div>
                  <div className={`font-semibold mb-1 text-lg ${contact.textColor}`}>{contact.type}</div>
                  <div className="text-cyan-400 text-xs md:text-sm group-hover:text-cyan-300 transition-colors duration-300 break-all"> {/* Break-all for long links */}
                    {contact.value}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </main>
      
      <footer className="relative z-10 text-center py-10 mt-12 border-t border-white/10">
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Nikhil Sai Nethi. All rights reserved.
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Designed with <span className="text-red-500">❤</span> and Framer Motion.
        </p>
      </footer>


      {/* Custom CSS for animations - remains mostly the same, added subtle-pulse and spin-slower */}
      <style jsx global>{`
        /* Optional: Define a global font if not using Tailwind's default sans stack effectively */
        /* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'); */
        /* body { font-family: 'Inter', sans-serif; } */

        .animate-spin-slower { /* Renamed from spin-slow for clarity */
          animation: spin 8s linear infinite; /* Slower spin */
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

        /* New subtle pulse animation for background blobs */
        @keyframes subtle-pulse {
          0%, 100% { opacity: var(--opacity-start, 0.07); transform: scale(1); }
          50% { opacity: var(--opacity-end, 0.12); transform: scale(1.05); }
        }
        .animate-subtle-pulse {
          /* You can set these CSS variables inline on the elements if you want different opacities per blob */
          animation: subtle-pulse 10s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default PortfolioScrollNav;