import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import EventCard from './EventCard';
import EventDetailsModal from './EventDetailsModal';
import { Event, SwipeDirection } from '../types';
import { eventService } from '../services/eventService';

const SwipeDeck: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await eventService.getEvents();
      setEvents(data);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Failed to load events", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction: SwipeDirection) => {
    const currentEvent = events[currentIndex];
    
    // Process backend action
    if (direction === SwipeDirection.RIGHT) {
      eventService.likeEvent(currentEvent.id);
    } else if (direction === SwipeDirection.LEFT) {
      eventService.skipEvent(currentEvent.id);
    } else if (direction === SwipeDirection.UP) {
      // For Swipe Up, we want to open the details BUT also remove it from the stack visually eventually?
      // "Tinder style" usually keeps it if you look at details, but the prompt says "Swipe Up -> Super Interested".
      // Let's assume Swipe Up = Super Like Action AND Open Details.
      await eventService.superLikeEvent(currentEvent.id);
      setSelectedEvent(currentEvent);
      setIsModalOpen(true);
      
      // Delay moving to next card so user sees the modal first
      // The card has already flown off screen due to animation in EventCard
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 300);
      return; 
    }

    // Move to next card immediately for Left/Right
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 200);
  };

  const resetDeck = () => {
    setCurrentIndex(0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const isDeckEmpty = currentIndex >= events.length;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center max-w-md mx-auto">
      
      {/* Empty State */}
      {isDeckEmpty ? (
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
             <RotateCcw size={32} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No more events</h3>
          <p className="text-gray-400 mb-6">Check back later for more vibes in your area.</p>
          <button 
            onClick={resetDeck}
            className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
          >
            Start Over (Demo)
          </button>
        </div>
      ) : (
        <div className="relative w-full h-[600px] sm:h-[700px]">
          {/* 
             We render the cards in reverse order so the first index is on top in the DOM stacking context.
             Actually, easy way: Absolute positioning. Render bottom up.
             We only need to render the current card and the one after it for performance.
          */}
          {events.slice(currentIndex, currentIndex + 2).reverse().map((event, index) => {
            // Because we sliced and reversed, if we have 2 items:
            // index 0 is the NEXT card (background)
            // index 1 is the CURRENT card (foreground)
            // If only 1 item left, index 0 is CURRENT.
            
            // Let's fix the logic to be clearer:
            const isCurrent = event.id === events[currentIndex].id;
            
            return (
              <EventCard
                key={event.id}
                event={event}
                isActive={isCurrent}
                isFront={isCurrent}
                onSwipe={handleSwipe}
              />
            );
          })}
        </div>
      )}

      {/* Swipe Instructions (Subtle) */}
      {!isDeckEmpty && (
        <div className="absolute bottom-6 flex justify-center gap-8 w-full text-xs font-semibold tracking-widest text-gray-500 uppercase pointer-events-none">
          <span>NOPE</span>
          <span className="text-blue-500">SUPER LIKE</span>
          <span>LIKE</span>
        </div>
      )}

      {/* Details Modal */}
      <EventDetailsModal 
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SwipeDeck;