export interface onboard {
  artistId: string;
  profileUrl: string;
  name: string;
}

export interface onboardResponse {
  artists: onboard[];
}
