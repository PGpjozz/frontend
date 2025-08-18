// auth.js
export const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) return null;

  const res = await fetch("http://localhost:8000/api/token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("accessToken", data.access);
    return data.access;
  } else {
    return null;
  }
};

export const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem("accessToken");

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (res.status === 401) {
    token = await refreshToken();
    if (token) {
      res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
  return res;
};
