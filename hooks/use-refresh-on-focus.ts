import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";

export function useRefreshOnFocus(queryKey: string) {
  const queryClient = useQueryClient();
  const firtsTimeRef = useRef(true); //El useRef se usa porque se mantiene a través de los rerenders

  useFocusEffect(
    useCallback(() => {
      if (firtsTimeRef.current) {
        firtsTimeRef.current = false;
        return;
      }

      queryClient.refetchQueries({
        queryKey: [queryKey],
        stale: true,
        type: "active",
      });
    }, [queryClient]),
  );
}
