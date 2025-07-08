import { getCookie } from "@/utils/getCookie";


export const handleFeeds = async ({ search, source, topic } = {}) => {
  try {

    const token = getCookie("token");

    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (source) params.append("source", source);
    if (topic) params.append("topic", topic);

    // Only include query string if there are params
    const queryString = params.toString();
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/feeds${
      queryString ? `?${queryString}` : ""
    }`;

    console.log("Fetching from URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
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
