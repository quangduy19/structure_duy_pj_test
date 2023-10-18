import React, { createContext, useCallback, useRef, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { v4 as uuid } from "uuid";

interface GlobalLoadingProps {
  children: React.ReactNode;
}
interface ILoadingMsg {
  id: string;
  message: string;
}
interface GlobalLoadingContextValue {
  loading: (message?: string) => Function;
}
export const GlobalLoadingContext = createContext<GlobalLoadingContextValue>({
  loading: () => () => {},
});
const GlobalLoading: React.FC<GlobalLoadingProps> = ({ children }) => {
  const [, forceRender] = useState([]);
  const messages = useRef<ILoadingMsg[]>([]);

  const loading = useCallback((message = "Loading...") => {
    const msgId = uuid();
    messages.current.push({
      id: msgId,
      message,
    });

    forceRender([]);

    return function unLoading() {
      messages.current = messages.current.filter((msg) => msg.id !== msgId);
      forceRender([]);
    };
  }, []);

  const isActive = !!messages.current.length;
  const LoadingEl: any = LoadingOverlay;

  return (
    <GlobalLoadingContext.Provider value={{ loading }}>
      <LoadingEl
        active={isActive}
        spinner
        text={isActive ? messages.current[0].message : ""}
      >
        {children}
      </LoadingEl>
    </GlobalLoadingContext.Provider>
  );
};

export default GlobalLoading;
