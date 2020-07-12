import Head from 'next/head';
import Navbar from './Navbar';
import { DataProvider } from '../store';

const Layout = ({ children }) => (
    <>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Editor@Higgle</title>
            <link rel="stylesheet" href="uikit.min.css" />
        </Head>
        <DataProvider>
            <Navbar />
            {children}
        </DataProvider>
    </>
)

export default Layout;