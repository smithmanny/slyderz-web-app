import Document, { Html, Head, Main, NextScript } from "next/document";
import GlobalStyles from "@mui/material/GlobalStyles";
import createEmotionServer from "@emotion/server/create-instance";

import createEmotionCache from "app/utils/createEmotionCache";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Pinterest */}
          <meta
            name="p:domain_verify"
            content="d9a0531c70e05a526b6dc638bb535a50"
          />
          <meta property="og:title" content="Slyderz" />
          <meta
            property="og:description"
            content="All-in-one platform for chefs & caterers."
          />
          <meta property="og:url" content="https://slyderz.co" />
          <meta property="og:site_name" content="Slyderz" />
          <meta
            property="og:image"
            content={`${process.env.NEXT_PUBLIC_URL}/api/og`}
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <GlobalStyles
            styles={{
              a: {
                textDecoration: "none",
              },
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
