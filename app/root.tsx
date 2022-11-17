import { useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { FlutterInAppWebview } from "./@types/FlutterInAppWebview";
import type { Thunder } from "./@types/ClayfulThunder";

declare global {
  interface Window {
    flutter_inappwebview?: FlutterInAppWebview<FlutterSideFunction>;
    $: JQueryStatic;
    Thunder?: Thunder;
    env: {
      PUBLIC_IAMPORT_STORE_ID: string;
      PUBLIC_CLAYFUL_PUBLIC_CLIENT_TOKEN_DEV: string;
      PUBLIC_MOCK_ENDPOINT_URL: string;
    };
  }
  interface WindowEventMap {
    flutterInAppWebViewPlatformReady: Event;
    updateJQuerySide: Event;
  }
}

const PUBLIC_PREFIX = "PUBLIC_";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Clayful In-App Shop with Remix",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader() {
  return json(filterPublicEnv(process.env));
}

const filterPublicEnv = (env: typeof process.env) => {
  return Object.fromEntries(
    Object.entries(env).filter((entry) => entry[0].startsWith(PUBLIC_PREFIX))
  );
};

export function ErrorBoundary({ error }: { error: unknown }) {
  console.warn(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const env = useLoaderData();

  useEffect(() => {
    if (typeof window.Thunder === "undefined") return;
    window.Thunder({
      baseURL: window.env.PUBLIC_MOCK_ENDPOINT_URL,
      client: window.env.PUBLIC_CLAYFUL_PUBLIC_CLIENT_TOKEN_DEV,
    });
    window.dispatchEvent(new Event("updateJQuerySide"));
  }, []);

  return (
    <html lang="ko">
      <head>
        <script src="/js/mock_flutter_inappwebview.js"></script>
        <Meta />
        <Links />
        <link
          rel="stylesheet"
          href="https://code.clayful.io/clayful-thunder@1.2.3/theme/basic/style.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.env = ${JSON.stringify(env)}
        `,
          }}
        ></script>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {/* https://www.notion.so/12ed5bbcc2c1473291d308f63152c682 */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://code.clayful.io/clayful-thunder@1.2.3/thunder.min.js"></script>
        <script src="https://code.clayful.io/clayful-thunder@1.2.3/theme/basic/templates.min.js"></script>
        <script src="https://code.clayful.io/clayful-thunder@1.2.3/locales/ko.js"></script>
        {/* https://www.notion.so/43cb1740b49c41ce9e653d267fe7fd7a */}
        <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
        <script src="https://code.clayful.io/clayful-thunder@1.2.1/plugins/searchAddress/daum.min.js"></script>
        {/* https://www.notion.so/0eaa88d0d5ef4832a68d14d18a68778c */}
        <script src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"></script>
        <script src="https://code.clayful.io/clayful-thunder@1.2.1/plugins/makePayment/iamport.min.js"></script>
      </body>
    </html>
  );
}

// Flutter side에서 정의된 함수 타입. callHandler 타입 정의에 사용
interface FlutterSideFunction {
  clayfulSignIn(): AppTokens;
  checkLogin(): void;
  refreshUserProfile(): void;
}

type AppTokens = {
  appTokens: null | {
    accessToken: string;
    refreshToken: string;
    clayful: null | {
      token: string;
    };
  };
};
