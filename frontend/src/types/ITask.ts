export interface ITask{
    _id: string,
    key: number,
    name: string,
    description: string,
    created_at: string,
    tags: string,
    date_of_completion?: string,
    custom_fields: Array<{key: string, value: string}>
}
export interface INewTask{
    name: string,
    description: string,
    created_at: string,
    tags: string,
    date_of_completion?: string,
    custom_fields: Array<{key: string, value: string}>
}