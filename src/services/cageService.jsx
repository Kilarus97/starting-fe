import AxiosConfig from "./AxiosConfig.js";

export async function getAllCages() {
  const response = await AxiosConfig.get('/Cage/');
  return response.data;
}

export async function getCageById(id) {
    const response = await AxiosConfig.get(`/Cage/${id}`);
    return response.data;
}

export async function createCage(cageData) {
    const response = await AxiosConfig.post("/Cage/", cageData);
    return response.data;
}

export async function updateCage(cageData) {
    const response = await AxiosConfig.put("/Cage/", cageData);
    return response.data;
}

export async function deleteCage(id) {
    const response = await AxiosConfig.delete(`/Cage/${id}`);
    return response.data;
}