export interface IShow {
  id: number;
  name: string;
  summary: string;
  language: string;
  officialSite: string;
  rating: {
    average: number;
  };
  genres: Array<string>;
  image: {
    medium: string;
    original: string;
  };
}
