import { useEffect } from "react";

const useEqualHeight = (leftRef, rightRef) => {
  useEffect(() => {
    const syncHeight = () => {
      if (leftRef.current && rightRef.current) {
        rightRef.current.style.height = `${leftRef.current.offsetHeight}px`;
      }
    };

    syncHeight(); // chạy lần đầu
    window.addEventListener("resize", syncHeight);

    return () => {
      window.removeEventListener("resize", syncHeight);
    };
  }, [leftRef, rightRef]);
};
export default useEqualHeight;
