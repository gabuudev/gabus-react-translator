import { FaExchangeAlt } from "react-icons/fa"

import './styles.css'
import { useEffect, useReducer } from "react"
import { reducer, initialState, languages } from "./logic/reducer"
import { translateAPI } from "./logic/translatorAPI"

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {


    if (!state.fromText.trim()) {
      dispatch({ type: 'SET_TO_TEXT', payload: '' });
      dispatch({ type: 'LOADING', payload: false });
      return;
    }

    const timeoutId = setTimeout(() => {
      translateAPI(state, dispatch);
    }, 350); 

    return () => {
      clearTimeout(timeoutId);
    };
  }, [state.fromText, state.fromLang, state.toLang]); 


  return (
    <main>
      <h1 id="title">gabu's translator</h1>

        <div className="ichange">
          <select
            value={state.fromLang}
            className="lang-select"
            onChange={(e) => dispatch({ type:'SET_FROM_LANG', payload: e.target.value })}
          >
            {Object.keys(languages).map((key) => (
              <option 
                key={key} 
                value={languages[key]}
              >
                {key.toUpperCase()}
              </option>
              ))}
              </select>

          <button id="change" onClick={() => dispatch({ type:'INTERCHANGE' })}><FaExchangeAlt /></button>
          
          <select
            value={state.toLang}
            onChange={(e) => dispatch({ type: 'SET_TO_LANG', payload: e.target.value })}
            className="lang-select"
          >
           {Object.keys(languages).filter(key => (
            languages[key] !== 'auto'
            )).map((key) => (
              <option
              key={key}
              value={languages[key]}>{key.toUpperCase()}</option>

            ))}
          </select>
        </div>
      
      <div className="container">

        <div className="fromText">
          <textarea 
          value={state.fromText} 
          onChange={(e) => dispatch({ type:'SET_FROM_TEXT', payload: e.target.value })} 
          id='fromText' 
          placeholder='Write something...' />
        </div>

        <div className="result">
          <textarea 
            value={state.toText}
            disabled 
            id='result' 
            placeholder={state.loading ? "Translating..." : "Translation"} 
          />
        </div>
      </div>
    </main>
  )
}

export default App
