export const translateAPI = (state, dispatch) => {

  
    const textToTranslate = encodeURIComponent(state.fromText.trim()); 
    
    
    if (!textToTranslate) {
       dispatch({ type: 'SET_TO_TEXT', payload: '' });
       dispatch({ type: 'LOADING', payload: false }); 
      return;
    } 

    dispatch({ type: 'LOADING', payload: true });

    const BASE_API_URL = 'https://translate.googleapis.com';

    
    const urlEndpoint = `${BASE_API_URL}/translate_a/single?client=gtx&sl=${state.fromLang.toLowerCase()}&tl=${state.toLang.toLowerCase()}&dt=t&q=${textToTranslate}`;

    fetch(urlEndpoint)
      .then(res => {
          if (!res.ok) {
              throw new Error(`Error HTTP: ${res.status}.`);
          }
          return res.json();
      })
      .then(data => {
        
        const translatedText = data[0].map(segment => segment[0]).join('');

        if (translatedText) {
            dispatch({ type: 'SET_TO_TEXT', payload: translatedText });
        } else {
            dispatch({ type: 'SET_TO_TEXT', payload: 'Ha ocurrido un error al traducir.' });
        }
        
        dispatch({ type: 'LOADING', payload: false });
      })
      .catch(error => {
        console.error("Fetch Error:", error);
        dispatch({ type: 'SET_TO_TEXT', payload: `Error de conexión. Mensaje: ${error.message}.` });
        dispatch({ type: 'LOADING', payload: false });
      });
  }