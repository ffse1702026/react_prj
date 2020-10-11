import {webComunication}  from '../_service/webcomunication.service';
import {SKU_API} from '../_const/apis';
import {FETECHED_ALL_SKU, } from '../_const/actions';

export const skuAction = {
    getSKU,
    deleteSKUById
};

function getSKU(page, text){
    return dispatch => {
        webComunication.get(SKU_API, {params: {page: page, searchText: text}})
        .then((response)=>{
            dispatch(changeSKUsList(response.data));
        }).catch((err)=>{
            dispatch(getSKUListFail());
        })
    };
}


function deleteSKUById(id, page, text){
    return dispatch => {
        webComunication.deleteDetail(`${SKU_API}/${id}`)
        .then((response)=>{
            dispatch(deleteSKUsDetails());
            dispatch(skuAction.getSKU(page, text));
        }).catch((err) => {
            dispatch(deleteSKUFail());
        })
    };
}

export function changeSKUsList(sku){
    return{
        type: FETECHED_ALL_SKU,
        sku: sku.sku,
        page: sku.page,
        totalPages: sku.totalPages,
        size: sku.size,
        searchText: sku.searchText
    }
}


export function deleteSKUsDetails(){
    return{
        type: "DELETED_SKU"
    }
}

export function getSKUListFail(){
    return{
        type: "FETECHED_ALL_SKU_ERROR"
    }
}

export function deleteSKUFail(){
    return{
        type: "DELETE_SKU_ERROR"
    }
}