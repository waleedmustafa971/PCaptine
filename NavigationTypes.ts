export type RootStackParamList = {
  // Auth
  Phone: undefined;
  OTP: { phone: string };
  Register: { phone: string };
  // KYC
  KYC: undefined;
  // Main tabs
  MainTabs: undefined;
  // Overlay screens accessible from tabs
  JobDetail: { jobId: string };
  ActiveDelivery: { deliveryId: string };
  Chat: { deliveryId: string; senderName: string };
  Rating: { deliveryId: string; senderName: string; price: number };
  Notifications: undefined;
};
