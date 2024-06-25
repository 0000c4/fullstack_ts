import { INewTask, ITask } from "../types/ITask";

const SERVER_URL = 'http://localhost:8080/api/tasks'

class taskApi {
    async getAll(): Promise<Array<ITask> | string> {
        const response = await fetch(SERVER_URL)
        if (response.ok) {
            return await response.json();
        } else {
            return "Ошибка HTTP: " + response.status
        }
    }
    async add(task: INewTask): Promise<Array<ITask> | string> {
        const response = await fetch(SERVER_URL, {
            method: "POST",
            body: JSON.stringify({ task }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {
            return await response.json();
        } else {
            return "Ошибка HTTP: " + response.status
        }
    }
    async update(id: string, task: ITask): Promise<Array<ITask> | string> {
        const response = await fetch(SERVER_URL + '/' + id, {
            method: "PUT",
            body: JSON.stringify({ task }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {
            return await response.json();
        } else {
            return "Ошибка HTTP: " + response.status
        }
    }
    async delete(id: string): Promise<Array<ITask> | string> {
        const response = await fetch(SERVER_URL + '/' + id, {
            method: "DELETE"
        })
        if (response.ok) {
            return await response.json();
        } else {
            return "Ошибка HTTP: " + response.status
        }
    }
}

export default new taskApi()