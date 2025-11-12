import React, { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import useFavorites from "@/hooks/useFavorites";
import { usePushNavigation } from "@/hooks/useNavigation";
import { TableUser } from "@/api/users/users.utils";
import { EmptyState } from "./FavoritesTable/ResultEmpty";
import { SearchBar } from "./FavoritesTable/SearchBar";
import { FavoritesTable } from "./FavoritesTable/FavoritesTable";

const PAGE_SIZE = 10;
export const FavoritesPageComponent = () => {
  const translate = useTranslations("Features.FavoritesPage");
  const { favorites } = useFavorites();
  const [rawQuery, setRawQuery] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pushNavigation = usePushNavigation();

  useEffect(() => {
    const id = globalThis.setTimeout(() => setQuery(rawQuery.trim().toLowerCase()), 300);
    return () => globalThis.clearTimeout(id);
  }, [rawQuery]);

  useEffect(() => {
    setPage(1);
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

  const handleRowClick = (params: TableUser) => {
    const userId = params.id;
    if (userId) pushNavigation(`/user/${userId}`);
  };

  if (favorites.length === 0) return <EmptyState translate={(k) => translate(k)} />;

  return (
    <>
      <Typography variant="h3" pb="30px">
        {translate("title")}
      </Typography>
      <SearchBar
        rawQuery={rawQuery}
        setRawQuery={setRawQuery}
        resultsCount={filtered.length}
        translate={(k) => translate(k)}
      />
      <FavoritesTable
        displayed={displayed}
        hasMore={hasMore}
        loading={loading}
        setLoading={setLoading}
        setPage={setPage}
        translate={(k) => translate(k)}
        onRowClick={handleRowClick}
        filteredLength={filtered.length}
      />
    </>
  );
};
