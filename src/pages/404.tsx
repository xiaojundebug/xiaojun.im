import React from 'react'
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const NotFound = () => {
  return <div className="flex items-center justify-center mt-20">
    <img className="w-full sm:w-1/2 animate-floating" src="/404.svg" alt="404 not found"/>
  </div>
}

export const getStaticProps: GetStaticProps<any, { slug: string }> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

export default NotFound
