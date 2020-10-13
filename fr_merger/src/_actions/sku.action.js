import {webComunication}  from '../_service/webcomunication.service';
import {SKU_API} from '../_const/apis';
import {FETECHED_ALL_SKU,FETECHED_ALL_SKU_ERROR,DELETE_SKU_ERROR, DELETED_SKU } from '../_const/actions';

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
        sku: sku.data.items,
        page: sku.data.page,
        totalPage: sku.data.totalPage,
        size: sku.data.size,
        searchText: sku.data.searchText
    }
}


export function deleteSKUsDetails(){
    return{
        type: DELETED_SKU
    }
}

export function getSKUListFail(){
    return{
        type: FETECHED_ALL_SKU_ERROR
    }
}

export function deleteSKUFail(){
    return{
        type: DELETE_SKU_ERROR
    }
}