import axios from "axios";

export const getUsers = async() => {
    const {data} = await axios.get('http://localhost:8080/users');
    return data;
  };