import axios from 'axios';

const API_URL = 'http://localhost:3000/v1'; 

function getAuthHeaders() {    
    const token = 'secretToken123';
    return {
      headers: {
        'x-api-token': `${token}`,
        'Content-Type': 'application/json'
      }
    };
  }

export default {
  getCars() {
    return axios.get(`${API_URL}/getCars`, getAuthHeaders());
  },
  addCar(car) {
    return axios.post(`${API_URL}/addCar`, car, getAuthHeaders());
  }
};