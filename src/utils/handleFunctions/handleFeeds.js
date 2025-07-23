import { getCookie } from "@/utils/getCookie";
import { apiRoute } from "@/constants/routes";

function isValidUrl(url) {
  try {
    new URL(url); // Attempt to create a URL object
    return true;  // If successful, the URL is valid
  } catch (error) {
    return false; // If a TypeError is thrown, the URL is invalid
  }
}

export const handleFeeds = async ({
  search,
  source,
  topic,
  limit,
  rssFeed,
} = {}) => {
  try {
    const token = getCookie("token");
    const params = new URLSearchParams();

    if (rssFeed && rssFeed.length >= 1 && isValidUrl(rssFeed)) {
      params.append("rssFeed", rssFeed);
    } else {
      if (search && search.length >= 1) params.append("search", search);
      if (source && source.length >= 1) params.append("source", source);
      if (topic && topic.length >= 1) params.append("topic", topic);
    }
    if (limit && limit.length >= 1) params.append("limit", limit);

    // Only include query string if there are params
    const queryString = params.toString();
    const url = `${apiRoute['FEEDS']}${
      queryString ? `?${queryString}` : ""
    }`;

    const requestHeaders = (token) => {
      if (token === undefined) {
        return {
          "Content-Type": "application/json",
          "X-Embed-Request": "true",
        };
      }
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    };

    const response = await fetch(url, {
      method: "GET",
      headers: requestHeaders(token),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Server returned non-JSON response");
    }

    const result = await response.json();

    if (!result.success) {
      console.error("API Error Response:", result.message);
      throw new Error(`API Error: ${result.message || "Unknown error"}`);
    }
    console.log("API Response:", result.data[0]);
    return result.data;
    
  } catch (error) {
    console.error("Error in handleFeeds:", error);
    throw error;
  }
};
