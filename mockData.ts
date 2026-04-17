import {
  Shipment,
  Delivery,
  DriverStats,
  EarningsBreakdown,
  Transaction,
  DriverProfile,
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
