import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
}

interface Geometric3DCube {
  x: number;
  y: number;
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  color: string;
}

export const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 140,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Dynamic responsive particle count (optimized for buttery 60-120fps scrolling)
    const isMobile = window.innerWidth < 640;
    const particleCount = isMobile ? 10 : 18;
    const particles: Particle[] = [];

    const getColors = () => ({
      particle: '245, 158, 11', // Royal Gold
      particleAlt: '129, 140, 248', // Royal Sapphire/Indigo
      line: '217, 119, 6', // Golden connecting filaments
    });

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        baseAlpha: Math.random() * 0.4 + 0.2,
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    // 3D Wireframe Floating Cubes
    const cubes: Geometric3DCube[] = [
      {
        x: width * 0.15,
        y: height * 0.35,
        size: 38,
        rotX: 0.2,
        rotY: 0.4,
        rotZ: 0.1,
        vRotX: 0.006,
        vRotY: 0.009,
        vRotZ: 0.004,
        color: '245, 158, 11', // Gold
      },
      {
        x: width * 0.85,
        y: height * 0.3,
        size: 46,
        rotX: 0.5,
        rotY: 0.2,
        rotZ: 0.3,
        vRotX: -0.007,
        vRotY: 0.008,
        vRotZ: -0.005,
        color: '129, 140, 248', // Indigo/Sapphire
      },
      {
        x: width * 0.78,
        y: height * 0.75,
        size: 32,
        rotX: 0.1,
        rotY: 0.6,
        rotZ: 0.4,
        vRotX: 0.008,
        vRotY: -0.006,
        vRotZ: 0.007,
        color: '217, 119, 6', // Warm Amber
      },
    ];

    // Base unit cube vertices
    const baseVertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // back face
      [4, 5], [5, 6], [6, 7], [7, 4], // front face
      [0, 4], [1, 5], [2, 6], [3, 7], // connecting edges
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            render();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isVisible = true;
        cancelAnimationFrame(animationFrameId);
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Render loop
    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);
      const colors = getColors();
      const mouse = mouseRef.current;

      // Draw & Update 3D Wireframe Cubes
      cubes.forEach((cube) => {
        // Increment 3D rotation angles
        cube.rotX += cube.vRotX;
        cube.rotY += cube.vRotY;
        cube.rotZ += cube.vRotZ;

        // Subtle parallax shift with mouse
        let displayX = cube.x;
        let displayY = cube.y;
        if (mouse.x !== null && mouse.y !== null) {
          displayX += (mouse.x - width / 2) * 0.04;
          displayY += (mouse.y - height / 2) * 0.04;
        }

        const radX = cube.rotX;
        const radY = cube.rotY;
        const radZ = cube.rotZ;

        const cosX = Math.cos(radX), sinX = Math.sin(radX);
        const cosY = Math.cos(radY), sinY = Math.sin(radY);
        const cosZ = Math.cos(radZ), sinZ = Math.sin(radZ);

        // Project 3D vertices into 2D screen space
        const projected = baseVertices.map(([vx, vy, vz]) => {
          // Scale
          let x = vx * cube.size;
          let y = vy * cube.size;
          let z = vz * cube.size;

          // Rotate X
          let y1 = y * cosX - z * sinX;
          let z1 = y * sinX + z * cosX;

          // Rotate Y
          let x2 = x * cosY + z1 * sinY;
          let z2 = -x * sinY + z1 * cosY;

          // Rotate Z
          let x3 = x2 * cosZ - y1 * sinZ;
          let y3 = x2 * sinZ + y1 * cosZ;

          // Perspective projection
          const distance = 200;
          const f = distance / (distance + z2);

          return {
            x: displayX + x3 * f,
            y: displayY + y3 * f,
            z: z2,
          };
        });

        // Draw edges
        ctx.strokeStyle = `rgba(${cube.color}, 0.28)`;
        ctx.lineWidth = 1.2;
        edges.forEach(([i1, i2]) => {
          ctx.beginPath();
          ctx.moveTo(projected[i1].x, projected[i1].y);
          ctx.lineTo(projected[i2].x, projected[i2].y);
          ctx.stroke();
        });

        // Draw vertices glowing dots
        projected.forEach((pt) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cube.color}, 0.65)`;
          ctx.fill();
        });
      });

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction: subtle gravity / repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 0.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            p.alpha = Math.min(p.baseAlpha + 0.5, 0.85);
          } else {
            p.alpha = p.baseAlpha;
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const pColor = i % 3 === 0 ? colors.particleAlt : colors.particle;
        ctx.fillStyle = `rgba(${pColor}, ${p.alpha * 0.5})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxDist = 110;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${colors.line}, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full opacity-70 z-0"
      aria-hidden="true"
    />
  );
};
