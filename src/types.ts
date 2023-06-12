export interface nowPlaying {
  name: string;
  subName: string;
  url: string;
  upNext?: string;
  hidden?: boolean;
}

export interface volumes {
  volume: string;
  url: string;
}

export interface instructionals {
  name: String;
  volumes: volumes[];
}
