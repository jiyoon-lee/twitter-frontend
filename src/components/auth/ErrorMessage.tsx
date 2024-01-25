import React from "react";

interface PropsType {
  readonly message?: string;
}

export default function ErrorMessage({ message }: PropsType) {
  return <p role="alert">{message}</p>;
}
