import axios from "axios";

export default async function fetchPerson(id: number) {
  const response = await axios.get(`https://swapi.info/api/people/${id}`);
  return response.data;
}

export async function fetchCharacter(id: string) {
  const response = await axios.get(`https://swapi.info/api/people/${id}`);
  return response.data;
}

export interface Article {
  objectID: string;
  title: string;
  url: string;
}

interface ArticlesHttpResponse {
  hits: Article[];
  nbPages: number;
}

export const fetchArticles = async (topic: string, page: number) => {
  const response = await axios.get<ArticlesHttpResponse>(
    "https://hn.algolia.com/api/v1/search",
    {
      params: {
        query: topic,
        page,
      },
    }
  );

  return response.data;
};
