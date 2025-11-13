import { renderHook, act } from "@testing-library/react";
import useFavorites from "../useFavorites";
import type { TableUser } from "../../api/users/users.utils";

const SAMPLE_USER: TableUser = {
  id: "u-1",
  name: "John Doe",
  gender: "male",
  email: "john@doe.com",
  dateBirthday: "2000-01-01",
  country: "BR",
  cellphone: "+55 11 99999-9999",
  picture: "https://example.com/avatar.jpg",
  favorite: true,
  isPlaceholder: false,
};

describe("useFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Inicializa com array vazio quando não há nada no localStorage", () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it("Adiciona um favorito", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(SAMPLE_USER);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe("u-1");
    const raw = localStorage.getItem("favorite_users_v1");
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw as string)[0].id).toBe("u-1");
  });

  it("Não duplica o mesmo favorito", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => result.current.addFavorite(SAMPLE_USER));
    act(() => result.current.addFavorite(SAMPLE_USER));

    expect(result.current.favorites).toHaveLength(1);
  });

  it("Remove um favorito", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(SAMPLE_USER);
    });

    act(() => {
      result.current.removeFavorite("u-1");
    });

    expect(result.current.favorites).toHaveLength(0);
    expect(localStorage.getItem("favorite_users_v1")).toBe("[]");
  });

  it("Toggle adiciona e remove favorito", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => result.current.toggleFavorite(SAMPLE_USER));
    expect(result.current.favorites).toHaveLength(1);

    act(() => result.current.toggleFavorite(SAMPLE_USER));
    expect(result.current.favorites).toHaveLength(0);
  });

  it("Clear limpa os favoritos", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => result.current.addFavorite(SAMPLE_USER));
    expect(result.current.favorites).toHaveLength(1);

    act(() => result.current.clearFavorites());
    expect(result.current.favorites).toHaveLength(0);
    expect(localStorage.getItem("favorite_users_v1")).toBe("[]");
  });
});
