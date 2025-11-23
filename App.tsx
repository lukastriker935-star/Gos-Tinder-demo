import React from 'react';
import SwipeDeck from './components/SwipeDeck';
import { Flame, Ticket, User, MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center bg-gray-900/50 backdrop-blur-sm z-30 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-pink-500 to-orange-500 p-2 rounded-xl">
            <Flame size={20} className="text-white" fill="white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">EventFlow</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 overflow-hidden">
          <img src="https://picsum.photos/100/100" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative w-full max-w-lg mx-auto p-4 flex flex-col justify-center">
        <SwipeDeck />
      </main>

      {/* Bottom Navigation */}
      <nav className="shrink-0 h-20 bg-gray-900 border-t border-gray-800 flex justify-around items-center px-4 safe-area-bottom">
        <button className="flex flex-col items-center gap-1 text-pink-500 p-2">
          <Flame size={24} fill="currentColor" />
          <span className="text-[10px] font-medium">Discover</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors p-2">
          <Ticket size={24} />
          <span className="text-[10px] font-medium">Tickets</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors p-2">
          <MessageCircle size={24} />
          <span className="text-[10px] font-medium">Chat</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors p-2">
          <User size={24} />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default App;