export interface onboard {
  artistId: number;
  profileUrl: string;
  name: string;
}

export interface onboardResponse {
  artists: onboard[];
}
