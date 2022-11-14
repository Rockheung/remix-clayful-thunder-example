/**
 * HTML HEAD에서 동기적으로 실행되어 0 ~ 1초 후에 전역으로 정의되는 로직을 모킹
 */
(function () {
  const FLUTTER_IN_APP_WEBVIEW_PLATFORM_READY =
    "flutterInAppWebViewPlatformReady";

  setTimeout(() => {
    window.flutter_inappwebview = {
      callHandler(handlerName) {
        switch (handlerName) {
          case "clayfulSignIn": {
            return {
              appTokens: "appTokens",
              clayful: {
                token: "clayful.token",
              },
            };
          }
          default: {
            return null;
          }
        }
      },
    };

    window.dispatchEvent(new Event(FLUTTER_IN_APP_WEBVIEW_PLATFORM_READY));

    console.log(FLUTTER_IN_APP_WEBVIEW_PLATFORM_READY, "dispatched at", Date.now().toString());
  }, Math.random() * 1000);
})();
