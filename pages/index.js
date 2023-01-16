import Link from "next/link";
import Head from "next/head";

import { getPostsData } from "../lib/post";
import Layout, { siteTitle } from "../components/Layout";
import utilStyle from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id, title, date, thumbnail 
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

// // SSRの場合
// export async function getServerSideProps(content) {

//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     }
//   }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>私はNextjsエンジニアです。<br />好きなフレームワークはNext.jsです。</p>
      </section>

      <section>
        <h2  className={utilStyle.headingMd}>📝Next.js エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`}>
                <span className={utilStyle.boldText}>{`${title}`}</span>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{`${date}`}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
