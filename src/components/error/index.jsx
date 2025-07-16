import { AlertCircle } from "lucide-react";
import React from "react";

const Error = ({ message, refetch }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <AlertCircle className="size-12 text-red-500" />
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Veri Yuklenemedi
        </h2>
        <p>{message}</p>

        <button
          onClick={refetch}
          className="px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Tekrar dene
        </button>
      </div>
    </div>
  );
};

export default Error;
