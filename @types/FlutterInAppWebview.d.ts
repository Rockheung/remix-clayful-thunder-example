// TODO: 정의된 함수 타입들의 args가 Serializable해야 하도록 강제 필요
export interface FlutterInAppWebview<H extends FunctionPropertyOnly<H>> {
  callHandler<N extends keyof H>(
    handlerName: N
  ): H[N] extends (...args: any) => any ? Promise<ReturnType<H[N]>> : never;
}

type FunctionPropertyOnly<I> = {
  [K in keyof I]: I[K] extends (...args: any) => any ? I[K] : never;
};
