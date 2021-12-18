import { useEffect } from "react";

export function FetchingCodePage(props) {
  let { generatingCode } = props;
  useEffect(() => {
    generatingCode();
  }, []);
  return null;
}
