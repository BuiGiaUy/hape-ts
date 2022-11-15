import "antd/dist/antd.css";
import '../assets/main.scss'
import axios from "axios";
import { AuthProvider } from "../context/AuthContext";
import {loadProgressBar} from "axios-progress-bar"
import Router from "next/router";
import NProgress from 'nprogress'
import  React  from 'react';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
axios.defaults.timeout = 30000;
const isServer = typeof window !== 'object'
if(!isServer) {
  loadProgressBar()
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())
}

function App({ Component, pageProps }) {
  React.useEffect(() => {

  }, []);
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default App;
