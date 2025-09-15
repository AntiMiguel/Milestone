import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import { Home, Info, Clock, Mail, ChevronUp } from "lucide-react";

AOS.init({
  duration: 1000,
  once: false,
  mirror: true,
  easing: "ease-in-out",
  offset: 120
});

const milestones = [
  {
    year: 1837,
    name: "The First Mechanical Computer",
    image: "https://cdn.britannica.com/31/172531-050-E009D42C/portion-Charles-Babbage-Analytical-Engine-death-mill-1871.jpg",
    description:
      "Proposed by Charles Babbage, the analytical engine is the first mechanical computer design that introduced concepts resembling a CPU and memory.",
    impact:
      "Although never built in his lifetime, the Analytical Engine introduced the groundbreaking idea of a programmable computer. It showed how a machine could store instructions and execute different tasks without being rebuilt. This design laid the foundation for the separation of hardware and software. Later computers drew heavily on these concepts, proving that Babbage was far ahead of his time."
  },
  {
    year: 1941,
    name: "The First Programmable Computer",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh9MbE18qFFw96dRWmVqpkV-MzRVYQ25ug2NAYUyYh5D53tXpihPVQRfHTwgETJz4pjE9oLPJI7gohMs93wWFhZpAkooBfBcKivIZkZh91l0_FI9fPKK627-hgWmhoQU0PhkEvKa9jy2w/s1671/zuse-z3-2.jpg",
    description:
      "Built by Konrad Zuse, Z3 was the first programmable computer using electromechanical relays and binary arithmetic.",
    impact:
      "The Z3 demonstrated that binary-based computation could be practical and efficient. Unlike calculators designed for single tasks, it allowed programmers to change instructions using punched film. This flexibility made it a forerunner of general-purpose computers. It also proved the viability of programmable logic, a key principle in all digital computers that followed."
  },
  {
    year: 1945,
    name: "ENIAC",
    image: "https://www.simslifecycle.com/wp-content/uploads/sites/2/2022/01/Electronic-Numerical-Integrator-And-Computer.png",
    description:
      "The first general-purpose electronic computer, created by John Mauchly and J. Presper Eckert for wartime calculations.",
    impact:
      "ENIAC could perform thousands of calculations per second, which was revolutionary compared to mechanical or electromechanical machines. It enabled solutions to problems that previously took weeks or months to compute. Though programming ENIAC required rewiring, it proved that electronic circuits could handle massive workloads. This innovation laid the groundwork for stored-program computers and accelerated post-war research."
  },
  {
    year: 1951,
    name: "UNIVAC I",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Museum_of_Science%2C_Boston%2C_MA_-_IMG_3163.JPG/960px-Museum_of_Science%2C_Boston%2C_MA_-_IMG_3163.JPG",
    description:
      "The first commercially available computer, also by Mauchly and Eckert. Used for business and government applications.",
    impact:
      "UNIVAC I brought computing out of research labs and into businesses and government offices. It was capable of processing large datasets quickly, which made it appealing for census work, banking, and industry. Its commercial availability proved that computers had value beyond science and the military. This marked the birth of the computer industry as a business tool."
  },
  {
    year: 1964,
    name: "IBM System/360",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/IBM_System_360_%E3%83%BC_Computer_History_Museum_%2830781538112%29.jpg/960px-IBM_System_360_%E3%83%BC_Computer_History_Museum_%2830781538112%29.jpg?20190723212430",
    description:
      "A family of compatible computers that allowed programs to run on different models without modification.",
    impact:
      "The System/360 was revolutionary because it introduced the concept of computer families with shared architecture. Businesses could upgrade to more powerful machines without rewriting their software. This compatibility greatly reduced costs and risk, making computing more attractive to large organizations. It also influenced how future systems were designed, setting a standard for interoperability in the industry."
  },
  {
    year: 1971,
    name: "Intel 4004",
    image: "https://i.extremetech.com/imagery/content-types/039yQkr12P4wt2gAGnxWdpl/hero-image.fit_lim.size_1600x900.v1678673364.jpg",
    description:
      "The first commercial microprocessor, integrating a CPU onto a single chip.",
    impact:
      "The Intel 4004 compressed the power of a CPU into a tiny silicon chip, which drastically reduced both cost and size. This made computing more portable and affordable. It paved the way for personal computers, calculators, and embedded devices. The 4004 was the spark that ignited the microprocessor revolution, shaping the trajectory of Moore’s Law and modern electronics."
  },
  {
    year: 1975,
    name: "Altair 8800",
    image: "https://ids.si.edu/ids/deliveryService?id=NMAH-JN2014-3845&max=600",
    description:
      "A microprocessor-based computer kit popular with hobbyists, sparking the personal computer revolution.",
    impact:
      "The Altair 8800 proved that individuals could own and operate their own computers affordably. Though primitive by today’s standards, it captured the imagination of thousands of hobbyists. Its popularity inspired the creation of Microsoft, as Bill Gates and Paul Allen wrote BASIC for it. This milestone shifted computing away from institutions toward personal ownership, fueling the PC revolution."
  },
  {
    year: 1976,
    name: "Apple I",
    image: "https://ids.si.edu/ids/deliveryService?id=NMAH-JN2014-5008&max=600",
    description:
      "Designed by Steve Wozniak and marketed by Steve Jobs, one of the first fully assembled personal computers.",
    impact:
      "The Apple I simplified personal computing by shipping as a fully assembled circuit board. Unlike kits, it reduced the barrier to entry for non-technical users. It showed that computers could be marketed as consumer products, not just hobbyist projects. This innovation opened the door to the modern PC industry and influenced the rise of user-friendly computing."
  },
  {
    year: 1969,
    name: "ARPANET",
    image: "https://www.thoughtco.com/thmb/D6_Q3zEdRKNQIFEwUavkwlqS08M=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Arpanet_map_1973-5a175063494ec9003746cd60.jpg",
    description:
      "Funded by the U.S. DoD, ARPANET was the first packet-switching network, precursor to the Internet.",
    impact:
      "ARPANET changed computing forever by connecting computers into a network for the first time. It introduced packet switching, which remains the foundation of modern internet communication. Resource sharing across multiple locations demonstrated the power of connectivity. The project proved that networking could expand computing beyond isolated machines into global systems."
  },
  {
    year: 1989,
    name: "World Wide Web",
    image: "https://ewm.swiss/application/files/4016/0396/6469/World_Wide_Web_EWM_Web_Design_Agency_.jpg",
    description:
      "Invented by Tim Berners-Lee, it allowed interlinked hypertext documents accessible via browsers.",
    impact:
      "The World Wide Web democratized access to knowledge by making information easy to share and navigate. Unlike the raw Internet, the web made communication human-friendly through links and multimedia. It sparked the digital economy, from e-commerce to online media. The web transformed computers from productivity tools into essential gateways to global culture and communication."
  },
  {
    year: 2000,
    name: "Quantum Computing",
    image: "https://er.educause.edu/-/media/images/articles/2022/07/er22_3101_headerart_1600x900.jpg?hash=E89E69F74E21E075E9B0AA3816420B88742EA122",
    description:
      "A new paradigm using qubits and quantum phenomena like superposition and entanglement.",
    impact:
      "Quantum computing promises exponential leaps in processing power for certain classes of problems. It could solve cryptographic, optimization, and simulation challenges that are impossible for classical computers. While still experimental, early prototypes already hint at their transformative potential. This milestone represents the next frontier of computing, one that could redefine limits of technology."
  },
  {
    year: 2010,
    name: "AI Boom",
    image: "https://cdn.mos.cms.futurecdn.net/cuJ2nHdA2cLngX4bhsHsye-650-80.jpg.webp",
    description:
      "AI systems using machine learning and neural networks advanced dramatically thanks to big data and GPUs.",
    impact:
      "The AI boom unlocked new levels of automation and intelligence in computing. Machines now recognize speech, analyze images, and make predictions faster than humans. This progress was fueled by GPUs and massive datasets, which made neural networks practical. AI is reshaping industries, enabling smarter decision-making, and raising important social and ethical questions."
  },
  {
    year: 2020,
    name: "Edge Computing",
    image: "https://zpesystems.com/wp-content/uploads/2024/07/A-healthcare-worker-presents-various-edge-computing-concepts-to-highlight-some-of-the-applications-of-edge-computing.jpg",
    description:
      "Processing data closer to the source instead of relying on centralized cloud servers.",
    impact:
      "Edge computing improves performance by reducing latency and dependence on central servers. It allows IoT devices, vehicles, and sensors to react in real time. This reduces bandwidth costs and increases reliability in critical applications. It is vital for future innovations like self-driving cars, AR/VR, and smart cities, where instant responses are required."
  }
];

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timelineHeight, setTimelineHeight] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeYear, setActiveYear] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [screen, setScreen] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth < 768 ? "mobile" : "desktop");
      const el = document.getElementById("timeline-container");
      if (el) setTimelineHeight(el.scrollHeight + (window.innerWidth < 768 ? 150 : 0));
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
      setScrollY(window.scrollY);

      let current = null;
      milestones.forEach((m) => {
        const el = document.getElementById(`year-${m.year}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) current = m.year;
        }
      });
      setActiveYear(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCardHover = () => {
    document.querySelectorAll(".background-dots span").forEach(dot => {
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      dot.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  };
  const handleCardLeave = () => document.querySelectorAll(".background-dots span").forEach(dot => dot.style.transform = "");

  return (
    <div className="bg-dark min-h-screen text-white relative">
      <div className="background-dots">
        {Array.from({ length: 80 }).map((_, i) => (
          <span key={i} style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, width: `${4+Math.random()*6}px`, height: `${4+Math.random()*6}px`, animationDelay: `${Math.random()*5}s, ${Math.random()*3}s` }}/>
        ))}
      </div>

      <Header scrollY={scrollY} screen={screen} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}/>

      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ height: `${scrollProgress}%` }}/>
      </div>

      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? "➤" : "◀"}
      </button>
      <div className={`sidebar-years ${sidebarOpen ? "open" : ""}`}>
        {milestones.map(m => (
          <button key={m.year} onClick={() => document.getElementById(`year-${m.year}`).scrollIntoView({behavior:"smooth", block:"center"})} className={`sidebar-year-btn ${activeYear===m.year?"active":""}`}>{m.year}</button>
        ))}
      </div>

      <div id="timeline-container" className="pt-[160px] max-w-6xl mx-auto relative z-10 mt-12">
        <div className="timeline-line" style={{ height: `${timelineHeight}px` }}/>
        <ul className="relative space-y-32">
          {milestones.map((m, idx) => {
            const delay = idx * 200;
            if (screen==="mobile") return (
              <li key={idx} id={`year-${m.year}`} className="relative w-full flex flex-col items-center">
                <div className="year-circle">{m.year}</div>
                <OverlayCard milestone={m} animation="fade-up" delay={delay} onHover={handleCardHover} onLeave={handleCardLeave}/>
              </li>
            );
            const isLeft = idx%2===0;
            return (
              <li key={idx} id={`year-${m.year}`} className="relative w-full flex justify-center">
                <div className="w-full grid grid-cols-9 items-center gap-4">
                  <div className="col-span-4 flex justify-end pr-8">{isLeft && <OverlayCard milestone={m} animation="fade-right" delay={delay} onHover={handleCardHover} onLeave={handleCardLeave}/>}</div>
                  <div className="col-span-1 flex justify-center"><div className="year-circle" data-aos="fade-up">{m.year}</div></div>
                  <div className="col-span-4 flex justify-start pl-8">{!isLeft && <OverlayCard milestone={m} animation="fade-left" delay={delay} onHover={handleCardHover} onLeave={handleCardLeave}/>}</div>
                </div>
              </li>
            );
          })}
        </ul>

        {scrollY>200 && <div className="fixed bottom-6 right-6 z-50">
          <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"><ChevronUp size={28}/></button>
        </div>}
      </div>

      <footer id="footer">
        <div className="max-w-6xl mx-auto mt-20 mb-6 text-center text-gray-400 relative z-10 footer-gradient rounded-xl p-4 backdrop-blur-md shadow-inner">
          <p>Created by <span className="font-semibold cursor-pointer">Miguel Antiporda,</span> <span className="font-semibold cursor-pointer">Jad Kean Mancenido</span> & <span className="font-semibold cursor-pointer">Jayson Sundiang</span></p>
        </div>
      </footer>
    </div>
  );
}

function OverlayCard({ milestone, animation, delay, onHover, onLeave }) {
  return (
    <div data-aos={animation} data-aos-offset="200" data-aos-delay={delay} data-aos-duration="500" data-aos-easing="ease-out-cubic"
      onMouseEnter={onHover} onMouseLeave={onLeave} className="group card-hover-tilt relative w-full md:w-[28rem] h-[20rem] rounded-xl overflow-hidden shadow-xl cursor-pointer transform transition-transform duration-500">
      <img src={milestone.image} alt={milestone.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"/>
      <div className="absolute inset-0 p-6 flex flex-col justify-center items-start bg-gradient-to-t from-black/80 via-black/60 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">{milestone.name}</h3>
        <p className="text-gray-300 text-sm mb-3"><strong>Description:</strong> {milestone.description}</p>
        <p className="text-gray-200 text-sm"><strong>Impact:</strong> {milestone.impact}</p>
      </div>
    </div>
  );
}

function Header({ scrollY, screen, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 shadow-lg header-gradient transition-all duration-300" style={{padding: scrollY>50?"10px 16px":"28px 16px"}}>
      <div className="max-w-6xl mx-auto flex flex-col items-center relative">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl text-center" style={{fontSize: scrollY>50?"1.6rem":"2.8rem", transition:"all 0.3s"}}>Milestones in Computer History</h1>
        {scrollY<=50 && <p className="text-gray-300 text-sm text-center mt-1">Explore the key innovations and breakthroughs that shaped computing history.</p>}

        {screen === "mobile" ? (
          <div className="mobile-menu-wrapper mt-4 w-full flex flex-col items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="bg-white/20 p-2 rounded-lg z-50"
            >
              ☰
            </button>
            <div className={`mobile-menu-content mt-2 w-full flex flex-col items-center 
                            ${mobileMenuOpen ? "open" : ""}`}>
              <button onClick={() => window.scrollTo(0,0)} className="header-icon-mobile flex items-center gap-2">
                <Home size={24}/> Home
              </button>
              <a href="#timeline" className="header-icon-mobile flex items-center gap-2">
                <Clock size={24}/> Timeline
              </a>
              <a href="#footer" className="header-icon-mobile flex items-center gap-2">
                <Info size={24}/> Info
              </a>
              <a href="#contact" className="header-icon-mobile flex items-center gap-2">
                <Mail size={24}/> Contact
              </a>
            </div>
          </div>
        ) : (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-6">
            <button onClick={() => window.scrollTo(0,0)}><Home size={24} className="header-icon"/></button>
            <a href="#timeline"><Clock size={24} className="header-icon"/></a>
            <a href="#footer"><Info size={24} className="header-icon"/></a>
            <a href="#contact"><Mail size={24} className="header-icon"/></a>
          </div>
        )}
      </div>
    </div>
  )
}