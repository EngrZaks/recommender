"use client";
import { useRouter } from "next/navigation";
import React from "react";

function BackButton() {
  const router = useRouter();
  const handleBack = () => router.back();
  return (
    <span onClick={handleBack} className="mr-10 cursor-pointer">
      {" "}
      ⬅️ back
    </span>
  );
}

export default BackButton;
