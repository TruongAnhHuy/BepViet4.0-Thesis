const API_URL = "http://localhost:8000/api";

export const getMenu = () =>
  fetch(`${API_URL}/menu`).then(res => res.json());

export const getSlides = () =>
  fetch(`${API_URL}/slide`).then(res => res.json());

export const getProducts = () =>
  fetch(`${API_URL}/products`).then(res => res.json());
