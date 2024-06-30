import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';
const ACCESS_KEY = 'p9jPdTMsOJKmgfo_jo2bj-wfOe76hOP3LBK9upAK61c';

export interface Image {
  id: number;
  urls: { regular: string; small: string };
  alt_description: string;
  likes: number;
}

export interface ApiResponse {
  results: Image[];
  total_pages: number;
}

export const getImages = async (
  topic: string,
  currentPage: number
): Promise<ApiResponse> => {
  const response = await axios.get(`/search/photos`, {
    params: {
      query: topic,
      client_id: `${ACCESS_KEY}`,
      page: currentPage,
      per_page: 12,
    },
  });
  const total_pages = response.data.total_pages;
  return {
    results: response.data.results,
    total_pages: total_pages,
  };
};
