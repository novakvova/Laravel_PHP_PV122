export interface ICategoryItem {
    id: number,
    name: string,
    image: string,
    description: string
}

export interface ICategoryResponse {
    data: Array<ICategoryItem>, //Записи, які ми отримали по даній сторінці
    current_page: number, //поточна сторінка зараз
    total: number,        //Кількість усіх записів
    last_page: number     //кількість усіх сторінок 2
}


export interface ICategorySearch {
    page?: number|string|null
}