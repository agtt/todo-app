"use client";

import { api } from "@/trpc/react";

export function Test() {
  const hello = api.test.hello.useQuery({
    text: "Banzai",
  });

  if (hello.isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-xs">
      <h1 className="text-2xl font-bold">{hello.data?.greeting}</h1>
      <p className="text-gray-500">This is a test component.</p>
      <pre>{JSON.stringify(hello.data, null, 2)}</pre>
    </div>
  );
}
