import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  isActive: boolean;
  isModelSpeaking: boolean;
  volume: number;
}

const Visualizer: React.FC<VisualizerProps> = ({ isActive, isModelSpeaking, volume }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // We want the visualizer to show a straight line when idle/connecting for aesthetic purposes
    // So we run the render loop even if not active, but amplitude is 0.
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      const isUserSpeaking = volume > 0.01;

      // Ultra Premium Neon Glow
      ctx.beginPath();
      
      // Dynamic Colors
      if (isModelSpeaking) {
          ctx.strokeStyle = '#C4B5FD'; // Light Purple/White
          ctx.shadowColor = '#8B5CF6'; // Violet Glow
          ctx.shadowBlur = 20;
      } else if (isUserSpeaking) {
          ctx.strokeStyle = '#A78BFA';
          ctx.shadowColor = '#7C3AED';
          ctx.shadowBlur = 15;
      } else {
          // Idle Line
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
      }

      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Amplitude logic
      let amplitude = 0;
      if (isActive) {
          if (isModelSpeaking) {
            amplitude = 25;
          } else if (isUserSpeaking) {
            amplitude = Math.min(20, volume * 60); 
          }
      }

      const speed = isModelSpeaking ? 0.15 : isUserSpeaking ? 0.1 : 0.02;

      // Draw Waveform
      if (amplitude === 0) {
        // Draw a clean straight line when silent
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
      } else {
        // Multi-sine wave for organic look
        for (let x = 0; x < width; x++) {
          const frequency = 0.015;
          const y = centerY + 
                    Math.sin(x * frequency + offset) * amplitude * Math.sin((x / width) * Math.PI) +
                    Math.sin(x * frequency * 2 + offset) * (amplitude * 0.5) * Math.sin((x / width) * Math.PI);
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      offset += speed;
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [isActive, isModelSpeaking, volume]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} width={1000} height={100} className="w-full h-full object-contain" />
    </div>
  );
};

export default Visualizer;
