type Body = Object | undefined | FormData;
type Method = "GET" | "POST" | "PUT" | "DELETE";

export const handleFetch = async (url: string, method: Method, body: Body = undefined, header: Object): Promise<any> => {
  let data: Body = undefined;
  if (body instanceof FormData) {
    data = body;
  } else if (body && method !== "GET") {
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value);
    });
    data = formData;
  }

  const headers = new Headers();
  Object.entries(header).forEach(([key, value]) => {
    headers.append(key, value);
  });

  headers.append("Accept", "application/json");

  try {
    const fetchOptions: Object = {
      method,
      headers,
      ...(method !== "GET" ? { body: data } : {}),
    };
    const response = await fetch(url, fetchOptions);
    const res = await response.json();
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
