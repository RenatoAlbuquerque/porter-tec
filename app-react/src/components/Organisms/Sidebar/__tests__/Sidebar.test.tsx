// src/components/Organisms/Sidebar/__tests__/Sidebar.test.tsx
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import SidebarDrawer from "../index";
import { SettingsContext } from "../../../../context/settingsContext";
import * as localeModule from "../../../../hooks/useLocalePath";
import * as navModule from "../../../../hooks/useNavigation";
import * as translationsModule from "../../../../hooks/useTranslations";
import * as menuListModule from "../../../../constants/sidebarMenuList";

vi.mock("@/assets/logo/porterLogoSmall.svg", () => ({ default: "porter-logo.png" }));

const useLocalePathMock = vi.spyOn(localeModule, "useLocalePath").mockImplementation(() => "/users");
const mockPushFn = vi.fn();
vi.spyOn(navModule, "usePushNavigation").mockImplementation(() => mockPushFn);

vi.spyOn(translationsModule, "useTranslations").mockImplementation(() => (k: string) => k);

vi.spyOn(menuListModule, "useMenuList").mockImplementation(() => [
  { id: "btn_dashboard", name: "Dashboard", path: "/construction", icon: <span data-testid="icon-dashboard" /> },
  { id: "btn_users", name: "Users", path: "/users", icon: <span data-testid="icon-users" /> },
  { id: "btn_features", name: "Favorites", path: "/favorites", icon: <span data-testid="icon-favorites" /> },
]);

vi.mock("@mui/material/useMediaQuery", () => ({
  __esModule: true,
  default: () => Boolean((globalThis as any).__IS_MOBILE),
}));

const theme = createTheme();

function renderWithProviders(
  ui: React.ReactElement,
  { displaySideBar = true, setSpyForClose = false, initialEntries = ["/"] } = {}
) {
  let setSpy: ReturnType<typeof vi.fn> | undefined;

  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    if (setSpyForClose) {
      setSpy = vi.fn();
      const contextValue = {
        displaySideBar,
        setDisplaySideBar: setSpy as any,
        theme: "light" as any,
        toggleTheme: () => { },
        language: "en" as any,
        toggleLanguage: () => { },
        files: [] as File[],
        setFiles: () => { },
      };
      return (
        <MemoryRouter initialEntries={initialEntries}>
          <ThemeProvider theme={theme}>
            <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>
          </ThemeProvider>
        </MemoryRouter>
      );
    }

    const [display, setDisplay] = React.useState(displaySideBar);
    const contextValue = {
      displaySideBar: display,
      setDisplaySideBar: setDisplay,
      theme: "light" as any,
      toggleTheme: () => { },
      language: "en" as any,
      toggleLanguage: () => { },
      files: [] as File[],
      setFiles: () => { },
    };

    return (
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeProvider theme={theme}>
          <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>
        </ThemeProvider>
      </MemoryRouter>
    );
  };

  const result = render(ui, { wrapper: Wrapper });

  const bodyInner = document.body.innerHTML.trim();
  if (!bodyInner || bodyInner === "<div></div>") {
    console.log("---- SCREEN DEBUG (DOM vazio) ----");
    screen.debug();
  }

  return { ...result, setSpy };
}

beforeEach(() => {
  vi.clearAllMocks();
  (globalThis as any).__IS_MOBILE = false;
});

describe("SidebarDrawer", () => {
  it("Renderiza expandida quando displaySideBar=true e mostra botão de toggle e logo", async () => {
    renderWithProviders(<SidebarDrawer />);

    const toggle = await screen.findByLabelText(/toggle sidebar/i);
    expect(toggle).toBeInTheDocument();

    const logo = await screen.findByAltText("Logo Porter");
    expect(logo).toBeInTheDocument();

    expect(await screen.findByText("Users")).toBeInTheDocument();
    expect(await screen.findByText("Favorites")).toBeInTheDocument();
  });

  it("Clicar no toggle encolhe e expande a sidebar", async () => {
    renderWithProviders(<SidebarDrawer />);
    const toggle = await screen.findByLabelText(/toggle sidebar/i);
    fireEvent.click(toggle);

    const logo = screen.queryByAltText("Logo Porter");
    expect(logo).not.toBeInTheDocument();

    fireEvent.click(toggle);
    expect(await screen.findByAltText("Logo Porter")).toBeInTheDocument();
  });

  it("Clica em um item do menu e chama pushNavigation com o path correto", async () => {
    renderWithProviders(<SidebarDrawer />);
    const users = await screen.findByText("Users");
    fireEvent.click(users);
    expect(mockPushFn).toHaveBeenCalledWith("/users");
    expect(await screen.findByAltText("Logo Porter")).toBeInTheDocument();
  });

  it("Ao clicar no item em mobile e navegar, fecha a sidebar", async () => {
    (globalThis as any).__IS_MOBILE = true;
    const { setSpy } = renderWithProviders(<SidebarDrawer />, { displaySideBar: true, setSpyForClose: true });
    const users = await screen.findByText("Users");
    fireEvent.click(users);
    expect(mockPushFn).toHaveBeenCalledWith("/users");
    expect(setSpy).toHaveBeenCalledWith(false);
  });

  it("Marca item ativo quando pathname === item.path", async () => {
    useLocalePathMock.mockImplementation(() => "/favorites");
    renderWithProviders(<SidebarDrawer />);
    const favText = await screen.findByText("Favorites");
    expect(favText).toBeInTheDocument();
    const favBtn = favText.closest("button") || favText.parentElement;
    expect(favBtn).toBeTruthy();
    const icon = within(favBtn as any).getByTestId("icon-favorites");
    expect(icon).toBeInTheDocument();
  });
});
