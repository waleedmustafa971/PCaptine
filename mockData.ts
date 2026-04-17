import {
  Shipment,
  Delivery,
  DriverStats,
  EarningsBreakdown,
  Transaction,
  DriverProfile,
  ChatMessage,
  AppNotification,
  Rating,
  KYCStatus,
} from './types';

export const mockDriverProfile: DriverProfile = {
  id: 'drv_001',
  fullName: 'Waleed Ibrahim',
  phone: '+971 50 123 4567',
  email: 'waleed@perego.ae',
  vehicleType: 'pickup',
  plateNumber: 'DXB A 45821',
  rating: 4.87,
  totalTrips: 1247,
  memberSince: 'March 2024',
  verificationStatus: 'approved',
};

export const mockDriverStats: DriverStats = {
  todayEarnings: 342.5,
  todayTrips: 8,
  todayHours: 6.5,
  rating: 4.87,
  acceptanceRate: 94,
  completionRate: 98,
};

export const mockAvailableJobs: Shipment[] = [
  {
    id: 'shp_101',
    senderName: 'Ahmed Al Mansoori',
    senderRating: 4.9,
    vehicleType: 'pickup',
    description: 'Office furniture — 1 desk, 2 chairs',
    weight: 45,
    specialRequirements: 'Handle with care',
    pickup: {
      lat: 25.2048,
      lng: 55.2708,
      address: 'Business Bay, Tower 12, Dubai',
    },
    delivery: {
      lat: 25.1972,
      lng: 55.2744,
      address: 'Downtown, Burj Residence, Dubai',
    },
    distanceKm: 4.2,
    offeredPrice: 85,
    suggestedPriceMin: 70,
    suggestedPriceMax: 95,
    status: 'pending',
    createdAt: '2026-04-17T08:42:00Z',
  },
  {
    id: 'shp_102',
    senderName: 'Sarah Hassan',
    senderRating: 4.6,
    vehicleType: 'pickup',
    description: 'Three boxes of documents',
    weight: 12,
    pickup: {
      lat: 25.0772,
      lng: 55.1409,
      address: 'JBR Walk, Marina, Dubai',
    },
    delivery: {
      lat: 25.1124,
      lng: 55.1389,
      address: 'Al Sufouh Road, Dubai',
    },
    distanceKm: 6.8,
    offeredPrice: 65,
    suggestedPriceMin: 55,
    suggestedPriceMax: 80,
    status: 'pending',
    createdAt: '2026-04-17T08:38:00Z',
  },
  {
    id: 'shp_103',
    senderName: 'Mohammed Faisal',
    senderRating: 5.0,
    vehicleType: 'pickup',
    description: 'Small appliance — microwave oven',
    weight: 8,
    specialRequirements: 'Fragile',
    pickup: {
      lat: 25.2522,
      lng: 55.3646,
      address: 'Dubai Festival City, Dubai',
    },
    delivery: {
      lat: 25.2854,
      lng: 55.3209,
      address: 'Deira, Al Rigga, Dubai',
    },
    distanceKm: 8.5,
    offeredPrice: 95,
    suggestedPriceMin: 80,
    suggestedPriceMax: 110,
    status: 'pending',
    createdAt: '2026-04-17T08:31:00Z',
  },
];

export const mockActiveDeliveries: Delivery[] = [
  {
    id: 'dlv_501',
    shipmentId: 'shp_088',
    senderName: 'Khaled Rashid',
    pickup: {
      lat: 25.2048,
      lng: 55.2708,
      address: 'Al Wasl Road, Jumeirah, Dubai',
    },
    delivery: {
      lat: 25.0772,
      lng: 55.1409,
      address: 'Dubai Marina Mall, Dubai',
    },
    price: 120,
    status: 'in_progress',
  },
];

export const mockRecentDeliveries: Delivery[] = [
  {
    id: 'dlv_499',
    shipmentId: 'shp_085',
    senderName: 'Layla Abdullah',
    pickup: {
      lat: 0,
      lng: 0,
      address: 'Al Barsha, Dubai',
    },
    delivery: {
      lat: 0,
      lng: 0,
      address: 'Deira, Dubai',
    },
    price: 55,
    status: 'delivered',
    completedAt: '2026-04-17T07:15:00Z',
  },
  {
    id: 'dlv_498',
    shipmentId: 'shp_084',
    senderName: 'Omar Siddique',
    pickup: {
      lat: 0,
      lng: 0,
      address: 'Business Bay, Dubai',
    },
    delivery: {
      lat: 0,
      lng: 0,
      address: 'JLT, Dubai',
    },
    price: 42,
    status: 'delivered',
    completedAt: '2026-04-17T06:20:00Z',
  },
  {
    id: 'dlv_497',
    shipmentId: 'shp_083',
    senderName: 'Fatima Al Zaabi',
    pickup: {
      lat: 0,
      lng: 0,
      address: 'Sheikh Zayed Road, Dubai',
    },
    delivery: {
      lat: 0,
      lng: 0,
      address: 'Al Quoz, Dubai',
    },
    price: 68,
    status: 'delivered',
    completedAt: '2026-04-17T05:45:00Z',
  },
];

export const mockEarnings: Record<'today' | 'week' | 'month', EarningsBreakdown> = {
  today: {
    period: 'today',
    total: 342.5,
    tripsCount: 8,
    onlineHours: 6.5,
    averagePerTrip: 42.81,
  },
  week: {
    period: 'week',
    total: 2148.75,
    tripsCount: 47,
    onlineHours: 38.2,
    averagePerTrip: 45.72,
  },
  month: {
    period: 'month',
    total: 8924.3,
    tripsCount: 201,
    onlineHours: 164.8,
    averagePerTrip: 44.4,
  },
};

export const mockTransactions: Transaction[] = [
  {
    id: 'txn_901',
    shipmentId: 'shp_085',
    amount: 55,
    date: '2026-04-17T07:15:00Z',
    senderName: 'Layla Abdullah',
    status: 'released',
  },
  {
    id: 'txn_900',
    shipmentId: 'shp_084',
    amount: 42,
    date: '2026-04-17T06:20:00Z',
    senderName: 'Omar Siddique',
    status: 'released',
  },
  {
    id: 'txn_899',
    shipmentId: 'shp_083',
    amount: 68,
    date: '2026-04-17T05:45:00Z',
    senderName: 'Fatima Al Zaabi',
    status: 'released',
  },
  {
    id: 'txn_898',
    shipmentId: 'shp_082',
    amount: 95,
    date: '2026-04-16T22:10:00Z',
    senderName: 'Yusuf Al Nuaimi',
    status: 'released',
  },
  {
    id: 'txn_897',
    shipmentId: 'shp_081',
    amount: 38,
    date: '2026-04-16T19:30:00Z',
    senderName: 'Aisha Rahman',
    status: 'released',
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg_001',
    deliveryId: 'dlv_501',
    sender: 'sender',
    text: 'Hi, are you on your way to pick up the items?',
    timestamp: '2026-04-17T09:10:00Z',
    read: true,
  },
  {
    id: 'msg_002',
    deliveryId: 'dlv_501',
    sender: 'driver',
    text: 'Yes, I am about 10 minutes away from the pickup location.',
    timestamp: '2026-04-17T09:11:30Z',
    read: true,
  },
  {
    id: 'msg_003',
    deliveryId: 'dlv_501',
    sender: 'sender',
    text: 'Great! The items are packed and ready. Please call when you arrive.',
    timestamp: '2026-04-17T09:12:00Z',
    read: true,
  },
  {
    id: 'msg_004',
    deliveryId: 'dlv_501',
    sender: 'driver',
    text: 'Will do. See you shortly.',
    timestamp: '2026-04-17T09:12:45Z',
    read: true,
  },
  {
    id: 'msg_005',
    deliveryId: 'dlv_501',
    sender: 'sender',
    text: 'The desk has glass on top — please handle with care.',
    timestamp: '2026-04-17T09:14:00Z',
    read: false,
  },
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'notif_001',
    type: 'new_job',
    title: 'New job nearby',
    body: 'A pickup in Business Bay — AED 85. Tap to view.',
    timestamp: '2026-04-17T09:42:00Z',
    read: false,
    relatedId: 'shp_101',
  },
  {
    id: 'notif_002',
    type: 'payment',
    title: 'Payment released',
    body: 'AED 55 from Layla Abdullah has been released to your wallet.',
    timestamp: '2026-04-17T07:16:00Z',
    read: false,
    relatedId: 'txn_901',
  },
  {
    id: 'notif_003',
    type: 'offer_accepted',
    title: 'Counter-offer accepted',
    body: 'Omar Siddique accepted your counter-offer of AED 45.',
    timestamp: '2026-04-17T06:05:00Z',
    read: true,
    relatedId: 'shp_084',
  },
  {
    id: 'notif_004',
    type: 'new_job',
    title: 'New job nearby',
    body: 'Pickup in JBR — AED 65. 2 drivers looking at it.',
    timestamp: '2026-04-17T05:58:00Z',
    read: true,
    relatedId: 'shp_102',
  },
  {
    id: 'notif_005',
    type: 'system',
    title: 'Profile fully verified',
    body: 'Your documents have been reviewed and approved. You are now fully verified.',
    timestamp: '2026-04-16T14:30:00Z',
    read: true,
  },
  {
    id: 'notif_006',
    type: 'payment',
    title: 'Weekly earnings summary',
    body: 'You earned AED 2,148.75 this week across 47 trips. Great work!',
    timestamp: '2026-04-14T20:00:00Z',
    read: true,
  },
];

export const mockRatings: Rating[] = [
  {
    id: 'rat_001',
    deliveryId: 'dlv_499',
    senderName: 'Layla Abdullah',
    stars: 5,
    comment: 'Very professional and careful with my items. Highly recommended!',
    givenAt: '2026-04-17T07:20:00Z',
  },
  {
    id: 'rat_002',
    deliveryId: 'dlv_498',
    senderName: 'Omar Siddique',
    stars: 5,
    comment: 'Fast and punctual. Will use again.',
    givenAt: '2026-04-17T06:25:00Z',
  },
  {
    id: 'rat_003',
    deliveryId: 'dlv_497',
    senderName: 'Fatima Al Zaabi',
    stars: 4,
    givenAt: '2026-04-17T05:50:00Z',
  },
];

export const mockKYCStatus: KYCStatus = {
  license: 'approved',
  vehicleRegistration: 'approved',
  selfie: 'approved',
  overallStatus: 'approved',
};
