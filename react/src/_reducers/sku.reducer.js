import { DELETE_SKU_ERROR, FETECHED_ALL_SKU, FETECHED_ALL_SKU_ERROR } from "../_const/actions"
const initialState = {
    sku: [],
    searchText: '',
    page: 1,
    totalPages: 1,
    totalElements: 1,
    size: 10,
    isError: false,
    messageError: ''
};


export function sku(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_SKU:
            return {
                ...state,
                sku: action.sku,
                page: action.page,
                totalPages: action.totalPages,
                size: action.size,
                searchText: action.searchText,
                isError: false
            };
        case FETECHED_ALL_SKU_ERROR:
            return {
                ...state,
                isError: true,
                messageError: 'Cannot get data SKU from server'
            };
        case DELETE_SKU_ERROR:
            return {
                ...state,
                isError: true,
                messageError: 'Cannot delete data SKU'
            };
        default:
            return {...state, isError: false}
    }
}