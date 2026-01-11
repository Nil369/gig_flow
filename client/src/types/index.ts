export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  ownerId: User;
  status: 'open' | 'assigned';
  createdAt: string;
  updatedAt: string;
}

export interface Bid {
  _id: string;
  gigId: Gig | string;
  freelancerId: User;
  message: string;
  price: number;
  status: 'pending' | 'hired' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  gigTitle?: string;
  timestamp: Date;
}
