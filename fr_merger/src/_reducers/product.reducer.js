import { DELETE_PRODUCT_ERROR, FETECHED_ALL_PRODUCT, FETECHED_ALL_PRODUCT_ERROR, DELETED_PRODUCT } from "../_const/actions"
import { DELETED_PRODUCT_FAIL_MESSAGE, FETCH_ALL_PRODUCT_FAIL } from "../_const/message"

const initialState = {
    product: [],
    searchText: '',
    page: 1,
    totalPage: 1,
    totalItems: 1,
    size: 10,
    isError: false,
    messageError: '',
    isDelete: false
};


export function product(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_PRODUCT:
            return {
                ...state,
                product: action.product,
                page: action.page,
                totalPage: action.totalPage,
                size: action.size,
                searchText: action.searchText,
                isError: false,
                isDelete: false
            };
        case FETECHED_ALL_PRODUCT_ERROR:
            return {
                ...state,
                isError: true,
                messageError: FETCH_ALL_PRODUCT_FAIL,
                isDelete: false
            };
        case DELETE_PRODUCT_ERROR:
            return {
                ...state,
                isError: true,
                messageError: DELETED_PRODUCT_FAIL_MESSAGE,
                isDelete: false
            };
        case DELETED_PRODUCT:
            return {
                ...state,
                isDelete: true
            }
        default:
            return {...state, isError: false, isDelete: false}
    }
}