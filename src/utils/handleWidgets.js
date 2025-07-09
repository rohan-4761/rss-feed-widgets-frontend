import { getCookie } from "@/utils/getCookie";

const handleWidgets = async ({
  method = "GET",
  widget_id = null,
  widget_data = {},
}) => {
  try {
    const token = getCookie("token");
    const params = new URLSearchParams();
    switch (method) {
      case "GET": {
        if (widget_id) {
          params.append("widget_id", widget_id);
        }
        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/widgets${
          queryString ? `?${queryString}` : ""
        }`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
          const errorText = await result.message;
          console.error("API Error Response:", errorText);
          throw new Error(`API Error: ${errorText || "Unknown error"}`);
        }
        return result;
      }
      case "DELETE": {
        if (!widget_id) {
          throw new Error("widget_id is required for DELETE method");
        }
        const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/widgets`;
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            AUthorization: `Bearer ${token}`,
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
      }
      case "POST": {
        if (Object.keys(widget_data).length === 0) {
          throw new Error("widget data is required for POST method");
        }
        const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/widgets`;
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
      }
      case "PUT": {
        if (!widget_id || Object.keys(widget_data).length === 0) {
          throw new Error(
            "widget_id and widget data is required for PUT method"
          );
        }
        const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/widgets`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ widget_id, widget_data }),
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
      }
      default:
        throw new Error("Unsupported method");
    }
  } catch (error) {
    console.error("Error in handleWidgets:", error);
    throw error;
  }
};

const getWidgets = async(widget_id = null) => {
    try{
        const token = getCookie("token");
        const params = new URLSearchParams();
        if (widget_id) {
            params.append("widget_id", widget_id);
        }
        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/widgets${queryString ? `?${queryString}` : ""}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
          const errorText = await result.message;
          console.error("API Error Response:", errorText);
          throw new Error(`API Error: ${errorText || "Unknown error"}`);
        }
        return result;
    } catch(error) {
        console.error('Error fetching widgets:', error);
        return [];
    }
}    

export default handleWidgets;
export { getWidgets };