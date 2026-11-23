"use client";

import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useTestQuery } from "@/hooks/useTestQuery";

export function TestView() {
  const [isMounted, setIsMounted] = useState(false);
  const { data, isLoading, isFetching, error, refetch } = useTestQuery();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 space-y-4 border border-slate-200">
      <h1 className="text-2xl font-bold text-slate-900">Easy Tools Setup</h1>
      <p className="text-sm text-slate-600">
        Module-wise view demonstrating TanStack Query hook, frontend API service, MUI Button, and Tailwind styling.
      </p>

      {!isMounted || isLoading ? (
        <div className="flex items-center gap-2 text-slate-500 py-2">
          <CircularProgress size={20} />
          <span className="text-sm">Fetching backend /test...</span>
        </div>
      ) : error ? (
        <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded p-3">
          <div className="font-semibold mb-1">Backend Connection Note:</div>
          <div>{error.message}</div>
          <div className="text-[11px] text-rose-500 mt-1">
            (Run backend with <code className="font-mono bg-rose-100 px-1 rounded">npm run dev</code> on port 4000)
          </div>
        </div>
      ) : data ? (
        <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded p-3 space-y-1">
          <div className="font-semibold">Backend Status: Connected</div>
          <div>Feature: <span className="font-mono">{data.feature}</span></div>
          <div>Message: {data.message}</div>
          <div className="text-slate-500 text-[10px]">{data.timestamp}</div>
        </div>
      ) : null}

      <div className="pt-2 flex flex-col gap-3">
        {/* MUI Button with Tailwind utility classes overriding default MUI styling */}
        <Button
          variant="contained"
          disabled={!isMounted || isFetching}
          onClick={() => refetch()}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-lg normal-case shadow-none"
        >
          {isFetching ? "Refetching..." : "Refetch /test via Query Hook"}
        </Button>

        <div className="text-xs text-center text-slate-500 bg-slate-100 border border-slate-200 rounded p-2 font-mono">
          Architecture: views/test → hooks/useTestQuery → utils/api
        </div>
      </div>
    </div>
  );
}
