import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, Share2, Ticket } from 'lucide-react';
import { Event } from '../types';

interface EventDetailsModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, isOpen, onClose }) => {
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 h-[85vh] bg-gray-900 rounded-t-3xl z-50 overflow-hidden flex flex-col border-t border-gray-700"
          >
            {/* Header Image */}
            <div className="relative h-64 shrink-0">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{event.title}</h2>
                  <p className="text-blue-400 font-semibold">{event.organizer}</p>
                </div>
                <div className="bg-gray-800 px-4 py-2 rounded-xl border border-gray-700">
                  <span className="text-lg font-bold text-white">{event.price}</span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 p-3 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="font-medium text-gray-200">{event.date}</p>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Time</p>
                    <p className="font-medium text-gray-200">{event.time}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl mb-6 flex items-start gap-3">
                 <div className="p-2 bg-red-500/20 rounded-lg text-red-400 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="font-medium text-gray-200">{event.location}</p>
                  </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-2">About Event</h3>
                <p className="text-gray-400 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Sticky Bottom Actions */}
            <div className="p-6 bg-gray-900 border-t border-gray-800 pb-8 flex gap-4">
              <button 
                onClick={() => console.log('Invite friends clicked')}
                className="flex-1 py-4 bg-gray-800 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
              >
                <Share2 size={20} />
                Invite
              </button>
              <button 
                onClick={() => console.log('Get tickets clicked')}
                className="flex-[2] py-4 bg-blue-600 rounded-2xl font-bold text-white flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/50"
              >
                <Ticket size={20} />
                Get Tickets
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventDetailsModal;