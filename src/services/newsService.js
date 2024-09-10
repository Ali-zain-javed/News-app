import axios from "axios";
import { useQuery } from "react-query";

// Fetch articles from NewsAPI
const fetchNewsAPIArticles = async (searchTerm, filters) => {
  const { date, category, source, page = 1, author } = filters || {};
  const formattedDate = date
    ? new Date(date).toISOString().split("T")[0]
    : null;
  const newsAPIKey = process.env.REACT_APP_NEWS_API_KEY;
  let endpoint = process.env.REACT_APP_NEWS_API_URL;

  if (page) {
    endpoint += `page=${page}&`;
  }
  if (formattedDate) {
    endpoint += `&from=${formattedDate}&to=${formattedDate}&`;
  }
  if (author) {
    endpoint += `q=${author}&`;
  }

  if (searchTerm) {
    endpoint += `q=${searchTerm}&`;
  }

  if (category) {
    endpoint += `category=${category}&`;
  }

  try {
    const { data } = await axios.get(`${endpoint}apiKey=${newsAPIKey}`);
    return data;
  } catch (error) {
    console.error("Error fetching news articles:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch news articles"
    );
  }
};

// Fetch articles from The Guardian API
const fetchGuardianArticles = async (searchTerm, filters) => {
  const { date, category, source, page = 1, author } = filters || {};
  const formattedDate = date
    ? new Date(date).toISOString().split("T")[0]
    : null;
  const guardianAPIKey = process.env.REACT_APP_GUARDIAN_API_KEY;
  let endpoint = process.env.REACT_APP_GUARDIAN_API_URL;

  if (page) {
    endpoint += `page=${page}&`;
  }
  endpoint += "show-fields=thumbnail,byline&";

  if (searchTerm) {
    endpoint += `q=${searchTerm}&`;
  }
  if (author) {
    endpoint += `q=${author}&`;
  }
  if (category) {
    endpoint += `section=${category}&`;
  }
  if (formattedDate) {
    endpoint += `from-date=${formattedDate}&to-date=${formattedDate}&`;
  }
  if (source) {
    endpoint += `source=${source}&`;
  }

  try {
    const { data } = await axios.get(`${endpoint}api-key=${guardianAPIKey}`);
    return data.response;
  } catch (error) {
    console.error("Error fetching Guardian articles:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch Guardian articles"
    );
  }
};

const fetchNYTArticles = async (searchTerm, filters) => {
  const { date, category, page = 1, author } = filters || {};
  const nytAPIKey = process.env.REACT_APP_NYT_API_KEY; // Secure API key usage
  const nytApiBaseURL = process.env.REACT_APP_NYT_API_URL;
  const formattedDate = date
    ? new Date(date).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  let params = {
    "api-key": nytAPIKey,
    pub_date: formattedDate,
  };
  if (page) {
    params.page = page;
  }
  if (author) {
    params.q = author;
  }

  if (searchTerm) {
    params.q = searchTerm;
  }
  if (category) {
    params.fq = `section_name:${category}`;
  }

  try {
    const { data } = await axios.get(nytApiBaseURL, { params });
    return data?.response;
  } catch (error) {
    console.error("Error fetching NYT articles:", error);
    throw new Error(
      error?.response?.data?.fault?.faultstring ||
        "Failed to fetch NYT articles"
    );
  }
};

export const useNewsAPIArticles = (searchTerm, filters) => {
  return useQuery(
    ["news", { searchTerm, ...filters }],
    () => fetchNewsAPIArticles(searchTerm, filters),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 300000,
      enabled:
        filters?.source === "newsapi" ||
        filters?.source?.split(",").includes("newsapi") ||
        filters?.source === "",
    }
  );
};

// React component using `useQuery` to fetch data from The Guardian API
export const useGuardianArticles = (searchTerm, filters) => {
  return useQuery(
    ["guardian", { searchTerm, ...filters }],
    () => fetchGuardianArticles(searchTerm, filters),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 300000,
      enabled:
        filters?.source === "guardian" ||
        filters?.source?.split(",").includes("guardian") ||
        filters?.source === "",
    }
  );
};

// React component using `useQuery` to fetch data from The New York Times API
export const useNYTArticles = (searchTerm, filters) => {
  return useQuery(
    ["nyt", { searchTerm, ...filters }],
    () => fetchNYTArticles(searchTerm, filters),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 300000,
      enabled:
        filters?.source === "nyt" ||
        filters?.source?.split(",").includes("nyt") ||
        filters?.source === "",
    }
  );
};
