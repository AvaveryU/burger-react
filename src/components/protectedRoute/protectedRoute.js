// import { useAuth } from "../services/auth";
import { Redirect, Route } from "react-router-dom";
import { useEffect, useState } from "react";

export function ProtectedRoute({ user, children }) {
//   let { getUser, ...auth } = useAuth();
//   const [isUserLoaded, setUserLoaded] = useState(false);

//   const init = async () => {
//     await auth.getUser();
//     setUserLoaded(isUserLoaded === true);
//   };

//   useEffect(() => {
//     init();
//   }, []);

//   return <Route {...rest} render={({ location }) => (auth.user ? children : <Redirect to={{ pathname: "/login", state: { from: location } }} />)} />;

if (!user) {
    return <Redirect to='/login'></Redirect>
}
return <Route>{children}</Route>
}
