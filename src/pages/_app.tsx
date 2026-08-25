import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Toaster } from "sonner";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Toaster
        richColors
        closeButton
        expand
        position="top-right"
        toastOptions={{
          duration: 2500,
        }}
      />
      <Component {...pageProps} />
    </Layout>
  );
}
