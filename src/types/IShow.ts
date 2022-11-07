export interface IShow {
  id: number;
  name: string;
  summary: string;
  language: string;
  officialSite: string;
  genres: Array<string>;
  rating: {
    average: number;
  };
  image: {
    medium: string;
    original: string;
  };
}
