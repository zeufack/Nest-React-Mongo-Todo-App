import axios from "axios";



const SERVER_URL = 'http://localhost:5000/todo';


export function getAll() {
    return axios.get(SERVER_URL);
}

export function addTask(task: string) {

}