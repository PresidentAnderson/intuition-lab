import React, { useState, useEffect, useMemo, useRef } from 'react';
import './App.css';

function ZenParticles({ confidence, streak }) {
  const particles = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 5,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * -20
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
            background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
            transform: `translate(${(confidence - 0.5) * 100}px, ${(confidence - 0.5) * 100}px) scale(${0.5 + (streak * 0.1)})`,
            opacity: 0.05 + (confidence * 0.3),
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            filter: `blur(${10 - (confidence * 8)}px)`
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
      6: "Signal alignment detected.",
      8: "Intuitive flow state active.",
      10: "Exceptional receptive clarity.",
      12: "Pattern recognition maximized.",
      14: "Total sensory integration."
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
  // Social/Emotional Cues (1-25)
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
  { src: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=400&q=80', label: 'Observation', meaning: 'A neutral, scanning gaze is used to take in wide social fields.' },
  { src: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80', label: 'Openness', meaning: 'Exposed palms and unbuttoned clothing signal an absence of defenses.' },

  // Environments/Architectural (26-50)
  { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80', label: 'Precision', meaning: 'Sharp geometric lines in glass architecture signal clinical focus.' },
  { src: 'https://images.unsplash.com/photo-1449156003053-93d3adec3f27?auto=format&fit=crop&w=400&q=80', label: 'Solitude', meaning: 'The vastness of a desert road often reflects internal sensory silence.' },
  { src: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=400&q=80', label: 'Vitality', meaning: 'Sunlight through a dense canopy represents a state of high intuitive energy.' },
  { src: 'https://images.unsplash.com/photo-1518005020411-38b812115df5?auto=format&fit=crop&w=400&q=80', label: 'Order', meaning: 'Symmetrical urban layouts suggest a highly structured analytical mind.' },
  { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80', label: 'Flow', meaning: 'A calm mountain lake surface mirrors a perfectly calibrated mind.' },
  { src: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80', label: 'Adventure', meaning: 'Jagged rock formations represent the overcoming of sensory noise.' },
  { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', label: 'Peak', meaning: 'Snow-capped summits symbolize the highest level of remote focus.' },
  { src: 'https://images.unsplash.com/photo-1433086566087-632349007f9c?auto=format&fit=crop&w=400&q=80', label: 'Balance', meaning: 'Waterfall dynamics suggest a balance between strength and receptivity.' },
  { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80', label: 'Grounded', meaning: 'The texture of dry earth signals a need for grounding before a session.' },
  { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80', label: 'Expansive', meaning: 'A wide horizon indicates a soul searching for wide-field coordinates.' },
  { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80', label: 'Natural', meaning: 'Curved valleys suggest the organic path of least resistance in thought.' },
  { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80', label: 'Ancient', meaning: 'Deep woods represent the storage of deep ancestral intuition.' },
  { src: 'https://images.unsplash.com/photo-1444090542259-0af8fa96557e?auto=format&fit=crop&w=400&q=80', label: 'Clarity', meaning: 'Crisp morning air in a canyon mirrors a fresh mental baseline.' },
  { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', label: 'Dynamic', meaning: 'A sunset over Yosemite highlights the constant transition of signals.' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80', label: 'Resilient', meaning: 'High-altitude conifers represent the persistence of intuition in harsh conditions.' },
  { src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=400&q=80', label: 'Ethereal', meaning: 'Waves hitting a rocky shore represent the boundary between known and unknown.' },
  { src: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fed6?auto=format&fit=crop&w=400&q=80', label: 'Warmth', meaning: 'Golden hour light indicates the optimal state for social attunement.' },
  { src: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c70f?auto=format&fit=crop&w=400&q=80', label: 'Urbanity', meaning: 'The hum of a city at night represents background cognitive noise.' },
  { src: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?auto=format&fit=crop&w=400&q=80', label: 'Flight', meaning: 'Aerial views suggest a detached, objective viewpoint on a target.' },
  { src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bdb?auto=format&fit=crop&w=400&q=80', label: 'Depth', meaning: 'The shadow side of a mountain reveals hidden intuitive data.' },
  { src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80', label: 'Growth', meaning: 'Fiddlehead ferns represent the initial curl of a new intuitive hit.' },
  { src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=80', label: 'Peace', meaning: 'A lakeside cottage represents the stabilization of the analytical mind.' },
  { src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=400&q=80', label: 'Endless', meaning: 'Vast meadows suggest an infinite field of possible outcomes.' },
  { src: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=400&q=80', label: 'Renewal', meaning: 'Water flowing over mossy stones signals a cleared sensory channel.' },
  { src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80', label: 'Rooted', meaning: 'Massive oak roots symbolize the anchor of the physical body.' },

  // Abstract Patterns/Textures (51-75)
  { src: 'https://images.unsplash.com/photo-1503455634867-c9ca11da3f68?auto=format&fit=crop&w=400&q=80', label: 'Complexity', meaning: 'Neural-like patterns in nature represent information pathways.' },
  { src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80', label: 'Collision', meaning: 'Abstract fluid dynamics suggest the interaction of two thoughts.' },
  { src: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=400&q=80', label: 'Void', meaning: 'Dark matter-like textures represent the silence between hits.' },
  { src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80', label: 'Signal', meaning: 'High-frequency line patterns represent raw psychic data stream.' },
  { src: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80', label: 'Decay', meaning: 'Weathered textures signaling the fading of stale information.' },
  { src: 'https://images.unsplash.com/photo-1544256718-3bcf237f3167?auto=format&fit=crop&w=400&q=80', label: 'Crystal', meaning: 'Fractal structures reveal the repeating nature of truths.' },
  { src: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&w=400&q=80', label: 'Rhythm', meaning: 'Periodic ripples suggesting a steady wave of reception.' },
  { src: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=400&q=80', label: 'Distortion', meaning: 'Blurred lights indicating the presence of analytical overlay (AOL).' },
  { src: 'https://images.unsplash.com/photo-1513506494265-99b5fc580916?auto=format&fit=crop&w=400&q=80', label: 'Web', meaning: 'Interconnected threads representing the social field network.' },
  { src: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=400&q=80', label: 'Layering', meaning: 'Multiple transparent planes suggest complex emotional depths.' },
  { src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=400&q=80', label: 'Erosion', meaning: 'Smoothed surfaces indicating well-practiced intuition.' },
  { src: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80', label: 'Static', meaning: 'Granular textures represent low-level sensory interference.' },
  { src: 'https://images.unsplash.com/photo-1515549832467-8cbb04f3263c?auto=format&fit=crop&w=400&q=80', label: 'Vortex', meaning: 'Swirling patterns signaling a high-concentration focus point.' },
  { src: 'https://images.unsplash.com/photo-1493606371202-61806748f024?auto=format&fit=crop&w=400&q=80', label: 'Melting', meaning: 'Flowing textures suggest the dissolving of the ego during a session.' },
  { src: 'https://images.unsplash.com/photo-1557682224-192535d4f23b?auto=format&fit=crop&w=400&q=80', label: 'Ascension', meaning: 'Upward-moving gradients indicate a shift to higher sensory planes.' },
  { src: 'https://images.unsplash.com/photo-1454165833222-d1226065427c?auto=format&fit=crop&w=400&q=80', label: 'Density', meaning: 'Thick, opaque textures represent "heavy" target data.' },
  { src: 'https://images.unsplash.com/photo-1508717272800-9fff97da7e8f?auto=format&fit=crop&w=400&q=80', label: 'Radiance', meaning: 'Light diffusing from a center points to a clear realization.' },
  { src: 'https://images.unsplash.com/photo-1550859492-d5da3d8e3588?auto=format&fit=crop&w=400&q=80', label: 'Grating', meaning: 'Harsh patterns represent sudden ego-driven corrections.' },
  { src: 'https://images.unsplash.com/photo-1554034483-345095d105be?auto=format&fit=crop&w=400&q=80', label: 'Prism', meaning: 'Light splitting into colors represents the analysis of a signal.' },
  { src: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=400&q=80', label: 'Nebula', meaning: 'Cosmic clouds represent the infinite potential of the mind.' },
  { src: 'https://images.unsplash.com/photo-1460186136353-977e9d6085a1?auto=format&fit=crop&w=400&q=80', label: 'Pulse', meaning: 'Repetitive geometric beats suggest a heartbeat-synced session.' },
  { src: 'https://images.unsplash.com/photo-1511216113906-8f57bb83e776?auto=format&fit=crop&w=400&q=80', label: 'Shadow', meaning: 'Silhouettes representing the unknown elements of a coordinate.' },
  { src: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&w=400&q=80', label: 'Infinity', meaning: 'Looping patterns suggest the recursive nature of time/space data.' },
  { src: 'https://images.unsplash.com/photo-1531685250784-75692621497a?auto=format&fit=crop&w=400&q=80', label: 'Atmosphere', meaning: 'Soft mists represent the thinning of baseline reality.' },
  { src: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?auto=format&fit=crop&w=400&q=80', label: 'Universal', meaning: 'The vast night sky represents the total coordinate field.' },

  // Micro-details/Hand Cues (76-100)
  { src: 'https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?auto=format&fit=crop&w=400&q=80', label: 'Closure', meaning: 'A tightly closed fist often signals non-verbal defensiveness.' },
  { src: 'https://images.unsplash.com/photo-1531983412531-1f49a365f698?auto=format&fit=crop&w=400&q=80', label: 'Invitation', meaning: 'Open hands resting flat suggest a high degree of transparency.' },
  { src: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?auto=format&fit=crop&w=400&q=80', label: 'Constraint', meaning: 'Hands behind the back can indicate controlled internal pressure.' },
  { src: 'https://images.unsplash.com/photo-1516245834210-c4c049622ed0?auto=format&fit=crop&w=400&q=80', label: 'Tenderness', meaning: 'A soft palm touch represents biological empathy signals.' },
  { src: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&w=400&q=80', label: 'Direct', meaning: 'Pointing or rigid fingers signal an external target focus.' },
  { src: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=400&q=80', label: 'Micro-move', meaning: 'Finger twitching indicates rapid internal processing.' },
  { src: 'https://images.unsplash.com/photo-1513297845702-0e9d1ca907c1?auto=format&fit=crop&w=400&q=80', label: 'Vulnerability', meaning: 'Exposing the wrists is a sign of deep trust or submission.' },
  { src: 'https://images.unsplash.com/photo-1506126274587-c317273f91ea?auto=format&fit=crop&w=400&q=80', label: 'Reflection', meaning: 'Hands covering the mouth suggest a censored or reflective state.' },
  { src: 'https://images.unsplash.com/photo-1490131784822-b56a45664a9a?auto=format&fit=crop&w=400&q=80', label: 'Support', meaning: 'One hand holding another signals a self-comforting loop.' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80', label: 'Release', meaning: 'Wringing hands represent the discharge of intuitive tension.' },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80', label: 'Contrast', meaning: 'Harsh hand shadows represent the dark side of a social signal.' },
  { src: 'https://images.unsplash.com/photo-1504194081532-a521e149f391?auto=format&fit=crop&w=400&q=80', label: 'Stillness', meaning: 'Motionless fingers represent the perfect "zero point" state.' },
  { src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', label: 'Gaze', meaning: 'Looking away indicates a shift to internal visual processing.' },
  { src: 'https://images.unsplash.com/photo-1533227268408-a320146059fd?auto=format&fit=crop&w=400&q=80', label: 'Determination', meaning: 'Fixed eye contact signaling extreme intent-alignment.' },
  { src: 'https://images.unsplash.com/photo-1516575150278-771891de6162?auto=format&fit=crop&w=400&q=80', label: 'Barrier', meaning: 'Crossed arms signal a refusal to share intuitive data.' },
  { src: 'https://images.unsplash.com/photo-1512485600893-b08ec1d59b1c?auto=format&fit=crop&w=400&q=80', label: 'Humble', meaning: 'A bowed head shows receptivity to the target coordinate.' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', label: 'Warm smile', meaning: 'Genuine eye wrinkles indicate true emotional resonance.' },
  { src: 'https://images.unsplash.com/photo-1502376739161-dcaec7162237?auto=format&fit=crop&w=400&q=80', label: 'Distracted', meaning: 'Loss of eye focus signals the intervention of memory.' },
  { src: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=400&q=80', label: 'Micro-anger', meaning: 'Flared nostrils indicating a subterranean emotional hit.' },
  { src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80', label: 'Micro-disgust', meaning: 'A momentary nose crinkle reveal an intuitive mismatch.' },
  { src: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80', label: 'Neutral', meaning: 'The "poker face" target: the baseline state of observation.' },
  { src: 'https://images.unsplash.com/photo-1520626337972-ebf863448db6?auto=format&fit=crop&w=400&q=80', label: 'Subconscious', meaning: 'Touching the temple represents active data retrieval.' },
  { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', label: 'Intensity', meaning: 'A locked gaze represents the "hook" into a target signal.' },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', label: 'Depth', meaning: 'Eyes that "see through" objects reveal the remote view state.' },
  { src: 'https://images.unsplash.com/photo-1531746020798-e795c5399c47?auto=format&fit=crop&w=400&q=80', label: 'Finality', meaning: 'The closing of the eyes signifies the end of a successful session.' },
];

const RV_TARGETS = [
  { id: 'RV-001', name: 'Ancient Ruins', src: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=800&q=80', location: 'Machu Picchu, Peru', description: 'Terraced stone structures on a mountain ridge.' },
  { id: 'RV-002', name: 'Industrial Complex', src: 'https://images.unsplash.com/photo-1565463776629-4b6e5682855b?auto=format&fit=crop&w=800&q=80', location: 'Steel Works', description: 'Heavy metal structures, smoke, and linear pipes.' },
  { id: 'RV-003', name: 'Natural Wonder', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', location: 'Mount Everest', description: 'Jagged white peaks against a blue sky, extremely cold.' },
  { id: 'RV-004', name: 'Maritime Structure', src: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80', location: 'Golden Gate Bridge', description: 'Large red structure over blue water, foggy atmosphere.' },
  { id: 'RV-005', name: 'Historic Sanctuary', src: 'https://images.unsplash.com/photo-1564507592333-c60657eaa0ae?auto=format&fit=crop&w=800&q=80', location: 'Taj Mahal', description: 'White domed structure with reflecting pools, symmetry.' },
  { id: 'RV-006', name: 'Tropical Atoll', src: '/assets/scenes/rv_target_oasis.png', location: 'Maldive Islands', description: 'Circular coral island with white sand and clear turquoise lagoon.' },
  { id: 'RV-007', name: 'Cyberpunk Skyline', src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80', location: 'Neo-Tokyo Concept', description: 'Dense futuristic skyscrapers with neon signs and flying vehicles.' },
  { id: 'RV-008', name: 'Gothic Interior', src: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?auto=format&fit=crop&w=800&q=80', location: 'Cathedral of Light', description: 'High vaulted ceilings, stained glass windows, and stone pillars.' },
  { id: 'RV-009', name: 'Active Volcano', src: 'https://images.unsplash.com/photo-1531366930499-41f693cb71e1?auto=format&fit=crop&w=800&q=80', location: 'Mount Etna', description: 'Molten orange lava flowing down a dark volcanic slope at night.' },
  { id: 'RV-0010', name: 'Deep Forest', src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', location: 'Redwood National Park', description: 'Massive vertical tree trunks with sunlight filtering through dense canopy.' },
  { id: 'RV-011', name: 'Orbital View', src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', location: 'Low Earth Orbit', description: 'The curvature of the Earth at night with city lights and thin atmosphere.' },
  { id: 'RV-012', name: 'Desert Canyons', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80', location: 'Antelope Canyon', description: 'Swirling red sandstone walls carved by water, narrow shafts of light.' },
  { id: 'RV-013', name: 'Arctic Research', src: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=800&q=80', location: 'Svalbard Station', description: 'Small geometric buildings buried in deep snow under the Northern Lights.' },
  { id: 'RV-014', name: 'Underwater Reef', src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80', location: 'Great Barrier Reef', description: 'Vibrant coral structures with schools of tropical fish and blue rays of light.' },
  { id: 'RV-015', name: 'Infinite Library', src: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80', location: 'The Great Archive', description: 'Endless rows of dark wooden bookshelves and old ladders under a glass dome.' },
];

const MAX_TRIALS = 24;
const CYCLE_SIZE = 24;

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

    if (soundscapeEnabled && screen !== 'intro' && screen !== 'summary' && soundContext) {
      if (soundContext.state === 'suspended') {
        soundContext.resume();
      }
      merger = soundContext.createChannelMerger(2);

      oscL = soundContext.createOscillator();
      pannerL = soundContext.createStereoPanner();
      pannerL.pan.value = -1;
      // Base frequency lowers as streak increases for "deep" focus
      const baseFreq = 200 - (streak * 5);
      oscL.frequency.value = baseFreq;

      oscR = soundContext.createOscillator();
      pannerR = soundContext.createStereoPanner();
      pannerR.pan.value = 1;

      // Binaural beat frequency increases with streak (Alpha -> Gamma)
      const beatFreq = 10 + (streak * 2);
      oscR.frequency.value = baseFreq + beatFreq;

      const gain = soundContext.createGain();
      gain.gain.setValueAtTime(0, soundContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.03, soundContext.currentTime + 2);

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
  }, [soundscapeEnabled, screen, streak, soundContext]);

  const startRV = () => {
    if (soundContext && soundContext.state === 'suspended') {
      soundContext.resume();
    }
    const target = RV_TARGETS[Math.floor(Math.random() * RV_TARGETS.length)];
    const coordinate = Math.floor(Math.random() * 89999999 + 10000000).toString();
    setRvTarget(target);
    setRvCoordinate(coordinate);
    setRvStep(0);
    setRvData({ sensories: "", aol: "" });
    setScreen('rv');
  };

  const startExercise = () => {
    if (soundContext && soundContext.state === 'suspended') {
      soundContext.resume();
    }
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

    const currentTrialIndex = history.length;
    // Rotate through the image pool
    const imageObj = IMAGES[currentTrialIndex % IMAGES.length];

    const newHistory = [...history, {
      correct: isCorrect,
      latency: duration,
      confidence,
      type: 'choice',
      target: targetIndex,
      imageObj: imageObj
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
    const streakHits = history.reduce((max, h, i, arr) => {
      let current = 0;
      for (let j = i; j < arr.length && arr[j].correct; j++) current++;
      return Math.max(max, current);
    }, 0);

    if (confidenceGap > 0.6) return "Your conscious confidence is currently disconnected from your intuitive hits. You are 'thinking' you are right when the signal is actually elsewhere. Try choosing purely on the first physical impulse.";
    if (avgLatency < 0.8 && hits > 10) return "You've accessed the 'Fast Observer' state. Your accuracy at high speed suggests you are bypassing the analytical filter entirely. This is the goal of the Phoenix Protocol.";
    if (avgLatency > 2.5) return "Warning: Analysis paralysis detected. The signal degrades significantly after 1.5 seconds. The 'truth' is in the first glance. Try to move before the internal dialogue starts.";
    if (streakHits >= 4) return "Resonant Flow: You've achieved a sustained alignment with the target field. Notice the specific quality of internal quiet you had during that streak.";
    return "Steady calibration in progress. Your sensory detection is stabilizing. Focus on the subtle 'weight' or 'pull' in your solar plexus when hovering over the target tile.";
  }, [history, hits]);

  const copy = CONTENT[theme];
  const indicatorOpacity = Math.max(0.05, 0.4 - (streak * 0.1));

  return (
    <div className="app-container">
      <ZenParticles confidence={confidence} streak={streak} />
      <header className="theme-switcher">
        <div style={{ display: 'flex', gap: '1rem', marginRight: 'auto' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <input type="checkbox" checked={soundscapeEnabled} onChange={e => {
              setSoundscapeEnabled(e.target.checked);
              if (e.target.checked && soundContext.state === 'suspended') soundContext.resume();
            }} />
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
          <section className="screen glass">
            <div className="calibration-ritual">
              <h2 className="screen-title">{theme === 'clinical' ? 'Baseline Calibration' : 'Centering Ritual'}</h2>
              <p className="screen-subtitle">Match your breath to the expansion. Release all analytical expectations.</p>
              <div className="ritual-circle">
                <div className="ritual-inner" style={{ animation: 'breathing var(--breath-cycle) infinite ease-in-out' }}>
                  {theme === 'clinical' ? 'CALIBRATING' : 'RECEPTIVE'}
                </div>
              </div>
              <div className="metrics-display">Syncing bio-rhythms to local target field...</div>
            </div>
          </section>
        )}

        {screen === 'intro' && (
          <section className="screen glass">
            <div className="screen-header">
              <div className="status-badge" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', marginBottom: '1rem' }}>v1.0.2 - Phoenix Protocol</div>
              <h1 className="screen-title">Intuition Lab</h1>
              <p className="screen-subtitle">Advanced Social Perception & Remote Viewing</p>
              {personalBest > 0 && <div className="metrics-display" style={{ color: 'var(--accent)', fontWeight: 600, marginTop: '1rem' }}>Personal Best: {personalBest} hits</div>}
            </div>
            <div className="instructions-box">
              <h3>{theme === 'clinical' ? 'Instructions' : 'How this works'}</h3>
              <p>{copy.instructions}</p>
              <p style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.85rem' }}>Note: {copy.note}</p>
            </div>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <button className="button-primary" onClick={startExercise} style={{ padding: '1rem 2.5rem' }}>
                Social Intuition
              </button>
              <button className="button-secondary" onClick={startRV} style={{ padding: '1rem 2.5rem' }}>
                Remote Viewing
              </button>
            </div>
          </section>
        )}

        {screen === 'exercise' && (
          <section className="screen glass">
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
          <section className="screen glass">
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
          <section className="screen glass">
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
          <section className="screen glass">
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
