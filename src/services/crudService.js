import AxiosConfig from "./AxiosConfig.js";


export async function getAllAnimals() {
  const response = await AxiosConfig.get('/Animal/');
  return response.data;
}

export async function createAnimal(productData) {
  const response = await AxiosConfig.post("/Animal/", productData);
  return response.data;
}

export async function updateAnimal(id, productData) {
  const response = await AxiosConfig.put(`/Animal/${id}`, productData);
  return response.data;
}

export async function deleteAnimal(id) {
  const response = await AxiosConfig.delete(`/Animal/${id}`);
  return response.data;
}


