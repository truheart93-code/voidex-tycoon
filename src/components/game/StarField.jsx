import { useMemo } from 'react';

export default function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.6,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `star-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}