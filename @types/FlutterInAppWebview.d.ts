export interface FlutterInAppWebview {
  callHandler<N extends keyof FlutterSideFunction>(
    handlerName: N,
    ...args: Parameters<FlutterSideFunction[N]>
  ): Promise<ReturnType<FlutterSideFunction[N]>>;
}

// Flutter side에서 정의된 함수 타입. callHandler 타입 정의에 사용
interface FlutterSideFunction {
  clayfulSignIn(): AppTokens;
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
