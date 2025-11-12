import { useEffect, useRef } from "react";
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { TableHeader } from "./TableHeader";
import { LoadingRow } from "./states/Loading";
import { FavoriteRow } from "./FavoriteRow";
import { NoResultsRow } from "./states/NoResults";
import type { TableUser } from "../../../api/users/users.utils";

const LOADING_DEBOUNCE_MS = 1500;

interface IFavoritesTableProps {
  displayed: TableUser[];
  hasMore: boolean;
  loading: boolean;
  setLoading: (v: boolean) => void;
  setPage: (updater: (p: number) => number) => void;
  translate: (k: string) => string;
  onRowClick: (r: TableUser) => void;
  filteredLength: number;
}

export const FavoritesTable = ({
  displayed,
  hasMore,
  loading,
  setLoading,
  setPage,
  translate,
  onRowClick,
  filteredLength,
}: IFavoritesTableProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loading) {
            setLoading(true);

            if (timeoutRef.current) {
              globalThis.clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = window.setTimeout(() => {
              setPage((p) => p + 1);
              setLoading(false);
              timeoutRef.current = null;
            }, LOADING_DEBOUNCE_MS);
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.1 },
    );

    obs.observe(el);
    observerRef.current = obs;

    return () => {
      obs.disconnect();
      observerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, loading]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        globalThis.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return (
    <TableContainer component={Paper} sx={{ border: "2px solid #fff", overflow: "auto" }}>
      <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label={translate("tableAria")}>
        <TableHeader translate={translate} />
        <TableBody>
          {displayed.map((row) => (
            <FavoriteRow key={row.id} row={row} onClick={onRowClick} />
          ))}

          <TableRow>
            <TableCell colSpan={5} sx={{ p: 0, border: 0 }}>
              <div ref={sentinelRef} />
            </TableCell>
          </TableRow>

          {loading && <LoadingRow translate={translate} />}

          {filteredLength === 0 && !loading && <NoResultsRow translate={translate} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
