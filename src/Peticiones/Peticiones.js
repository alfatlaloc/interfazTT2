export async function getData(url, data = {}) {
  let urlWithParams = new URL(url);

  Object.keys(data).forEach((key) =>
    urlWithParams.searchParams.append(key, data[key])
  );

  const response = await fetch(urlWithParams, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function getLast(url) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
