import { apiRoute, route } from "@/constants/routes";
import { getCookie } from "@/utils/getCookie";
import compareWidgets from "@/utils/compareWidgets";

const token = getCookie("token");

const getWidgets = async (widget_id = null) => {
  try {
    const params = new URLSearchParams();
    let url = apiRoute["WIDGETS"];
    if (widget_id) {
      params.append("widget_id", widget_id);
      url = apiRoute["USER_WIDGET"];
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
    const url = apiRoute["USER_WIDGET"];
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
    const url = apiRoute["WIDGETS"];
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

const saveEditedWidgets = async (widget_id, editedWidgetData, savedWidgetData) => {
  try {
    const url = apiRoute["USER_WIDGET"];
    const [updatedFields, updatedData] = compareWidgets(editedWidgetData, savedWidgetData);
    console.log({updatedData, updatedFields})
    if (updatedFields.length === 0){
        return { success: true, message: "No update necessary" };
    }
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ widget_id: widget_id, updated_fields: updatedFields, updated_data: updatedData }),
    });
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Server returned non-JSON response");
    }
    const result = await response.json();
    if (!result.success) {
      const errorText = result.message;
      console.error("API Error Response:", errorText);
      // throw new Error(`API Error: ${errorText || "Unknown error"}`);
    }
    return result;
  } catch (error) {
    console.error("Error deleting widget:", error);
    throw error;
  }
};

export { getWidgets, deleteWidget, saveNewWidgets, saveEditedWidgets };
