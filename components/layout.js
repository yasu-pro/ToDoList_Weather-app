
import Head from 'next/head';
import styles from './layout.module.scss';


const siteTitle = 'ToDoリスト';

const Layout = ({children}) => {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                name="description"
                content="ToDoリスト アプリ"
                />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <main>{children}</main>
        </div>
    );
}
export default Layout;
