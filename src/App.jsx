import React, { useState, useEffect, useMemo, useRef } from 'react';
import './App.css';

function ZenParticles({ confidence }) {
  const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 2,
    duration: Math.random() * 10 + 10
  })), []);

  return (
    <div className="zen-particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `translate(${confidence * 50 - 25}px, ${confidence * 50 - 25}px)`,
            opacity: 0.1 + (confidence * 0.4),
            transitionDuration: `${p.duration}s`
          }}
        />
      ))}
    </div>
  );
}

function SketchPad() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="rv-canvas-container">
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="rv-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <button className="button-secondary" onClick={clear} style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '10px', padding: '4px 8px' }}>Clear</button>
    </div>
  );
}

const CONTENT = {
  clinical: {
    title: "Signal Detection Exercise",
    subtitle: "Train sensitivity to weak perceptual differences under uncertainty.",
    description: "This exercise presents four visually identical tiles. One tile contains a subtle, controlled difference. Your task is to identify the target based on perceptual cues, not inference.",
    instructions: "Explore the tiles using touch or cursor movement. Select the tile you believe is the target.",
    note: "Accuracy improves when response time is sufficient to sample all options.",
    correct: "Correct",
    correctSub: "Target detected.",
    incorrect: "Incorrect",
    incorrectSub: "Response did not match target.",
    hint: "Performance at this difficulty typically improves with slower sampling.",
    reflection: "Self‑report: How confident were you in this choice?",
    labels: ["Guessing", "Calibrated Judgment"],
    reveal: "Target image revealed for verification.",
    ethics: "This exercise measures perceptual sensitivity and confidence calibration.",
    summaryTitle: "Session Summary",
    summaryInterp: "Your sensitivity at this difficulty is above baseline but not yet stable.",
    passLabel: "Pass",
    encouragement: {
      6: "You're beginning to tune in.",
      8: "Steady focus is showing results.",
      10: "Significant intuitive alignment.",
      12: "Excellent sensory detection.",
      14: "Exceptional intuitive awareness."
    }
  },
  warm: {
    title: "Sense Before You Decide",
    subtitle: "Practice noticing subtle differences without rushing to explain them.",
    description: "Sometimes something feels different before you can say why. This exercise helps you slow down and notice those quiet signals.",
    instructions: "One tile is subtly different. Take a moment to explore each one. When you’re ready, choose the tile that feels different.",
    note: "If you feel rushed, pause for one breath before choosing.",
    correct: "Nice catch.",
    correctSub: "You noticed a subtle difference.",
    incorrect: "That’s okay.",
    incorrectSub: "Misses are part of learning to tune in.",
    hint: "Try slowing down and checking all four tiles once.",
    reflection: "Quick check‑in: How did this choice feel?",
    labels: ["Mostly guessing", "Strong sense"],
    reveal: "Here’s what was behind the tile.",
    revealSub: "Notice what you felt before you saw it.",
    ethics: "This practice is about attention and awareness — not being \"right.\"",
    summaryTitle: "What we noticed today",
    summaryInterp: "Give yourself one extra moment before deciding.",
    passLabel: "Pass",
    encouragement: {
      6: "You're beginning to tune in.",
      8: "Steady focus is showing results.",
      10: "Significant intuitive alignment.",
      12: "Excellent sensory detection.",
      14: "Exceptional intuitive awareness."
    }
  }
};

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1542080681-b52d382482b0?auto=format&fit=crop&w=400&q=80', label: 'Suspicion', meaning: 'Narrowed eyes and lowered brows often signal a lack of trust.' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', label: 'Contempt', meaning: 'Asymmetric lip tightening can indicate a sense of superiority.' },
  { src: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=80', label: 'Surprise', meaning: 'Raised eyebrows and widened eyes signal a sudden shift in attention.' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', label: 'Engagement', meaning: 'Leaning in and maintaining soft eye contact shows active interest.' },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', label: 'Doubt', meaning: 'A slight head tilt and pursed lips often precede a question.' },
  { src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', label: 'Authority', meaning: 'A steady, level gaze and upright posture command presence.' },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', label: 'Discomfort', meaning: 'Touching the neck or adjusting clothing are common self-soothing cues.' },
  { src: 'https://images.unsplash.com/photo-1531746020798-e795c5399c47?auto=format&fit=crop&w=400&q=80', label: 'Sadness', meaning: 'Drooping upper eyelids and loss of focus in the eyes signal withdrawal.' },
  { src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', label: 'Focus', meaning: 'Dilated pupils and stillness indicate high cognitive load.' },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80', label: 'Joy', meaning: 'Muscle movement around the eyes (crow’s feet) indicates a genuine smile.' },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', label: 'Hesitation', meaning: 'Rapid blinking can indicate internal conflict or anxiety.' },
  { src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80', label: 'Anger', meaning: 'Pursed lips and a focused glare show building frustration.' },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', label: 'Fear', meaning: 'Increased visibility of the whites of the eyes is a universal threat signal.' },
  { src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80', label: 'Listening', meaning: 'Exposing the ear by tilting the head shows receptive openness.' },
  { src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80', label: 'Disgust', meaning: 'A crinkled nose and raised upper lip signal strong aversion.' },
  { src: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&q=80', label: 'Defiance', meaning: 'Raising the chin makes the neck vulnerable, signaling lack of fear.' },
  { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80', label: 'Thought', meaning: 'Fingers touching the chin or lips often accompany deep focus.' },
  { src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80', label: 'Boredom', meaning: 'A resting head in hands indicates a loss of sensory engagement.' },
  { src: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80', label: 'Interest', meaning: 'Mirrored body language shows a sense of rapport and alignment.' },
  { src: 'https://images.unsplash.com/photo-1491349174775-aaaf99c9e7aa?auto=format&fit=crop&w=400&q=80', label: 'Anxiety', meaning: 'Frequent shifting of the gaze can indicate a search for a way out.' },
  { src: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=400&q=80', label: 'Confidence', meaning: 'An open chest and steady breathing indicate a state of flow.' },
  { src: 'https://images.unsplash.com/photo-1512485600893-b08ec1d59b1c?auto=format&fit=crop&w=400&q=80', label: 'Submission', meaning: 'Looking down and slightly shrinking the posture signals non-aggression.' },
  { src: 'https://images.unsplash.com/photo-1474176857210-7287d38d27c6?auto=format&fit=crop&w=400&q=80', label: 'Playfulness', meaning: 'A slight eye squint and relaxed jaw show lighthearted intent.' },
  { src: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=400&q=80', label: 'Observation', meaning: 'A neutral, scanning gaze is used to take in wide social fields.' }
];

const RV_TARGETS = [
  { id: 'RV-001', name: 'Ancient Ruins', src: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=800&q=80', location: 'Machu Picchu, Peru', description: 'Terraced stone structures on a mountain ridge.' },
  { id: 'RV-002', name: 'Industrial Complex', src: 'https://images.unsplash.com/photo-1565463776629-4b6e5682855b?auto=format&fit=crop&w=800&q=80', location: 'Steel Works', description: 'Heavy metal structures, smoke, and linear pipes.' },
  { id: 'RV-003', name: 'Natural Wonder', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', location: 'Mount Everest', description: 'Jagged white peaks against a blue sky, extremely cold.' },
  { id: 'RV-004', name: 'Maritime Structure', src: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80', location: 'Golden Gate Bridge', description: 'Large red structure over blue water, foggy atmosphere.' },
  { id: 'RV-005', name: 'Historic Sanctuary', src: 'https://images.unsplash.com/photo-1564507592333-c60657eaa0ae?auto=format&fit=crop&w=800&q=80', location: 'Taj Mahal', description: 'White domed structure with reflecting pools, symmetry.' },
];

const MAX_TRIALS = 24;

function App() {
  const [mode, setMode] = useState('esp'); // 'esp' or 'rv'
  const [theme, setTheme] = useState('warm');
  const [screen, setScreen] = useState('intro');
  const [targetIndex, setTargetIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [confidence, setConfidence] = useState(0.5);
  const [history, setHistory] = useState([]);
  const [hits, setHits] = useState(0);
  const [streak, setStreak] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [showGoalFeedback, setShowGoalFeedback] = useState("");
  const [soundscapeEnabled, setSoundscapeEnabled] = useState(false);
  const [driftEnabled, setDriftEnabled] = useState(false);
  const [personalBest, setPersonalBest] = useState(0);

  // RV Specific State
  const [rvTarget, setRvTarget] = useState(null);
  const [rvCoordinate, setRvCoordinate] = useState("");
  const [rvStep, setRvStep] = useState(0); // 0: Start, 1: Sensories, 2: Sketch, 3: AOL, 4: Reveal
  const [rvData, setRvData] = useState({ sensories: "", aol: "" });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const pb = localStorage.getItem('esp_personal_best');
    if (pb) setPersonalBest(parseInt(pb));
  }, [theme]);

  // Audio Context for Soundscapes
  const soundContext = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  useEffect(() => {
    let oscL = null;
    let oscR = null;
    let merger = null;
    let pannerL = null;
    let pannerR = null;

    if (soundscapeEnabled && screen === 'exercise' && soundContext) {
      merger = soundContext.createChannelMerger(2);

      oscL = soundContext.createOscillator();
      pannerL = soundContext.createStereoPanner();
      pannerL.pan.value = -1;
      oscL.frequency.value = 200;

      oscR = soundContext.createOscillator();
      pannerR = soundContext.createStereoPanner();
      pannerR.pan.value = 1;
      oscR.frequency.value = 200 + 10; // 10Hz Binaural Beat

      const gain = soundContext.createGain();
      gain.gain.setValueAtTime(0, soundContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.02, soundContext.currentTime + 1);

      oscL.connect(pannerL).connect(gain);
      oscR.connect(pannerR).connect(gain);
      gain.connect(soundContext.destination);

      oscL.start();
      oscR.start();
    }
    return () => {
      if (oscL) oscL.stop();
      if (oscR) oscR.stop();
    };
  }, [soundscapeEnabled, screen, soundContext]);

  const startRV = () => {
    const target = RV_TARGETS[Math.floor(Math.random() * RV_TARGETS.length)];
    const coordinate = Math.floor(Math.random() * 89999999 + 10000000).toString();
    setRvTarget(target);
    setRvCoordinate(coordinate);
    setRvStep(0);
    setRvData({ sensories: "", aol: "" });
    setScreen('rv');
  };

  const startExercise = () => {
    setScreen('calibration');
    setTimeout(() => {
      setTargetIndex(Math.floor(Math.random() * 4));
      setSelectedIndex(null);
      setScreen('exercise');
      setStartTime(Date.now());
    }, 4000);
  };

  const handleSelect = (index) => {
    const isCorrect = index === targetIndex;
    setSelectedIndex(index);
    setScreen('feedback');
    const duration = (Date.now() - startTime) / 1000;

    const newHistory = [...history, {
      correct: isCorrect,
      latency: duration,
      confidence,
      type: 'choice',
      target: targetIndex,
      imageObj: IMAGES[history.length]
    }];
    setHistory(newHistory);

    if (isCorrect) {
      const newHits = hits + 1;
      const newStreak = streak + 1;
      setHits(newHits);
      setStreak(newStreak);
      playChime(1.0 + (newStreak * 0.05));
      triggerHaptic();

      const bonus = copy.encouragement?.[newHits];
      if (bonus) setShowGoalFeedback(bonus);
    } else {
      setStreak(0);
      playMiss();
    }
  };

  const handlePass = () => {
    setHistory([...history, { type: 'pass', latency: (Date.now() - startTime) / 1000 }]);
    startExercise();
  };

  const playChime = (pitchScale = 1.0) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.connect(env);
      env.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880 * pitchScale, ctx.currentTime);
      env.gain.setValueAtTime(0, ctx.currentTime);
      env.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
      env.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
      osc.start();
      osc.stop(ctx.currentTime + 1);
    } catch (e) { }
  };

  const playMiss = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.connect(env);
      env.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      env.gain.setValueAtTime(0, ctx.currentTime);
      env.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      env.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) { }
  };

  const triggerHaptic = () => {
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  };

  const nextTrial = () => {
    setShowGoalFeedback("");
    if (history.length >= MAX_TRIALS) {
      if (hits > personalBest) {
        setPersonalBest(hits);
        localStorage.setItem('esp_personal_best', hits.toString());
      }
      setScreen('summary');
    } else {
      startExercise();
    }
  };

  const correlation = useMemo(() => {
    const choices = history.filter(h => h.type === 'choice');
    if (choices.length === 0) return "0.00";
    let matched = 0;
    choices.forEach(h => {
      if ((h.confidence > 0.5 && h.correct) || (h.confidence <= 0.5 && !h.correct)) matched++;
    });
    return (matched / choices.length).toFixed(2);
  }, [history]);

  const trendPath = useMemo(() => {
    if (history.length < 2) return "";
    return history.map((h, i) => {
      const x = (i / (MAX_TRIALS - 1)) * 100;
      const y = 100 - (h.confidence * 100);
      return `${x},${y}`;
    }).join(" ");
  }, [history]);

  const archetype = useMemo(() => {
    const choices = history.filter(h => h.type === 'choice');
    if (choices.length < 5) return { name: "Analyzing...", desc: "Complete more trials to reveal your profile." };

    const avgLatency = choices.reduce((a, h) => a + h.latency, 0) / choices.length;
    const avgCorrect = hits / choices.length;
    const avgConfidence = choices.reduce((a, h) => a + h.confidence, 0) / choices.length;

    if (avgLatency < 0.8 && avgCorrect > 0.4) return { name: "The Fast Observer", desc: "You register social signals before your conscious mind intervenes." };
    if (avgConfidence < 0.3 && avgCorrect > 0.4) return { name: "The Quiet Sensor", desc: "You possess a powerful intuition that you don't yet fully trust." };
    if (avgCorrect > 0.6) return { name: "The Intuitive Master", desc: "Your tuning across sensory and social fields is exceptionally calibrated." };
    if (avgLatency > 2.0) return { name: "The Measured Thinker", desc: "You prefer to sample all data before committing to a feeling." };
    return { name: "The Developing Scout", desc: "You are in the process of stabilizing your intuitive receptivity." };
  }, [history, hits]);

  const mentorInsight = useMemo(() => {
    const choices = history.filter(h => h.type === 'choice');
    if (choices.length < 5) return "Keep going. We need more data to calibrate your insight generator.";

    const avgLatency = choices.reduce((a, h) => a + h.latency, 0) / choices.length;
    const confidenceGap = choices.reduce((a, h) => a + Math.abs(h.confidence - (h.correct ? 1 : 0)), 0) / choices.length;

    if (confidenceGap > 0.6) return "Your conscious confidence is currently disconnected from your intuitive hits. Try choosing faster without 'checking' your feeling.";
    if (avgLatency < 1.0 && hits > 10) return "You've found the flow state. Your rapid-fire accuracy is exceptional. Maintain this pace—don't let doubt slow you down.";
    if (avgLatency > 2.5) return "Your analytical mind is likely interfering. The signal is strongest in the first 0.8 seconds. Try to move 'before the thought'.";
    return "You are showing steady calibration. Focus on the subtle physical sensation (warmth or weight) when hovering over the correct tile.";
  }, [history, hits]);

  const copy = CONTENT[theme];
  const indicatorOpacity = Math.max(0.05, 0.4 - (streak * 0.1));

  return (
    <div className="app-container">
      <ZenParticles confidence={confidence} />
      <header className="theme-switcher">
        <div style={{ display: 'flex', gap: '1rem', marginRight: 'auto' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <input type="checkbox" checked={soundscapeEnabled} onChange={e => setSoundscapeEnabled(e.target.checked)} />
            Alpha-Waves
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <input type="checkbox" checked={driftEnabled} onChange={e => setDriftEnabled(e.target.checked)} />
            Social Drift
          </label>
        </div>
        <button className={`theme-button ${theme === 'clinical' ? 'active' : ''}`} onClick={() => setTheme('clinical')}>Technical</button>
        <button className={`theme-button ${theme === 'warm' ? 'active' : ''}`} onClick={() => setTheme('warm')}>Attunement</button>
      </header>

      <main>
        {screen === 'calibration' && (
          <section className="screen">
            <div className="calibration-ritual">
              <h2 className="screen-title">{theme === 'clinical' ? 'Baseline Calibration' : 'Centering...'}</h2>
              <p className="screen-subtitle">Match your breath to the expansion. Release all data expectations.</p>
              <div className="ritual-circle">
                <div style={{ animation: 'breathing 4s infinite' }}>{theme === 'clinical' ? 'READY' : 'FLOW'}</div>
              </div>
            </div>
          </section>
        )}

        {screen === 'intro' && (
          <section className="screen">
            <div className="screen-header">
              <h1 className="screen-title">{copy.title}</h1>
              <p className="screen-subtitle">{copy.subtitle}</p>
              {personalBest > 0 && <div className="metrics-display" style={{ color: 'var(--accent)', fontWeight: 600 }}>Personal Best: {personalBest} hits</div>}
            </div>
            <div className="instructions-box">
              <h3>{theme === 'clinical' ? 'Instructions' : 'How this works'}</h3>
              <p>{copy.instructions}</p>
              <p style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.85rem' }}>Note: {copy.note}</p>
            </div>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="button-primary" onClick={startExercise}>
                ESP Training
              </button>
              <button className="button-secondary" onClick={startRV}>
                Remote Viewing
              </button>
            </div>
          </section>
        )}

        {screen === 'exercise' && (
          <section className="screen">
            <div className="status-bar">
              <div>Trial {history.length + 1} / {MAX_TRIALS}</div>
              <div>Hits: {hits}</div>
            </div>

            <h2 className="screen-subtitle" style={{ textAlign: 'center', margin: '1rem 0' }}>
              {theme === 'clinical' ? 'Scanning stimulus field...' : 'Notice the quiet signals...'}
            </h2>

            <div className="tile-grid">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  className={`tile tile-${i} ${i === targetIndex ? 'target' : ''} ${driftEnabled ? 'drifting' : ''}`}
                  onClick={() => handleSelect(i)}
                >
                  <div className="tile-content" style={{ opacity: i === targetIndex ? indicatorOpacity : 0.15 }}></div>
                  {streak >= 3 && i === targetIndex && <div className="streak-counter">{streak}</div>}
                </button>
              ))}
            </div>

            <div className="exercise-controls">
              <div style={{ flex: 1 }}>
                <p className="screen-subtitle" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>{copy.reflection}</p>
                <input type="range" min="0" max="1" step="0.1" value={confidence} onChange={e => setConfidence(parseFloat(e.target.value))} />
                <div className="slider-labels"><span>{copy.labels[0]}</span><span>{copy.labels[1]}</span></div>
              </div>
              <button className="button-secondary" onClick={handlePass}>{copy.passLabel}</button>
            </div>
          </section>
        )}

        {screen === 'rv' && (
          <section className="screen">
            {rvStep === 0 && (
              <div style={{ textAlign: 'center' }}>
                <Label>Mental Coordinate Hook</Label>
                <div className="coordinate-display">{rvCoordinate}</div>
                <p className="screen-subtitle">Fix your mind on this number. Let your awareness drift to the location it represents.</p>
                <button className="button-primary" style={{ marginTop: '2rem' }} onClick={() => setRvStep(1)}>Acquire Sensories</button>
              </div>
            )}

            {rvStep === 1 && (
              <div>
                <Label>Phase 1: Sensory Signal Capture</Label>
                <div className="sensory-grid" style={{ marginTop: '1.5rem' }}>
                  <div className="sensory-input-group">
                    <label>Colors / Textures</label>
                    <textarea value={rvData.sensories} onChange={e => setRvData({ ...rvData, sensories: e.target.value })} placeholder="Red, rough, grainy, cold..." />
                  </div>
                  <div className="sensory-input-group">
                    <label>Sounds / Smells</label>
                    <textarea placeholder="Humming, metallic, salty breeze..." />
                  </div>
                </div>
                <button className="button-primary" style={{ marginTop: '2rem' }} onClick={() => setRvStep(2)}>Moving to Sketch</button>
              </div>
            )}

            {rvStep === 2 && (
              <div>
                <Label>Phase 2: The Ideogram (Spontaneous Sketching)</Label>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Draw the first shape or movement that comes to your mind.</p>
                <SketchPad />
                <button className="button-primary" style={{ marginTop: '2rem' }} onClick={() => setRvStep(3)}>Manage AOL</button>
              </div>
            )}

            {rvStep === 3 && (
              <div>
                <Label>Phase 3: Analytical Overlay (AOL)</Label>
                <div className="aol-box">
                  <div className="aol-title">AOL Trash Bin</div>
                  <textarea
                    className="sensory-input-group"
                    style={{ width: '100%', height: '100px', background: 'transparent', border: 'none' }}
                    value={rvData.aol}
                    onChange={e => setRvData({ ...rvData, aol: e.target.value })}
                    placeholder="Is your brain telling you it's a bridge? Write it here to discard the guess and clear the signal..."
                  />
                </div>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <button className="button-primary" onClick={() => setRvStep(4)}>The Reveal</button>
                </div>
              </div>
            )}

            {rvStep === 4 && (
              <div style={{ textAlign: 'center' }}>
                <div className={`status-badge status-correct`}>Target Revealed</div>
                <h2 className="screen-subtitle">{rvTarget.location}</h2>
                <div className="social-interpretation-box" style={{ marginTop: '1.5rem' }}>
                  <span className="interpretation-label">{rvTarget.name}</span>
                  <p className="interpretation-meaning">{rvTarget.description}</p>
                </div>
                <img src={rvTarget.src} alt="RV Target" className="reveal-image" style={{ height: '300px' }} />
                <div style={{ marginTop: '2.5rem' }}>
                  <button className="button-primary" onClick={() => setScreen('intro')}>Return to Lab</button>
                </div>
              </div>
            )}
          </section>
        )}

        {screen === 'feedback' && (
          <section className="screen">
            <div className="feedback-overlay">
              {showGoalFeedback && <div className="goal-announcement">{showGoalFeedback}</div>}
              <div className={`status-badge ${selectedIndex === targetIndex ? 'status-correct' : 'status-incorrect'}`}>
                {selectedIndex === targetIndex ? copy.correct : copy.incorrect}
              </div>
              <h2 className="screen-subtitle">{selectedIndex === targetIndex ? copy.correctSub : copy.incorrectSub}</h2>

              <div className="grid-reveal-mini" style={{ opacity: selectedIndex !== targetIndex ? 1 : 0.4 }}>
                <p style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>Truth:</p>
                <div className={`tile-mini tile-${targetIndex}`}></div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <div className="social-interpretation-box">
                  <span className="interpretation-label">{history[history.length - 1].imageObj.label}</span>
                  <p className="interpretation-meaning">{history[history.length - 1].imageObj.meaning}</p>
                </div>
                <img
                  src={history[history.length - 1].imageObj.src}
                  alt="Reveal"
                  className="reveal-image"
                />
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <button className="button-primary" onClick={nextTrial}>
                  {history.length >= MAX_TRIALS ? 'Finalize Session' : 'Continue'}
                </button>
              </div>
            </div>
          </section>
        )}

        {screen === 'summary' && (
          <section className="screen">
            <h1 className="screen-title" style={{ textAlign: 'center' }}>{copy.summaryTitle}</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center', margin: '2rem 0' }}>
              <div><Label>Hits</Label><div style={{ fontSize: '1.4rem', fontWeight: 600 }}>{hits}</div></div>
              <div><Label>Correlation</Label><div style={{ fontSize: '1.4rem', fontWeight: 600 }}>{correlation}</div></div>
              <div>
                <Label>{theme === 'clinical' ? 'Archetype' : 'Your Profile'}</Label>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)', lineHeight: '1.1' }}>
                  {archetype.name}
                </div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: '1.2', marginTop: '4px' }}>
                  {archetype.desc}
                </div>
              </div>
              <div><Label>Rank</Label><div style={{ fontSize: '1.4rem', fontWeight: 600 }}>{hits >= 12 ? 'Elite' : (hits >= 8 ? 'Solid' : 'Novice')}</div></div>
            </div>

            <div className="trend-chart">
              <Label>Learning Curve (Confidence vs. Result)</Label>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '80px' }}>
                <polyline points={trendPath} className="chart-line" />
                {history.map((h, i) => (
                  <circle key={i} cx={(i / (MAX_TRIALS - 1)) * 100} cy={100 - (h.confidence * 100)} r="2" fill={h.correct ? '#22c55e' : '#ef4444'} />
                ))}
              </svg>
            </div>

            <div className="film-strip">
              {history.filter(h => h.type === 'choice').map((h, i) => (
                <div key={i} className="film-frame">
                  <img src={h.imageObj.src} className="frame-thumb" alt="Replay" />
                  <div className="frame-indicator" style={{ background: h.correct ? '#22c55e' : '#ef4444' }}></div>
                  <span>{h.imageObj.label} ({(h.confidence * 10).toFixed(0)} sense)</span>
                </div>
              ))}
            </div>

            <div className="mentor-insight-card">
              <Label>Mentor Insights</Label>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {mentorInsight}
              </p>
            </div>

            <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>{copy.summaryInterp}</p>

            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <button className="button-primary" onClick={() => { setHistory([]); setHits(0); setStreak(0); setScreen('intro'); }}>Restart Session</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function Label({ children }) { return <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{children}</div>; }

export default App;
