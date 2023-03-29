function fetchFunction(path, method = METHOD.GET, body) {
  console.log(
    "fetching at ",
    path,
    " with method ",
    method,
    " and body ",
    body && JSON.stringify(body)
  );
  return fetch(path, {
    method: method,
    body: body && JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .catch((error) => {
      console.log(error);
      throw error;
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    });
}

export const METHOD = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
};

export default fetchFunction;
