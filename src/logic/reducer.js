export const languages = {
    eeuu: 'en',
    spain: 'es',
    france: 'fr',
    germany: 'de',
    auto: 'auto'
}

export const initialState = {
    fromLang : 'auto',
    toLang : 'en',
    fromText: '',
    toText: '',
    loading: false
}

export const reducer = (state, action) => {

    if (action.type === 'INTERCHANGE') {
      if(state.fromLang === "auto") return state
      return {...state, 
        fromLang: state.toLang, 
        toLang: state.fromLang, 
        fromText: state.toText, 
        toText: '',}
    }

    if (action.type === 'SET_FROM_LANG') {
      return {...state, 
        fromLang: 
        action.payload}
    }

    if (action.type === 'SET_TO_LANG') {
      return {...state, 
        toLang: 
        action.payload}
    }

    if (action.type === 'SET_FROM_TEXT') {
      return {...state, 
        fromText: 
        action.payload}
    }

    if (action.type === 'SET_TO_TEXT') {
      return {...state, 
        toText: 
        action.payload}
    }

    if(action.type === 'LOADING') {
      return {...state, 
        loading: 
        action.payload}
    }
    
    return state
}

