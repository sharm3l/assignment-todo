const apiUrl = "http://localhost:3000/";

async function getData() {
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
  });
  const data = await response.json();
  return data;
}

async function addItem(description) {
  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      description,
      done: false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
  });

  const data = await response.json();
  return data;
}

async function deleteItem(item) {
  const response = await fetch(apiUrl + item, {
    method: "DELETE",
  }).catch(() => {
    return false;
  });

  return response.status === 204;
}


