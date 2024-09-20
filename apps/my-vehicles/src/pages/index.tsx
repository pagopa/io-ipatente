import styles from "@/styles/Home.module.css";
import { GetStaticProps } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session } = useSession();
  const [fetchData, setFetchData] = useState("");

  const testFetch = () =>
    fetch("/api/info-veicoli").then(async (response) =>
      setFetchData(JSON.stringify(await response.json())),
    );

  const testChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const path = router.asPath;
    const locale = event.target.value;
    return router.push(path, path, { locale });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta content="Generated by create next app" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            {t("welcome")} {session?.user?.givenName}{" "}
            {session?.user?.familyName}{" "}
            <code className={styles.code}>{session?.user?.fiscalCode}</code>{" "}
            <button onClick={testFetch}>msw fetch test</button> {fetchData}
            <select id="i18nSelect" onChange={testChangeLanguage}>
              <option value="it">IT</option>
              <option value="en">EN</option>
            </select>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              rel="noopener noreferrer"
              target="_blank"
            >
              By{" "}
              <Image
                alt="Vercel Logo"
                className={styles.vercelLogo}
                height={24}
                priority
                src="/vercel.svg"
                width={100}
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            alt="Next.js Logo"
            className={styles.logo}
            height={37}
            priority
            src="/next.svg"
            width={180}
          />
        </div>

        <div className={styles.grid}>
          <a
            className={styles.card}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            className={styles.card}
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            className={styles.card}
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            className={styles.card}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

// Loading locales server-side
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
