import { useEffect, type JSX } from "react";
import { useNavigate } from "react-router";

interface PrivateRouterProps {
  element: () => JSX.Element;
  isClosed?: boolean;
}

const PrivateRouter = ({
  element: Component,
  isClosed = false,
}: PrivateRouterProps): JSX.Element => {
  const navigate = useNavigate();
  const isLogged = false;

  useEffect(() => {
    if (isClosed && !isLogged) {
      navigate("/entrar", {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [isClosed, isLogged, navigate]);

  return <Component />;
};

export default PrivateRouter;
