import React from "react";

const Loading = () => {
  return (
    <div
      className="flex h-full w-full items-center justify-center p-4"
      data-testid="loading-indicator"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
        <span className="text-sm text-gray-700">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
