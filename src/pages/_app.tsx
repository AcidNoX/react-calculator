import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import { store } from '../redux/store';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  
  #__next {
    min-height: 100vh;
    background: radial-gradient( #0a0a0a,  #1d1d1d);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
export default MyApp
