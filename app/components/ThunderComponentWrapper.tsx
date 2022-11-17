import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import type { ComponentName, ThunderCallback } from "~/@types/ClayfulThunder";

type Props = {
  name: ComponentName;
  options: any;
  callback?: ThunderCallback;
};
const ThunderComponentWrapper = (props: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const mountThunderComponent = useCallback(() => {
    if (
      typeof window.Thunder === "undefined" ||
      typeof window.Thunder.options === "undefined" ||
      wrapperRef.current === null
    )
      return;
    window.Thunder.render(
      window.$(wrapperRef.current),
      props.name,
      props.options,
      props.callback
    );
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("updateJQuerySide", mountThunderComponent);
    return () => {
      window.removeEventListener("updateJQuerySide", mountThunderComponent);
    };
  }, []);

  useEffect(() => {
    mountThunderComponent();
  }, []);

  return <div ref={wrapperRef}></div>;
};

export default ThunderComponentWrapper;
