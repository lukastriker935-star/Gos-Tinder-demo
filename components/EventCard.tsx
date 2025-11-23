import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import { MapPin, Calendar, Info } from 'lucide-react';
import { Event, SwipeDirection } from '../types';

interface EventCardProps {
  event: Event;
  isActive: boolean;
  onSwipe: (direction: SwipeDirection) => void;
  isFront: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isActive, onSwipe, isFront }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transformations based on position
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.5, 1, 1, 1, 0.5]);
  
  // Overlay opacities for visual feedback
  const likeOpacity = useTransform(x, [20, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -150], [0, 1]);
  const superLikeOpacity = useTransform(y, [-20, -150], [0, 1]);

  useEffect(() => {
    if (!isFront) {
      x.set(0);
      y.set(0);
    }
  }, [isFront, x, y]);

  const handleDragEnd = async (_: any, info: PanInfo) => {
    const threshold = 100;
    const velocityThreshold = 500;
    const offset = info.offset;
    const velocity = info.velocity;

    // Check for Swipe Up (Super Like)
    if (offset.y < -threshold || velocity.y < -velocityThreshold) {
      await controls.start({ y: -1000, transition: { duration: 0.4 } });
      onSwipe(SwipeDirection.UP);
    } 
    // Check for Swipe Right (Like)
    else if (offset.x > threshold || velocity.x > velocityThreshold) {
      await controls.start({ x: 500, rotate: 20, transition: { duration: 0.4 } });
      onSwipe(SwipeDirection.RIGHT);
    } 
    // Check for Swipe Left (Pass)
    else if (offset.x < -threshold || velocity.x < -velocityThreshold) {
      await controls.start({ x: -500, rotate: -20, transition: { duration: 0.4 } });
      onSwipe(SwipeDirection.LEFT);
    } 
    // Reset position if threshold not met
    else {
      controls.start({ x: 0, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      drag={isActive}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7} // Adds resistance
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ x, y, rotate, opacity, zIndex: isFront ? 10 : 0 }}
      className={`absolute inset-0 w-full h-full p-4 ${!isFront ? 'pointer-events-none' : ''}`}
      initial={{ scale: isFront ? 1 : 0.95 }}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div className="relative w-full h-full bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 select-none">
        
        {/* Background Image */}
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="absolute w-full h-full object-cover pointer-events-none"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none" />

        {/* Swipe Feedback Stamps */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-8 border-4 border-green-400 rounded-lg p-2 transform -rotate-12 z-20">
          <span className="text-green-400 font-bold text-4xl uppercase tracking-widest">LIKE</span>
        </motion.div>
        
        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-8 border-4 border-red-500 rounded-lg p-2 transform rotate-12 z-20">
          <span className="text-red-500 font-bold text-4xl uppercase tracking-widest">NOPE</span>
        </motion.div>

        <motion.div style={{ opacity: superLikeOpacity }} className="absolute bottom-40 left-0 right-0 flex justify-center z-20">
           <div className="border-4 border-blue-400 rounded-lg p-2">
             <span className="text-blue-400 font-bold text-3xl uppercase tracking-widest">SUPER LIKE</span>
           </div>
        </motion.div>

        {/* Card Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2 z-10">
          <div className="flex justify-between items-end">
             <div>
                <h2 className="text-3xl font-bold text-white drop-shadow-md leading-tight">{event.title}</h2>
                <div className="flex items-center text-gray-200 mt-2 font-medium">
                  <Calendar size={18} className="mr-1.5" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center text-gray-300 mt-1 text-sm">
                  <MapPin size={16} className="mr-1.5" />
                  <span>{event.location}</span>
                </div>
             </div>
             
             {/* Info Button Hint */}
             {isActive && (
               <div className="flex flex-col items-center animate-pulse text-gray-400 mb-1">
                 <div className="bg-white/20 p-2 rounded-full mb-1">
                   <Info size={20} className="text-white" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-wider">Swipe Up</span>
               </div>
             )}
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {event.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;