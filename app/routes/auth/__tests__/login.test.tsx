import { describe, it, expect, vi } from "vitest";
import { createRoutesStub } from "@react-router/dev/test-utils";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import LoginPage, { action, loader } from "../login";

// Mock auth.server
vi.mock("../../../auth.server", () => ({
  getUser: vi.fn(),
  login: vi.fn(),
}));

// Mock Prisma
vi.mock("@prisma/client", () => ({
  PrismaClient: vi.fn(() => ({
    user: {
      findUnique: vi.fn(),
    },
  })),
}));

describe("Login Page", () => {
  it("renders login form correctly", async () => {
    const routesStub = createRoutesStub([
      {
        path: "/auth/login",
        Component: LoginPage,
        loader,
        action,
      },
    ]);

    const router = createMemoryRouter(routesStub, {
      initialEntries: ["/auth/login"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("shows validation errors for empty form", async () => {
    const routesStub = createRoutesStub([
      {
        path: "/auth/login",
        Component: LoginPage,
        loader,
        action,
      },
    ]);

    const router = createMemoryRouter(routesStub, {
      initialEntries: ["/auth/login"],
    });

    render(<RouterProvider router={router} />);

    const submitButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    const mockLogin = vi.fn().mockResolvedValue({ id: 1, email: "test@example.com" });
    
    // Mock the login function
    const { login } = await import("../../../auth.server");
    vi.mocked(login).mockImplementation(mockLogin);

    const routesStub = createRoutesStub([
      {
        path: "/auth/login",
        Component: LoginPage,
        loader,
        action,
      },
    ]);

    const router = createMemoryRouter(routesStub, {
      initialEntries: ["/auth/login"],
    });

    render(<RouterProvider router={router} />);

    // Fill form
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });

  it("shows error message for invalid credentials", async () => {
    const mockLogin = vi.fn().mockResolvedValue(null);
    
    const { login } = await import("../../../auth.server");
    vi.mocked(login).mockImplementation(mockLogin);

    const routesStub = createRoutesStub([
      {
        path: "/auth/login",
        Component: LoginPage,
        loader,
        action,
      },
    ]);

    const router = createMemoryRouter(routesStub, {
      initialEntries: ["/auth/login"],
    });

    render(<RouterProvider router={router} />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
  });
});
