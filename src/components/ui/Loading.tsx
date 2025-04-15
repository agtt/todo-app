import React from "react";

const Loading = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 "
      id="loading"
      data-testid="loading"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-blue-500 border-solid"></div>
        <span className="text-base font-medium text-gray-700">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
