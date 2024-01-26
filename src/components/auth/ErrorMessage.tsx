import React from "react";

interface PropsType {
  readonly message?: string;
}

export default function ErrorMessage({ message }: PropsType) {
  return <p className="text-red-500 text-xs italic">{message}</p>;
}
