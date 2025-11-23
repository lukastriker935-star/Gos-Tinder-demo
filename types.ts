export enum SwipeDirection {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  imageUrl: string;
  location: string;
  price: string;
  description: string;
  tags: string[];
  organizer: string;
}

export interface EventService {
  getEvents: () => Promise<Event[]>;
  likeEvent: (eventId: string) => Promise<void>;
  skipEvent: (eventId: string) => Promise<void>;
  superLikeEvent: (eventId: string) => Promise<void>;
}