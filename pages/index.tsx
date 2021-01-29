import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

interface IndexProps {
  title: string;
}

const index: React.FC<IndexProps> = ({title}) => (
  <React.Fragment>
    <Head>
      <title>{title}</title>
      <link rel="stylesheet" type="text/css" href="/styles.css" />
    </Head>
    <h1>{title}</h1>
  </React.Fragment>
);

/**
 * This is getServerSideProps to verify that the ENV is working,
 * nota that this functionality (because of the static nature of the data) 
 * will fit better in the getStaticProps paradigm
 */
export const getServerSideProps: GetServerSideProps<IndexProps>  = async () => {
  return {
    props: {
      title: `Hello ${process.env.PROJECT_NAME}!`,
    },
  }
}

export default index;
