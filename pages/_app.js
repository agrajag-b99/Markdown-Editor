// import App from 'next/app'
import Layout from '../Components/Layout';
import '../css/main.scss'
import 'react-quill/dist/quill.snow.css';
import 'react-markdown-editor-lite/lib/index.css';
function MyApp({ Component, pageProps }) {

    return <Layout><Component {...pageProps} /></Layout>
}



export default MyApp
