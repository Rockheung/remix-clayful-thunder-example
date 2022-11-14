import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { FlutterInAppWebview } from "../@types/FlutterInAppWebview";

declare global {
  interface Window {
    flutter_inappwebview?: FlutterInAppWebview;
  }
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Clayful In-App Shop with Remix",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
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
