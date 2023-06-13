const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const baseUrl = 'https://norma.nomoreparties.space/api/';

const request = (destination, options) => {
  return fetch(`${baseUrl}${destination}`, options)
    .then(checkResponse)
};

const getIngredientsData = () => request('ingredients');

const postOrderData = (ingredients) => {
  return request('orders', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
    }),
  });
};

export { getIngredientsData, postOrderData };
