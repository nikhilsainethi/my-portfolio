import { motion } from "framer-motion";

function PortfolioScrollNav() {
  return (
    <div className="text-white text-center min-h-screen bg-gradient-to-b from-[#05060f] to-[#0f0f1c] pt-32 px-4">
      <h1 className="text-4xl font-bold text-pink-400 mb-8">Hi, I'm Nikhil Sai Nethi</h1>
      <p className="text-lg max-w-2xl mx-auto text-zinc-300">
        I'm a QA Automation Engineer working with Cypress, TypeScript, and Playwright. I specialize in building scalable test systems and automating frontend workflows with modern DevOps tools.
      </p>

      <section id="education" className="mt-24">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Education</h2>
        <div className="space-y-6">
          <div className="bg-yellow-300/10 border border-yellow-400/30 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-yellow-300">California State University East Bay</h3>
            <p className="text-zinc-300">MS in Computer Science (2022–2023)</p>
          </div>
          <div className="bg-pink-300/10 border border-pink-400/30 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-pink-300">VIT University</h3>
            <p className="text-zinc-300">B.Tech in CSE (2016–2021)</p>
          </div>
        </div>
      </section>

      <section id="experience" className="mt-24">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">Experience</h2>
        <div className="space-y-6">
          <div className="bg-cyan-900/20 border border-cyan-400/30 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-cyan-300">QA Analyst @ Moody's Ratings</h3>
            <ul className="list-disc list-inside text-zinc-200 mt-2 space-y-1">
              <li>Working as a QA Automation Engineer using Cypress, TypeScript, and Playwright</li>
              <li>Collaborating closely with dev teams to enhance CI/CD coverage</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="projects" className="mt-24">
        <h2 className="text-3xl font-bold text-green-400 mb-4">Projects</h2>
        <div className="space-y-6">
          <div className="bg-[#1a1a2e] p-5 rounded-xl">
            <h3 className="text-lg font-bold text-green-300">Network Config Tool</h3>
            <p className="text-zinc-300">Dockerized Flask app to push configurations to network edge devices.</p>
          </div>
          <div className="bg-[#1a1a2e] p-5 rounded-xl">
            <h3 className="text-lg font-bold text-blue-300">Key Pair Rotation</h3>
            <p className="text-zinc-300">AWS KMS + OpenSSL tool to auto-rotate secure keypairs for 50+ services.</p>
          </div>
        </div>
      </section>

      <footer id="connect" className="mt-24 py-10 border-t border-zinc-700">
        <h3 className="text-xl font-bold text-fuchsia-300 mb-2">Let's Connect 🌐</h3>
        <p>Email: <a href="mailto:nikhilsainethi@gmail.com" className="text-cyan-400">nikhilsainethi@gmail.com</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/nikhilsai" className="text-cyan-400">linkedin.com/in/nikhilsai</a></p>
      </footer>
    </div>
  );
}

export default PortfolioScrollNav;
