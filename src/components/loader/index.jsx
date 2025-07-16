import { LoaderCircle } from "lucide-react";
import React from "react";

const Loader = ({designs}) => {
  return (
    <div className={`my-[200px] ${designs} flex justify-center`}>
      <LoaderCircle className="animate-spin size-8 text-blue-500" />
    </div>
  );
};

export default Loader;
