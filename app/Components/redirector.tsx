"use client";

import { useEffect } from "react";

type RedirectorProps = {
  params: {
    link: string;
  };
};

export default function Redirector({ params }: RedirectorProps) {
  useEffect(() => {
    if (
      params.link.startsWith("https://") ||
      params.link.startsWith("http://")
    ) {
      window.location.href = params.link;
    } else {
      window.location.href = "https://" + params.link;
    }
  }, [params]);

  return <></>;
}
