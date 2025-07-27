import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const [time, setTime] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, navigate]);

  return (
    <section>
      <p>404</p>
    </section>
  );
};

export default NotFound;
