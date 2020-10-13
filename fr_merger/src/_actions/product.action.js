import {webComunication}  from '../_service/webcomunication.service';
import {PRODUCT_API} from '../_const/apis';
import {FETECHED_ALL_Product,FETECHED_ALL_PRODUCT_ERROR,DELETE_PRODUCT_ERROR, DELETED_PRODUCT } from '../_const/actions';

export const skuAction = {
    getProduct,
    deleteProductById
};

function getProduct(page, text){
    return dispatch => {
        webComunication.get(PRODUCT_API, {params: {page: page, searchText: text}})
        .then((response)=>{
            dispatch(changeProductsList(response.data));
        }).catch((err)=>{
            dispatch(getProductListFail());
        })
    };
}


function deleteProductById(id, page, text){
    return dispatch => {
        webComunication.deleteDetail(`${PRODUCT_API}/${id}`)
        .then((response)=>{
            dispatch(deleteProductsDetails());
            dispatch(skuAction.getProduct(page, text));
        }).catch((err) => {
            dispatch(deleteProductFail());
        })
    };
}

export function changeProductsList(sku){
    return{
        type: FETECHED_ALL_PRODUCT,
        sku: sku.data.items,
        page: sku.data.page,
        totalPage: sku.data.totalPage,
        size: sku.data.size,
        searchText: sku.data.searchText
    }
}


export function deleteProductsDetails(){
    return{
        type: DELETED_PRODUCT
    }
}

export function getProductListFail(){
    return{
        type: FETECHED_ALL_PRODUCT_ERROR
    }
}

export function deleteProductFail(){
    return{
        type: DELETE_PRODUCT_ERROR
    }
}