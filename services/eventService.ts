import { Event } from '../types';

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Neon Rooftop Party',
    date: 'Fri, Oct 24',
    time: '10:00 PM',
    imageUrl: 'https://picsum.photos/600/800?random=1',
    location: 'Skyline Lounge, Downtown',
    price: '$25',
    description: 'Experience the city lights like never before. DJ Set by Alex K, open bar for the first hour, and neon vibes all night long.',
    tags: ['Nightlife', 'DJ', 'Rooftop'],
    organizer: 'City Vibes Inc.'
  },
  {
    id: '2',
    title: 'Jazz & Wine Festival',
    date: 'Sat, Oct 25',
    time: '4:00 PM',
    imageUrl: 'https://picsum.photos/600/800?random=2',
    location: 'Central Park Pavillion',
    price: 'Free',
    description: 'A relaxing afternoon featuring local jazz quartets and a selection of the region\'s finest wines. Bring a blanket!',
    tags: ['Music', 'Wine', 'Outdoor'],
    organizer: 'Arts Council'
  },
  {
    id: '3',
    title: 'Tech Startup Mixer',
    date: 'Tue, Oct 28',
    time: '6:30 PM',
    imageUrl: 'https://picsum.photos/600/800?random=3',
    location: 'Innovate Hub, Sector 4',
    price: '$10',
    description: 'Connect with founders, investors, and developers. Pizza and beer provided. Keynote by Sarah Jenkins (CTO at Nexus).',
    tags: ['Networking', 'Tech', 'Career'],
    organizer: 'TechMeet'
  },
  {
    id: '4',
    title: 'Underground Techno Bunker',
    date: 'Fri, Oct 31',
    time: '11:55 PM',
    imageUrl: 'https://picsum.photos/600/800?random=4',
    location: 'Secret Warehouse Location',
    price: '$40',
    description: 'Hard techno, industrial vibes, strict no-photo policy. Dress code: All Black.',
    tags: ['Techno', 'Rave', 'Underground'],
    organizer: 'Warehouse Project'
  },
  {
    id: '5',
    title: 'Modern Art Gallery Opening',
    date: 'Thu, Nov 2',
    time: '7:00 PM',
    imageUrl: 'https://picsum.photos/600/800?random=5',
    location: 'The White Cube',
    price: 'Free',
    description: 'Be the first to see the "Digital Dreams" exhibition. Champagne reception and meet the artists.',
    tags: ['Art', 'Culture', 'Exhibition'],
    organizer: 'Modern Art Collective'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    await delay(500);
    return [...MOCK_EVENTS];
  },

  likeEvent: async (eventId: string): Promise<void> => {
    console.log(`[API] Liked event: ${eventId}`);
    // In real app: await fetch('/api/events/like', ...)
  },

  skipEvent: async (eventId: string): Promise<void> => {
    console.log(`[API] Skipped event: ${eventId}`);
  },

  superLikeEvent: async (eventId: string): Promise<void> => {
    console.log(`[API] Super Liked event: ${eventId}`);
  }
};