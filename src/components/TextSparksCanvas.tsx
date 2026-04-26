import React, { useEffect, useRef } from 'react';

interface TextStack {
  text: string;
  hsl: { h: number; s: number; l: number };
}

interface Stack {
  ticks: number;
  fadeIn: number;
  fadeOut: number;
  texts: TextStack[];
}

const color = (hsl: { h: number; s: number; l: number }, opacity: number) =>
  `hsla(${hsl.h | 0}, ${hsl.s}%, ${hsl.l}%, ${opacity})`;

const MAX_PARTICLES = 400;
const newParticlesPerFrame = 5;

export const TextSparksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleMapRef = useRef(new Map<any, any>());
  const stackIdRef = useRef(-1);
  const opaRef = useRef(0);
  const tickRef = useRef(0);
  const maskTickRef = useRef(0);
  const maskRef = useRef<any>(null);
  const maskCacheRef = useRef<any[]>([]);

  const stack: Stack[] = [
    {
      ticks: 150,
      fadeIn: 0.01,
      fadeOut: 0.01,
      texts: [
        { text: "R", hsl: { h: 30, s: 100, l: 50 } },
        { text: "é", hsl: { h: 90, s: 100, l: 50 } },
        { text: "s", hsl: { h: 150, s: 100, l: 50 } },
        { text: "u", hsl: { h: 210, s: 100, l: 50 } },
        { text: "m", hsl: { h: 270, s: 100, l: 50 } },
        { text: "é", hsl: { h: 310, s: 100, l: 50 } },
      ]
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = canvas.getContext('2d');
    if (!engine) return;

    const buildTextMask = (texts: TextStack[]) => {
      const mask: any[] = [];
      const textAll = texts.reduce((all, ts) => all + ts.text, "");
      const sizeFactor = 0.8;
      const width = 200;
      
      // Calculate aspect ratio safely to avoid division by zero or Infinity
      const canvasWidth = canvas.width || 1;
      const canvasHeight = canvas.height || 1;
      const aspect = canvasWidth / canvasHeight;
      const height = Math.max(1, Math.floor(width / aspect));
      
      const baseFontSize = 20;

      const offCanvas = document.createElement("canvas");
      const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return [];
      offCanvas.width = width;
      offCanvas.height = height;

      const font = (size: number) => `bold ${size}px Arial`;

      offCtx.fillStyle = "#000";
      offCtx.font = font(baseFontSize);
      const measure = offCtx.measureText(textAll);
      const rel = measure.width / (width * sizeFactor);
      const fontSize = Math.min(height * 0.8, baseFontSize / rel);

      offCtx.font = font(fontSize);
      const fontWidth = offCtx.measureText(textAll).width;

      offCtx.fillText(textAll, (width - fontWidth) / 2, height / 2 + fontSize * 0.35);

      let left = (width - fontWidth) / 2;
      const bottom = height / 2 + fontSize * 0.35;

      for (const textStack of texts) {
        offCtx.clearRect(0, 0, width, height);
        offCtx.fillText(textStack.text, left, bottom);
        left += offCtx.measureText(textStack.text).width;

        // Ensure width and height are integers and valid
        const imgData = offCtx.getImageData(0, 0, Math.floor(width), Math.floor(height));
        const subStack = [];

        for (let i = 0; i < imgData.width * imgData.height; i++) {
          if (imgData.data[i * 4 + 3]) {
            subStack.push({
              x: (i % imgData.width) / imgData.width,
              y: Math.floor(i / imgData.width) / imgData.height,
              o: Math.random(),
              t: Math.random(),
            });
          }
        }
        mask.push({ hsl: textStack.hsl, s: subStack });
      }
      return mask;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      maskCacheRef.current = stack.map(s => buildTextMask(s.texts));
    };

    resize();
    window.addEventListener('resize', resize);

    let animationId: number;

    const createNewParticle = () => {
      if (!maskRef.current || particleMapRef.current.size >= MAX_PARTICLES) return;
      const slots = Math.min(newParticlesPerFrame, MAX_PARTICLES - particleMapRef.current.size);
      for (let i = 0; i < slots; i++) {
        const main = Math.floor(Math.random() * maskRef.current.length);
        const subMask = maskRef.current[main];
        const maskElement = subMask && subMask.s[Math.floor(Math.random() * subMask.s.length)];
        if (subMask && maskElement) {
          const particle = {
            x: maskElement.x,
            y: maskElement.y,
            hsl: subMask.hsl,
            l: 0,
            s: 0.003 + (Math.random() + Math.random()) / 20,
            si: 1 + Math.floor(Math.random() * 4),
            mx: (Math.random() - 0.5) * 0.001,
            my: (Math.random() - 0.5) * 0.001,
          };
          particleMapRef.current.set(particle, particle);
        }
      }
    };

    const draw = () => {
      tickRef.current++;
      engine.clearRect(0, 0, canvas.width, canvas.height);
      engine.globalCompositeOperation = "lighter";

      // Logic from animation.js
      if (maskRef.current) {
        maskRef.current.forEach((subMask: any) => {
          subMask.s.forEach((pos: any) => {
            const fillOpa = ((1 + Math.cos(pos.x * 5 * pos.y * 5 + tickRef.current / 10)) / 2) * opaRef.current * pos.t * 0.5;
            engine.fillStyle = color(subMask.hsl, fillOpa);
            engine.fillRect(pos.x * canvas.width, pos.y * canvas.height, canvas.width / 150, canvas.width / 150);
          });
        });

        particleMapRef.current.forEach(p => {
          if (p.l >= 1) {
            particleMapRef.current.delete(p);
            return;
          }
          p.l += p.s;
          p.x += p.mx;
          p.y += p.my;
          engine.fillStyle = color(p.hsl, opaRef.current * Math.sin(p.l * Math.PI));
          engine.fillRect(p.x * canvas.width, p.y * canvas.height, p.si, p.si);
        });
      }

      // State machine logic
      if (maskRef.current) {
        maskTickRef.current++;
        if (maskTickRef.current >= stack[stackIdRef.current].ticks) {
          opaRef.current -= stack[stackIdRef.current].fadeOut;
          if (opaRef.current <= 0) {
            opaRef.current = 0;
            maskRef.current = null;
          }
        } else if (opaRef.current < 1) {
          opaRef.current += stack[stackIdRef.current].fadeIn;
          if (opaRef.current >= 1) opaRef.current = 1;
        }
      } else {
        stackIdRef.current = (stackIdRef.current + 1) % stack.length;
        maskRef.current = maskCacheRef.current[stackIdRef.current];
        maskTickRef.current = 0;
        opaRef.current = 0;
      }

      createNewParticle();
      engine.globalCompositeOperation = "source-over";
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />;
};
