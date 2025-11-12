import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { FavoriteButton } from "@/components/Atoms/Buttons/FavoriteButton";
import useFavorites from "@/hooks/useFavorites";
import { usePushNavigation } from "@/hooks/useNavigation";
import { TableUser } from "@/api/users/users.utils";
import { useTranslations } from "next-intl";

const PAGE_SIZE = 10;
const LOADING_DEBOUNCE_MS = 1500;

export const FavoritesPageComponent: React.FC = () => {
  const translateFavoritePage = useTranslations("Features.FavoritesPage"); // namespace "favorites"
  const { favorites } = useFavorites();
  const [rawQuery, setRawQuery] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pushNavigation = usePushNavigation();
  const {
    palette: { background },
  } = useTheme();

  useEffect(() => {
    const id = globalThis.setTimeout(() => setQuery(rawQuery.trim().toLowerCase()), 300);
    return () => globalThis.clearTimeout(id);
  }, [rawQuery]);

  useEffect(() => {
    setPage(1);
    if (timeoutRef.current) {
      globalThis.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setLoading(false);
  }, [favorites.length, query]);

  const filtered = useMemo(() => {
    if (!query) return favorites;
    return favorites.filter((u) => {
      return (
        (u.name || "").toLowerCase().includes(query) ||
        (u.email || "").toLowerCase().includes(query) ||
        (u.country || "").toLowerCase().includes(query)
      );
    });
  }, [favorites, query]);

  const displayed = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);
  const hasMore = displayed.length < filtered.length;

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

  const handleRowClick = (params: TableUser) => {
    const userId = params.id;
    if (userId) {
      pushNavigation(`/user/${userId}`);
    }
  };

  if (favorites.length === 0) {
    return (
      <Box>
        <Typography variant="h3" pb="30px">
          {translateFavoritePage("title")}
        </Typography>
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6">{translateFavoritePage("emptyHeading")}</Typography>
          <Typography color="text.secondary" sx={{ mt: 1, mb: 2 }}>
            {translateFavoritePage("emptyDescription")}
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h3" pb="30px">
        {translateFavoritePage("title")}
      </Typography>

      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <TextField
          label={translateFavoritePage("searchLabel")}
          size="small"
          value={rawQuery}
          onChange={(e) => setRawQuery(e.target.value)}
          placeholder={translateFavoritePage("searchPlaceholder")}
          color="secondary"
        />
        <Typography color="text.secondary">
          {filtered.length} {translateFavoritePage("results")}
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ border: "2px solid #fff", overflow: "auto" }}>
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          size="small"
          aria-label={translateFavoritePage("tableAria")}
        >
          <TableHead>
            <TableRow>
              <TableCell>{translateFavoritePage("header.name")}</TableCell>
              <TableCell align="right">{translateFavoritePage("header.phone")}</TableCell>
              <TableCell align="right">{translateFavoritePage("header.gender")}</TableCell>
              <TableCell align="right">{translateFavoritePage("header.country")}</TableCell>
              <TableCell align="right">{translateFavoritePage("header.favorite")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayed.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: background.default,
                  },
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
                onClick={() => handleRowClick(row)}
              >
                <TableCell component="th" scope="row">
                  <Box display={"flex"} alignItems={"center"} gap="10px">
                    <Avatar sx={{ width: "30px", height: "30px" }} src={row.picture}>
                      {row.name ? row.name[0] : "T"}
                    </Avatar>
                    <Box>
                      <Typography>{row.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {row.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">{row.cellphone}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.country}</TableCell>
                <TableCell align="right">
                  <Box>
                    <FavoriteButton user={row} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={5} sx={{ p: 0, border: 0 }}>
                <div ref={sentinelRef} />
              </TableCell>
            </TableRow>

            {loading && (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center", py: 2 }}>
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <CircularProgress size={20} />
                    <Typography variant="body2">{translateFavoritePage("loadingMore")}</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body1">{translateFavoritePage("noResults")}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
