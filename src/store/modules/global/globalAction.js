import types from '../../types'
import store from '../../index'

import {
  getDS,
  getDSPage} from '../../../util'
import {Platform} from 'react-native'


export function setSessionToken(sessionToken) {
  return {
    type: types.SET_SESSION_TOKEN,
    payload: sessionToken
  };
}

export function setStore(store) {
  return {
    type: types.SET_STORE,
    payload: store
  };
}

export function setState(newState) {
  return {
    type: types.SET_STATE,
    payload: newState
  };
}

export function getState(toggle) {
  return {
    type: types.GET_STATE,
    payload: toggle
  };
}
// new
export function setFetchData(id_account){
  return {
    type:types.SET_FETCH_DATA,
    payload:id_account
  }
}
export function goToLogin(){
  return {
    type:types.GO_TO_LOGIN,
    
  }
}
export function doLogin(){
  return {
    type:types.DO_LOGIN
  }
}
export function setAppStatus(data){
  return {
    type:types.SET_APP_STATUS,
    payload:data
  }
}
export function setProductTypeData(proData){
  return {
    type:types.SET_PRODUCT_TYPE_DATA,
    payload:{
      proTpyeDataArray: getDS().cloneWithRows(proData),
      proTypeLoaded:true,
    }
  }
}

export function getProductType(Url){
  return dispatch=>{
    fetch(Url)
      .then((response) => response.json())
      .then((responseData) => {
         dispatch(setProductTypeData(responseData))

       })
      .done();
  }
}

export function selectProID (pid){
  return{
    type:types.SELECT_PID,
    payload:{
      pid
    }
  }
}

export function setIndexDS (res){
  let newDS = getDS().cloneWithRows(res.list);
  let newDSP = getDSPage().cloneWithPages(res.advert)
  return {
    type:types.SET_INDEX_DS,
    payload:{
      proIndexDS: newDS,
      proIndexDSPage: newDSP,
    }
  }
}



export function selectProByID(data,cb){
  return dispatch => {
    return fetch(data.url)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        dispatch(setIndexDS(responseData))
        cb && cb()
      })
      .done()
  }
}

export function setInfoData(res){
  return {
    type:types.SET_INFO_DS,
    payload:{
      InfoDS: res,
      InfoDS_loaded:true,
    }
  }

}

export function queryInfo(){
  let {webDomain} = store.getState().global;
  return dispatch =>{
    return fetch(webDomain+'/api/getNewsType')
      .then((response) => response.json())
      .then((responseData) => {
        dispatch(setInfoData(responseData))
      })
      .done()
  }
}

