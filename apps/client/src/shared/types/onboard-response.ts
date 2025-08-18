export interface onboard {
  artistId: string;
  profileUrl: string;
  name: string;
}

export interface onboardResponse {
  artists: onboard[];
}

export interface onboardStatusResponse {
  onboardStatus: 'PROCESSING' | 'COMPLETED';
}
