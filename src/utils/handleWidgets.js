import { apiRoutes } from "@/constants/routes";
import { getCookie } from "@/utils/getCookie";

const token = getCookie("token");
const url = apiRoutes["WIDGETS"];

const getWidgets = async (widget_id = null) => {
  try {
    const params = new URLSearchParams();
    if (widget_id) {
      params.append("widget_id", widget_id);
    }
    const queryString = params.toString();
    const getUrl = `${url}${queryString ? `?${queryString}` : ""}`;
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
    const response = await fetch(getUrl, {
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
      const errorText = await result.message;
      console.error("API Error Response:", errorText);
      throw new Error(`API Error: ${errorText || "Unknown error"}`);
    }
    return result;
  } catch (error) {
    console.error("Error fetching widgets:", error);
    return [];
  }
};

const deleteWidget = async (widget_id) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ widget_id }),
    });
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Server returned non-JSON response");
    }
    const result = await response.json();

    if (!result.success) {
      const errorText = await result.message;
      console.error("API Error Response:", errorText);
      throw new Error(`API Error: ${errorText || "Unknown error"}`);
    }
    return result;
  } catch (error) {
    console.error("Error deleting widget:", error);
    throw error;
  }
};

const saveNewWidgets = async (widget_data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ widget_data }),
    });
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Server returned non-JSON response");
    }
    const result = await response.json();
    if (!result.success) {
      const errorText = await result.message;
      console.error("API Error Response:", errorText);
      throw new Error(`API Error: ${errorText || "Unknown error"}`);
    }
    return result;
  } catch (error) {
    console.error("Error deleting widget:", error);
    throw error;
  }
};

const saveEditedWidgets = async (widget_id, widget_data) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ widget_id: widget_id, widget_data: widget_data }),
    });
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Server returned non-JSON response");
    }
    const result = await response.json();
    if (!result.success) {
      const errorText = await result.message;
      console.error("API Error Response:", errorText);
      throw new Error(`API Error: ${errorText || "Unknown error"}`);
    }
    return result;
  } catch (error) {
    console.error("Error deleting widget:", error);
    throw error;
  }
};

export { getWidgets, deleteWidget, saveNewWidgets, saveEditedWidgets };
