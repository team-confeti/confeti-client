export interface Stage {
  id: string;
  name: string;
}

export interface PriceInfo {
  type: string;
  price: string;
}

export interface BookingLink {
  name: string;
  url: string;
  logoUrl?: string;
}

export interface BookingSchedule {
  name: string;
  startDate: string;
}
