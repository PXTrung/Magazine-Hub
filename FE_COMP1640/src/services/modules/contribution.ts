/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
  findAllProducts: () => {
    return axios.get(`http://localhost:4000/products`);
  },
  // filterProductById: (id) => {
  //   return axios.get(`http://localhost:4000/products?productId=${id}`);
  // },
  // filterProductByGender: (gender) => {
  //   return axios.get(`http://localhost:4000/products?gender=${gender}`);
  // },
  // filterProductByGenderAndSort: (gender,type,sort) => {
  //   return axios.get(`http://localhost:4000/products?gender=${gender}&_sort=${type}&_order=${sort}`);
  // },
  // fetchProductsPage: (gender,startItem, pageSize) => {
  //   return axios.get(`http://localhost:4000/products?gender=${gender}&_start=${startItem}&_limit=${pageSize}`);
  // },
  // searchProductByName: (name) => {
  //   return axios.get(`http://localhost:4000/products?name_like=${name}`);
  // },
};