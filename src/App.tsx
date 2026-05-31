import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, CheckCircle2, Volume2, VolumeX } from "lucide-react";

// The complete exact romantic letter text requested for Rishu
const LETTER_TEXT = `Dearest Rishu,

Meri pyari si jaan ko uske hubby ki trf se namste 🙉
Hanji madam jii mood kharab h aapka koi ni thik kr diye dete h 😛😛  ik shayd aapko lgta ho ki m khush na rhta hou ya schme puar krta bhi hou ya na ya kuch bhi i don't know aap kya sochte ho ik m bhot gltiya krta hu 😛but un sab ke loye sorry meri jaan ik aapka mood thik nhi h or m to sure bhi nhi hu actually kyu nhi h bhot se reasons ho skte h mje ki baat h m sure nhi hu to iska mtlb mera hi rayta felaya hua hoga jo khud hi na smjh para😒😒but meri jaan ek bat bta du meri stories ko dekhkr khud ko dukhi mt krna na kiya kro wo sb to bss yu hi lgata hu actually yu hi nhi wp p mje ke liye lgata hu but wo sab real nhi hota.... Wo sab chod..... Mujhe btao kya hua meri jaan ko kyu dukhi sad h silent h meri jaan😘😘meri wo jaan jo hmehsa fully wild rhti h wo ek dam se ese shant si dikhw to u dk bcc kesa lgra......m ye kahna chah rha hu ki meri miss jii ...im here ... For you 🙈 always (ik 2 din shyd gayb hi rha m glti manta hu u can punish ur hubby) but I'm here.... 😒😒Pyaal krta hu ji... Udk kitna miss krta hu sara din...... Dil krta h meri jaan ke pass chla jau lekin ja nhi skta din m pta ni kitni bar chhori chhupke apni jaan ko niharta hu 😭😭 bc blush aara muj to ab.... Y blush sara din rokne ka try krta hu but rukta nhi sbse chhupane ke liye janbuj ke kbhi moo p rumaal rkh leta hu ya opposite side dekhne lgta hu..🤧🤧betha betha sochta hu 😍0jindgi m y h to jindgi mst h itni pyari 😭😭ho schme yr meri aakho se dekhna kbhi khudko ek din jrur dikhauga 💘i am so lucky schme ha wese kbhi kbhi m gussa v krta hu isi chkkr m ki yr bc itni sunder smjhdar bivi h teri frr v tu uske liye kuch nhi kr skta usko khush rkhne ke liye efforts to kr skta h na kbhi kbi muj lgta h ki m efforts na kr rha hou uske liye 😒😒 but shayd krta bhi hu idk..........madam jiii 💝 aapko nhi pta how much i love you ..... M tere se door jane ka nhi soch skta hu or ha uch nich to aa skti h and we wiyfix y sb to we know....mere ko bhut kuch khna h sch btau to but aapke samne not yu texts m... Pta samne bol bhi pauga ya nhi 😭😭jb bhi milte h bc esa lgta h first time mile ho aapse alg hi connection juda hua h or m janta hu y connection khtm to nhi hoga kbhi aapki presence mere liye soon ka kaam krti h jb hm log bestfriend the tb bhi the ese hi but obv h tb itna deep nhi the lekin ab to itna deep ja chuka hu m to bcc 😭 urgs itni peda hoti h ki kya hi btau.....m din me kai bar aapko nihar kr khud ko sukoon m rkhta hu ki koi ni ... problems overthinking ya dukhi jb bhi hone lgu to aapko dekhta hu medicine ki trh kaam krte h ha obv h sukoon h to kuch hdd tk to help hoti hi h m kbbi kbhi sochta hu bcc kesa lgra kya bn gya or kya bnta jara hu like pta nhi sudhr rha hu ya bigd rha 👽👽but mja aara aapke sath schme ..... thank you so much baby mujhe bhut sari khushiya or mere dil p raj krne ke liye 😘😘am so lucky schme lovee you meri jaan 😒💘💝..... Bivi jiii ko virtual chumma💋💋 by hubby

Forever Yours,
Riom ❤️`;

interface PolaroidData {
  id: number;
  src: string;
  caption: string;
  rotate: string;
  fallback: string;
}

const POLAROIDS: PolaroidData[] = [
  {
    id: 1,
    src: "/IMG-20260531-WA0002_2.jpg",
    caption: "Mera blush dekho baby... Pure din me na jaane kitni baar aapko nihar kar aise hi muskurata hu! 🙈💛 Mera dil bas aapka hi hai!",
    rotate: "-rotate-3 md:-rotate-2 hover:rotate-0",
    fallback: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600"
  },
  {
    id: 2,
    src: "/IMG-20260531-WA0003_2.jpg",
    caption: "Suno jaan, jab aap muskurati ho na, toh meri life ka sara stress gayab ho jata hai... My ultimate medicine! 🥰✨",
    rotate: "rotate-2 md:rotate-3 hover:rotate-0",
    fallback: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600"
  },
  {
    id: 3,
    src: "/IMG-20260531-WA0000_2.jpg",
    caption: "Aur jab meri wild jaan thodi shant hoti hai, toh mera thobda bhi aisa cute sad pouting ho jata hai... 🥺💖 Smile karo na!",
    rotate: "-rotate-1 hover:rotate-0",
    fallback: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600"
  },
  {
    id: 4,
    src: "/IMG-20260531-WA0001_2.jpg",
    caption: "Kitna pyaal karta hu mai aapse, aapko khud nahi maloom! Riom is always here for you... forever ♾️💘",
    rotate: "rotate-3 hover:rotate-0",
    fallback: "https://images.unsplash.com/photo-1501901609772-df0848060b33?q=80&w=600"
  }
];

export default function App() {
  const [stage, setStage] = useState<"envelope" | "envelope_opening" | "letter" | "celebration">("envelope");
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  
  // Staggered Polaroid triggers
  const [visiblePolaroids, setVisiblePolaroids] = useState<number[]>([]);
  const [showProposalBtn, setShowProposalBtn] = useState(false);

  // Audio BGM State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize Audio
  useEffect(() => {
    // Elegant calming classical romantic piano (Chopin's Nocturne Op 9 No 2)
    const audio = new Audio("https://upload.wikimedia.org/wikipedia/commons/f/f3/Chopin_Nocturne_Op9_No2.mp3");
    audio.loop = true;
    audio.volume = 0.45; // Soft ambient volume
    audioRef.current = audio;

    const handlePlayStatus = () => setIsPlaying(true);
    const handlePauseStatus = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlayStatus);
    audio.addEventListener("pause", handlePauseStatus);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlayStatus);
      audio.removeEventListener("pause", handlePauseStatus);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Interactive playback restriction: ", err);
      });
    }
  };

  // Background Petal Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Petals & sparkles
    const petalsCount = Math.min(45, Math.floor(width / 30));
    const sparklesCount = Math.min(30, Math.floor(width / 40));

    interface Petal {
      x: number;
      y: number;
      r: number;
      d: number;
      verticalSpeed: number;
      swing: number;
      swingSpeed: number;
      swingRange: number;
      opacity: number;
      angle: number;
      spin: number;
    }

    interface Sparkle {
      x: number;
      y: number;
      r: number;
      opacity: number;
      fadeSpeed: number;
      verticalSpeed: number;
      horizontalSpeed: number;
    }

    const petals: Petal[] = [];
    const sparkles: Sparkle[] = [];

    // Initialize petals
    for (let i = 0; i < petalsCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 8 + 6,
        d: Math.random() * 40,
        verticalSpeed: Math.random() * 1.5 + 0.8,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
        swingRange: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.5,
        angle: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.02,
      });
    }

    // Initialize sparkles
    for (let i = 0; i < sparklesCount; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.4,
        fadeSpeed: Math.random() * 0.005 + 0.003,
        verticalSpeed: Math.random() * 0.3 + 0.1,
        horizontalSpeed: (Math.random() - 0.5) * 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw sparkles
      sparkles.forEach((s) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${s.opacity})`; // Golden gold
        ctx.shadowBlur = s.r * 4;
        ctx.shadowColor = "#D4AF37";
        ctx.fill();
        ctx.restore();

        // Move
        s.y += s.verticalSpeed;
        s.x += s.horizontalSpeed;
        s.opacity -= s.fadeSpeed;

        // Reset if disappeared or out of bounds
        if (s.opacity <= 0 || s.y > height || s.x < 0 || s.x > width) {
          s.x = Math.random() * width;
          s.y = 0;
          s.opacity = Math.random() * 0.3 + 0.5;
          s.r = Math.random() * 2 + 1;
        }
      });

      // 2. Draw petals
      petals.forEach((p) => {
        p.y += p.verticalSpeed;
        p.swing += p.swingSpeed;
        p.x += Math.sin(p.swing) * p.swingRange;
        p.angle += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r * 1.3, p.r * 0.8, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 192, 203, ${p.opacity})`; // rose-soft
        ctx.fill();

        // Petal leaf center fold
        ctx.beginPath();
        ctx.moveTo(0, -p.r * 0.8);
        ctx.lineTo(0, p.r * 0.6);
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(255, 140, 160, ${p.opacity * 0.4})`;
        ctx.stroke();

        ctx.restore();

        // Reset if fallen offscreen
        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.4 + 0.5;
          p.angle = Math.random() * Math.PI;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Realistic typewriter text emitter
  useEffect(() => {
    if (stage !== "letter" || typingComplete) return;

    // Use Array.from for safety on complex Unicode surrogate pairs (emojis)
    const chars = Array.from(LETTER_TEXT);
    let index = 0;
    
    // Type out letters at 20-25ms per character
    const intervalId = setInterval(() => {
      setTypedText((prev) => prev + chars[index]);
      index++;

      if (index >= chars.length) {
        clearInterval(intervalId);
        setTypingComplete(true);
      }
    }, 24);

    return () => clearInterval(intervalId);
  }, [stage, typingComplete]);

  // When typewriter completes, stagger polaroids
  useEffect(() => {
    if (!typingComplete) return;

    // Animate polaroid appearance sequentially
    POLAROIDS.forEach((polaroid, idx) => {
      setTimeout(() => {
        setVisiblePolaroids((prev) => [...prev, polaroid.id]);
      }, (idx + 1) * 1000); // 1s spacing between cards
    });

    // After last polaroid, show final proposal panel
    setTimeout(() => {
      setShowProposalBtn(true);
    }, (POLAROIDS.length + 1.2) * 1000);
  }, [typingComplete]);

  // Skip Typing Function - Instant Reveal Touch
  const revealLetterInstantly = () => {
    setTypedText(LETTER_TEXT);
    setTypingComplete(true);
  };

  // Open envelope triggers
  const handleEnvelopeClick = () => {
    if (isFlapOpen) return;
    setIsFlapOpen(true);
    setStage("envelope_opening");

    // Automatically trigger music playback upon first direct interaction (envelope open)
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Audio autoplay prevented by security sandbox, user toggle available.", err);
      });
    }

    // Hold 1.2 seconds for realistic 3D flap rotation + sliding
    setTimeout(() => {
      setStage("letter");
    }, 1200);
  };

  // Start Proposal Climax Celebration
  const triggerCelebration = () => {
    setStage("celebration");
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-x-hidden selection:bg-rose-soft/50 py-10 px-4">
      
      {/* 1. Petals & Sparkle Canvas Background */}
      <canvas
        id="bg-canvas"
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Elegant Classical BGM Floating Controller */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {isPlaying && (
          <div className="flex gap-0.5 items-end h-3 select-none">
            <span className="w-0.5 h-3 bg-[#C06C84] rounded-full animate-[bounce_1.1s_infinite_alternate]" />
            <span className="w-0.5 h-1.5 bg-[#C06C84] rounded-full animate-[bounce_0.8s_infinite_alternate_0.2s]" />
            <span className="w-0.5 h-2.5 bg-[#C06C84] rounded-full animate-[bounce_1s_infinite_alternate_0.4s]" />
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="p-3 bg-white/80 hover:bg-white border border-rose-200/50 text-[#C06C84] rounded-full shadow-[0_8px_20px_rgba(255,192,203,0.25)] cursor-pointer flex items-center justify-center transition-all duration-300 focus:outline-none"
          title={isPlaying ? "Mute Music" : "Play Music"}
        >
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
        </motion.button>
      </div>

      {/* Main Core Container */}
      <div className="relative w-full max-w-3xl flex flex-col items-center justify-start z-10">
        
        {/* Floating title header inside active stages (stage !== celebration) */}
        {stage !== "celebration" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 select-none"
          >
            <h1 className="font-love text-5xl md:text-6xl text-[#C06C84] tracking-wider drop-shadow-sm font-semibold">
              By Your Hubby
            </h1>
            <p className="font-cursive text-2xl md:text-3xl text-gold-accent mt-2 font-bold tracking-wider">
              - Riom ❤️ Rishu -
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* STAGE 1: ENVELOPE SHOWCASE */}
          {(stage === "envelope" || stage === "envelope_opening") && (
            <motion.div
              key="envelope-stage"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0, filter: "blur(5px)" }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center justify-center min-h-[60vh]"
            >
              <p className="text-center text-rose-500/80 font-serif italic text-lg mb-8 max-w-sm px-4">
                "Rishu, a special love capsule letter is waiting for you... Tap the golden seal to break open."
              </p>

              {/* 3D Envelope Wrapper */}
              <div
                id="vintage-envelope"
                onClick={handleEnvelopeClick}
                className="relative w-72 h-48 md:w-96 md:h-64 bg-[#f2e6cb] border border-[#d2c29c] rounded-lg shadow-2xl flex items-center justify-center cursor-pointer overflow-visible transition-all duration-300 hover:shadow-[0_20px_45px_rgba(212,175,55,0.25)] group"
                style={{
                  perspective: "800px",
                  animation: "float 4.5s ease-in-out infinite"
                }}
              >
                {/* Back flap of Envelope */}
                <div className="absolute inset-0 bg-[#ebdaba] rounded-lg border-b border-r border-[#d4c19c] z-10 shadow-inner" />

                {/* Left & Right side flaps */}
                <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" viewBox="0 0 384 256">
                  {/* Left triangle flap */}
                  <path d="M0,0 L160,128 L0,256 Z" fill="#ebd7b2" opacity="0.95" />
                  {/* Right triangle flap */}
                  <path d="M384,0 L224,128 L384,256 Z" fill="#ebd7b2" opacity="0.95" />
                  {/* Bottom triangle flap */}
                  <path d="M0,256 L192,110 L384,256 Z" fill="#e4d0aa" opacity="0.97" />
                </svg>

                {/* Document preview inside (slides up on open) */}
                <motion.div
                  className="absolute bottom-2 w-[90%] h-[80%] bg-[#faf6ea] border border-[#eee2ca] rounded shadow z-15"
                  animate={isFlapOpen ? { y: -80, scale: 0.95, opacity: 0.8 } : { y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />

                {/* Top Folding Flap (Rotates on Open) */}
                <div
                  className="absolute top-0 inset-x-0 origin-top z-30 transition-transform duration-[1000ms]"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlapOpen ? "rotateX(180deg)" : "rotateX(0deg)",
                  }}
                >
                  {/* SVG top flap */}
                  <svg className="w-full h-24 md:h-32 drop-shadow-md" viewBox="0 0 384 128" fill="none">
                    <path d="M0,0 L192,128 L384,0 Z" fill="#e2ceaa" stroke="#d2bf99" strokeWidth="1" />
                  </svg>
                </div>

                {/* GOLDEN WAX SEAL WITH HEART AND TEXT */}
                <motion.div
                  className="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#E6B800] via-[#D4AF37] to-[#B8860B] rounded-full border-4 border-[#fff1ba]/50 shadow-[0_5px_15px_rgba(184,134,11,0.5)] z-40 flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-110 active:scale-95 cursor-pointer text-center"
                  animate={isFlapOpen ? { scale: 0.1, opacity: 0, rotate: 180 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-[#9a1414] fill-[#9a1414]" />
                  <span className="font-cursive text-xs md:text-sm text-amber-950 font-black tracking-tighter select-none mt-0.5">
                    Riom
                  </span>
                </motion.div>
                
                {/* Decorative retro gold text borders */}
                <div className="absolute bottom-4 left-4 font-serif italic text-[10px] text-stone-500 z-20 select-none">
                  By Hand
                </div>
                <div className="absolute bottom-4 right-4 font-serif tracking-wide text-[9px] text-[#C06C84] border border-[#C06C84]/30 px-1 py-0.5 rounded z-20 select-none">
                  L O V E
                </div>
              </div>

              {/* Tap Indicator helper */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-6 text-gold-accent font-serif text-sm flex gap-1 items-center select-none"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                Tap to Open
              </motion.div>
            </motion.div>
          )}

          {/* STAGE 2-4: THE SCROLL OF CHERISHED LOVE LETTER & MEMORIES */}
          {(stage === "letter") && (
            <motion.div
              key="letter-stage"
              initial={{ y: 80, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 60 }}
              className="w-full flex flex-col items-center"
            >
              
              {/* VINTAGE HANDWRITTEN PARCHMENT CARD */}
              <div className="relative w-full bg-[#fefdf5] border-4 border-double border-[#d4af37]/40 shadow-2xl rounded-2xl p-6 md:p-10 text-stone-800 flex flex-col z-10 overflow-hidden leading-relaxed">
                
                {/* Fine header details */}
                <div className="flex justify-between items-center border-b border-[#ebdcaa] pb-4 mb-6 select-none">
                  <div className="flex items-center gap-2 text-stone-500 font-serif text-xs italic tracking-wider">
                    <span>Inscribed: Paris-Delhi Hub ✈️</span>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-[#C06C84] uppercase font-bold text-xs tracking-widest">Permanent Bond</p>
                    <p className="font-serif italic text-[10.5px] text-stone-400">Date: 31st May 2026</p>
                  </div>
                </div>

                {/* Instant Reveal Quill feather Button in corner */}
                {!typingComplete && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={revealLetterInstantly}
                    title="Instant Reveal"
                    className="absolute top-18 right-6 bg-[#FFE4E1]/80 hover:bg-[#FFE4E1] border border-[#FFC0CB] text-[#9a1414] px-3 py-1.5 rounded-full text-xs font-serif font-semibold italic flex items-center gap-1 cursor-pointer transition shadow-sm z-30 select-none animate-pulse"
                  >
                    <span>Instant Reveal</span>
                    <span>🖋️</span>
                  </motion.button>
                )}

                {/* Primary typed letter text body with customized handwritten cursive styling */}
                <div className="font-cursive text-xl md:text-2xl text-[#3b2d18] leading-[2.1] md:leading-[2.2] space-y-4 tracking-wide break-words antialiased whitespace-pre-wrap select-text pr-2 py-2">
                  {typedText}
                  
                  {/* Blinking quill heart cursor during typing */}
                  {!typingComplete && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block text-[#9a1414] ml-1 font-sans font-bold select-none"
                    >
                      🖋️💖
                    </motion.span>
                  )}
                </div>

                {/* Faint elegant paper stamp or watermark */}
                <div className="absolute bottom-6 right-6 select-none opacity-4 pointer-events-none">
                  <Heart className="w-48 h-48 text-[#FFC0CB] stroke-current stroke-[0.3]" />
                </div>
              </div>

              {/* STAGE 3: SCATTERED POLAROID CORNER MEMORIES */}
              {typingComplete && (
                <div className="w-full mt-12 flex flex-col items-center">
                  
                  {/* Section Divider */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 mb-8 w-full select-none"
                  >
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent flex-1" />
                    <span className="font-serif italic text-lg text-stone-500 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      Captured Snapshots of Us
                    </span>
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent flex-1" />
                  </motion.div>

                  {/* Polaroid Grid Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full px-2 max-w-2xl select-none">
                    {POLAROIDS.map((card) => {
                      const isVisible = visiblePolaroids.includes(card.id);
                      return (
                        <AnimatePresence key={card.id}>
                          {isVisible && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8, y: 50 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              whileHover={{ 
                                scale: 1.04, 
                                rotate: 0, 
                                zIndex: 30,
                                shadowWidth: "20px",
                                transition: { duration: 0.3 } 
                              }}
                              className={`bg-[#fffff8] p-4 pb-6 rounded-sm shadow-xl border border-stone-100 transform transition-shadow hover:shadow-2xl ${card.rotate} origin-center flex flex-col justify-start`}
                            >
                              {/* The Photograph Container */}
                              <div className="relative aspect-[3/4] bg-stone-900 border border-stone-250/20 overflow-hidden rounded-[2px]">
                                <img
                                  src={card.src}
                                  alt="My heart Rishu"
                                  className="w-full h-full object-cover grayscale-10 hover:grayscale-0 transition-all duration-500 filter contrast-[1.05]"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    e.currentTarget.onerror = null; 
                                    e.currentTarget.src = card.fallback;
                                  }}
                                />
                                {/* Vintage Polaroid flash vignette glare overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#fff]/5 to-[#fff]/15 pointer-events-none" />
                              </div>

                              {/* Handwritten caption below photo */}
                              <p className="font-cursive text-xl text-center text-[#2c1d07] mt-4 leading-normal px-1 break-words">
                                {card.caption}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STAGE 4: GLOWING PROPOSAL PANEL & PULSING YES RESPONSE BUTTON */}
              <AnimatePresence>
                {showProposalBtn && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 45 }}
                    className="w-full mt-16 max-w-lg bg-gradient-to-br from-[#FFF5F5] via-[#FFF8F8] to-[#FFE4E1] border-2 border-double border-[#D4AF37] p-8 md:p-10 rounded-2xl shadow-[0_15px_35px_rgba(212,175,55,0.18)] text-center flex flex-col items-center select-none"
                  >
                    
                    {/* Glowing Envelope Icon decoration */}
                    <div className="w-14 h-14 bg-rose-soft/40 rounded-full flex items-center justify-center text-rose-500 mb-4 ring-4 ring-rose-100 animate-pulse">
                      <Heart className="w-6 h-6 fill-current animate-bounce" />
                    </div>

                    <h2 className="font-serif italic text-3xl md:text-4xl text-[#900C3F] font-bold tracking-tight mb-2 drop-shadow-sm leading-normal">
                      Will you be mine, forever, Rishu? 💌
                    </h2>
                    
                    <p className="font-cursive text-2xl text-amber-900 mt-1 mb-8 max-w-sm">
                      "I hold your hand in my heart, today and for all the lifetimes to come..."
                    </p>

                    {/* SINGLE ULTIMATE GOLD RESPONSE BUTTON */}
                    <motion.button
                      whileHover={{ scale: 1.07, boxShadow: "0px 10px 30px rgba(212,175,55,0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={triggerCelebration}
                      className="px-10 py-4 cursor-pointer bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#B8860B] text-amber-900 font-serif font-bold text-lg rounded-full shadow-[0_5px_20px_rgba(212,175,55,0.3)] border border-[#FFE4A1] hover:text-amber-950 transition-all duration-300 tracking-wide uppercase select-none relative focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/50"
                      style={{
                        animation: "pulse-slow 2s infinite"
                      }}
                    >
                      {/* Glitter Sparkle dots inside button */}
                      <span className="absolute -top-1 -left-1 text-xs">✨</span>
                      Yes, Always 💛
                      <span className="absolute -bottom-1 -right-1 text-xs">✨</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}

          {/* STAGE 5: CELEBRATION CLIMAX COVER - SEPARATED INTO ITS OWN ROBUST COMPONENT */}
          {stage === "celebration" && (
            <CelebrationScreen />
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}

// Full screen self-contained Celebration Component to resolve canvas rendering timing bugs perfectly
function CelebrationScreen() {
  const celebrationCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = celebrationCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeHandler);

    interface ExplosionParticle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      color: string;
      opacity: number;
      decay: number;
      spin: number;
      angle: number;
      type: "heart" | "star" | "confetti";
    }

    const particles: ExplosionParticle[] = [];

    const colors = [
      "#FFC0CB", // soft pink
      "#FF69B4", // hot pink
      "#FF1493", // deep pink
      "#D4AF37", // bright gold
      "#FFFDD0", // cream
      "#FFE4E1", // blush
      "#E0115F", // ruby red
    ];

    // Create explosion bursts from multiple spots
    const createBurst = (originX: number, originY: number, count = 45) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const types: ("heart" | "star" | "confetti")[] = ["heart", "star", "confetti"];

        particles.push({
          x: originX,
          y: originY,
          size: Math.random() * 10 + 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 3, // slightly upward gravity influence
          color,
          opacity: 1,
          decay: Math.random() * 0.008 + 0.005,
          spin: (Math.random() - 0.5) * 0.1,
          angle: Math.random() * Math.PI * 2,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
    };

    // Initial big centers burst
    createBurst(width / 2, height / 2, 70);
    createBurst(width * 0.25, height * 0.4, 45);
    createBurst(width * 0.75, height * 0.4, 45);

    // Continuous fountain fountains at the bottom
    const timer = setInterval(() => {
      createBurst(Math.random() * width, height - 20, 8);
    }, 250);

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.scale(size / 10, size / 10);
      c.beginPath();
      c.moveTo(0, -3);
      c.bezierCurveTo(-4, -7, -9, -3, -9, 2);
      c.bezierCurveTo(-9, 7, -4, 11, 0, 15);
      c.bezierCurveTo(4, 11, 9, 7, 9, 2);
      c.bezierCurveTo(9, -3, 4, -7, 0, -3);
      c.fillStyle = color;
      c.globalAlpha = alpha;
      c.fill();
      c.restore();
    };

    const drawStar = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.globalAlpha = alpha;
      c.beginPath();
      for (let i = 0; i < 5; i++) {
        c.lineTo(0, -size);
        c.rotate(Math.PI / 5);
        c.lineTo(0, -size * 0.4);
        c.rotate(Math.PI / 5);
      }
      c.closePath();
      c.fillStyle = color;
      c.shadowBlur = size * 2;
      c.shadowColor = "#D4AF37";
      c.fill();
      c.restore();
    };

    const drawConfetti = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number, angle: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.fillRect(-size / 2, -size / 4, size, size / 2);
      c.restore();
    };

    let frameId: number;

    const renderLoop = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep glowing background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#fff5f5");
      bgGrad.addColorStop(1, "#ffe4e1");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Loop particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // smooth gravity
        p.vx *= 0.98; // deceleration
        p.angle += p.spin;
        p.opacity -= p.decay;

        if (p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity);
        } else if (p.type === "star") {
          drawStar(ctx, p.x, p.y, p.size, p.color, p.opacity);
        } else {
          drawConfetti(ctx, p.x, p.y, p.size, p.color, p.opacity, p.angle);
        }
      }

      frameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      clearInterval(timer);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <motion.div
      key="celebration-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 w-full h-full z-50 flex flex-col items-center justify-center p-6 select-none bg-[#FFF8F8] overflow-hidden"
    >
      {/* Explosion Particle canvas */}
      <canvas
        id="celebration-canvas"
        ref={celebrationCanvasRef}
        className="absolute inset-0 w-full h-full z-0 block"
      />

      {/* Glowing Warm Centered content panel */}
      <div className="relative z-10 text-center max-w-xl mx-auto flex flex-col items-center">
        
        {/* Visual heart crown ring */}
        <motion.div
          initial={{ scale: 0.2, rotate: -40, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 120,
            damping: 12,
            duration: 0.8
          }}
          className="w-24 h-24 md:w-30 md:h-30 bg-[#FFD700]/15 border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-rose-500 mb-8 shadow-inner"
        >
          <Heart className="w-12 h-12 md:w-16 md:h-16 text-[#FF1493] fill-[#FF1493] filter drop-shadow-[0_0_10px_rgba(255,105,180,0.5)]" />
        </motion.div>

        {/* Ultimate glowing animated message */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            textShadow: [
              "0 0 5px #fff, 0 0 10px #ffe4e1, 0 0 15px #ffcbd5",
              "0 0 10px #fff, 0 0 20px #ffe4e1, 0 0 30px #ffcbd5",
              "0 0 5px #fff, 0 0 10px #ffe4e1, 0 0 15px #ffcbd5"
            ]
          }}
          transition={{ 
            scale: { duration: 0.6, ease: "easeOut" },
            opacity: { duration: 0.6 },
            textShadow: { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
          }}
          className="font-serif italic text-4xl md:text-5xl text-[#900C3F] font-black tracking-tight leading-normal drop-shadow-md pb-4"
        >
          "You just made me the happiest person alive, Rishu! 🌸 Riom Forever ♾️"
        </motion.div>

        {/* Sparkling gold line */}
        <div className="w-16 h-1 mt-6 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full" />

        <p className="font-love text-4xl md:text-5xl text-[#B8860B] mt-8 tracking-wide font-normal">
          With all my love and devotion, Riom ❤️
        </p>

        {/* Subtle success badge checkmark */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 flex items-center gap-2 text-stone-600 bg-white/60 backdrop-blur-sm border border-rose-200 px-4 py-2 rounded-full text-xs font-serif italic tracking-wide"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Proposal accepted for eternity
        </motion.div>
      </div>
    </motion.div>
  );
}
