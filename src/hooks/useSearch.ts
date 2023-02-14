import { useEffect, useRef, useState } from "react";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const isFisrtInput = useRef(true);

  useEffect(() => {
    if (isFisrtInput.current) {
      isFisrtInput.current = query === "";
      return;
    }

    if (query.trim() === "") {
      setError("Can't search empty movie");
      return;
    }

    if (query.length < 3) {
      setError("search must have at least 3 characters");
      return;
    }

    setError(null);
  }, [query]);

  return { query, setQuery, error };
};
