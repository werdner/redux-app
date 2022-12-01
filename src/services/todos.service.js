import { httpService } from "./http.service"

const todosEndpoint = "todos/"

export const todosService = {
    fetch: async() => {
        const {data} = await httpService.get(todosEndpoint, {
            params: {
                _page: 1,
                _limit: 10,
            }
        })

        return data
    },
    create: async(id) => {
        const {data} = await httpService.put(todosEndpoint + id, {
            title: 'foo',
            completed: false,
            id,
            userId: 1,
        })

        return data
    }
}