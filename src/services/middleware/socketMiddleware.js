export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;
    const { wsInit, wsClose, wsSendUserOrder, onOpen, onClose, onError, onMessage } = wsActions;

    return (next) => (action) => {
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

      if (wsSendUserOrder && type === wsSendUserOrder && socket) {
        socket.send(JSON.stringify(payload));
      }

      next(action);
    };
  };
};
