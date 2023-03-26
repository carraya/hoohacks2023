import { useRef, useEffect } from "react";

function ChatScrollHook(dep) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}

export default ChatScrollHook;
