export * from './lang'
import {ListView} from 'react-native'
import ViewPager from 'react-native-viewpager';

export let getDS = () => (new ListView.DataSource({rowHasChanged: () => ri !== r2}))
export let getDSPage = () => (new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2,}))

export function createReducer (initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type]
    let _State = reducer ? reducer(state, action.payload) : {}
    return { ...initialState, ..._State }
  }
}