import axios from "axios";

const heavyTask = async () => {
    const url = 'http://my-mock-server:4000/heavy-task';
    const result = await axios.get(url);
    return result.data;
}

export { heavyTask };