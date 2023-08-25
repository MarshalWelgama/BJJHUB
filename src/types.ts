export interface nowPlaying {
  name: string;
  subName: string;
  url: string;
  upNext?: string;
  hidden?: boolean;
}

export interface volumes {
  volume: string;
  link: string;
}

export interface instructionals {
  instructional: String;
  volumes: volumes[];
}
