export type VehicleType =
  | 'small_car'
  | 'pickup'
  | 'tow_truck'
  | 'large_truck'
  | 'motorbike';

export type ShipmentStatus =
  | 'pending'
  | 'matched'
  | 'in_progress'
  | 'delivered'
  | 'cancelled';

export type DeliveryStatus =
  | 'accepted'
  | 'arrived'
  | 'picked_up'
  | 'in_progress'
  | 'delivered';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Shipment {
  id: string;
  senderName: string;
  senderRating: number;
  vehicleType: VehicleType;
  description: string;
  weight?: number;
  specialRequirements?: string;
  pickup: Location;
  delivery: Location;
  distanceKm: number;
  offeredPrice: number;
  suggestedPriceMin: number;
  suggestedPriceMax: number;
  status: ShipmentStatus;
  createdAt: string;
}

export interface Delivery {
  id: string;
  shipmentId: string;
  senderName: string;
  pickup: Location;
  delivery: Location;
  price: number;
  status: DeliveryStatus;
  completedAt?: string;
}

export interface DriverStats {
  todayEarnings: number;
  todayTrips: number;
  todayHours: number;
  rating: number;
  acceptanceRate: number;
  completionRate: number;
}

export interface EarningsBreakdown {
  period: 'today' | 'week' | 'month';
  total: number;
  tripsCount: number;
  onlineHours: number;
  averagePerTrip: number;
}

export interface Transaction {
  id: string;
  shipmentId: string;
  amount: number;
  date: string;
  senderName: string;
  status: 'released' | 'held' | 'pending';
}

export interface DriverProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  vehicleType: VehicleType;
  plateNumber: string;
  rating: number;
  totalTrips: number;
  memberSince: string;
  verificationStatus: 'approved' | 'pending' | 'rejected';
}
