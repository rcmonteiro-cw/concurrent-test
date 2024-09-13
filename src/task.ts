import axios from "axios";

const heavyTask = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const result = await axios.get(url);
    return result.data;
}

export { heavyTask };