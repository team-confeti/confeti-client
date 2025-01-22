interface Ticketing {
  index: number;
  typeId: number;
  type: 'concert' | 'festival';
  subtitle: string;
  reserveAt: string;
  reservationBgUrl: string;
}

export interface TicketingResponse {
  performanceCount: number;
  performances: Ticketing[];
}
