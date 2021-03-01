import axios from 'axios';

export interface BreedData {
  name: string;
  origin: string;
  weight: string;
}

export default class ApiService {
  async getBreeds(name: string) {
    const response = await axios.get(
      `./api/breeds/${encodeURIComponent(name)}.json`
    );
    return response.data as BreedData[];
  }

  async getAnimals() {
    const response = await axios.get(`./api/animals.json`);
    return response.data as string[];
  }
}
