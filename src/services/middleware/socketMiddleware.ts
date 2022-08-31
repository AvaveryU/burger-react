import { IwsActionsAuthUser } from "../../utils/types";
export const socketMiddleware = (wsActions: IwsActionsAuthUser) => {
  return (store: { dispatch: any }) => {
    let socket: WebSocket | null = null;
    const { wsInit, wsClose, wsSendData, onOpen, onClose, onError, onMessage } = wsActions;

    return (next: (arg0: any) => void) => (action: { type: string; payload: string }) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsInit) {
        socket = new WebSocket(payload);
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          console.log("ошибка", event);
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({
            type: onMessage,
            payload: { data: parsedData, timestamp: new Date().getTime() / 100 },
          });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      if (wsClose && type === wsClose && socket) {
        socket.close();
      }

      if (wsSendData && type === wsSendData && socket) {
        socket.send(JSON.stringify(payload));
      }

      next(action);
    };
  };
};
