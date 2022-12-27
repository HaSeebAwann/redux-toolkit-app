import axios from "axios";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const getPosts = async () => {
    const {data} = await instance.get("/posts");
    console.log(data)
    return data;
}