import INFO from "./data.json";

// проверка ответа от сервера
export function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error("Ошибка при взаимодействии с сервером!");
}
// функция для получения данных с сервера
export const getIngredients = async () => {
  const urlIngredients = "ingredients";
  const response = await fetch(INFO.baseURL + urlIngredients, {
    method: "GET",
    headers: INFO.headers,
  });
  return checkResponse(response);
};
// функция для отправки данных на сервер
export const postOrderDetails = async (data) => {
  const urlOrders = "orders";
  const response = await fetch(INFO.baseURL + urlOrders, {
    method: "POST",
    headers: INFO.headers,
    body: JSON.stringify({ 'ingredients': data }),
  });
  return checkResponse(response);
};
