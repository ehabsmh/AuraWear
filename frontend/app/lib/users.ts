import { AxiosError } from "axios";
import { toast } from "sonner";
import { IShippingInfo, IUser } from "../interfaces/User";
import api from "../config/axios.config";

export async function signup(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: FileList | null;
}) {
  try {
    const { data }: { data: { message: string; user: IUser } } = await api.post(
      "/auth/registration",
      userData
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        const fields = JSON.parse(error.response?.data.message);
        const errorMessage = fields
          .map((field: { message: string }) => field.message)
          .join("\n");
        throw new Error(errorMessage);
      }
      throw new Error(
        error.response?.data.message || "Registration failed. Please try again."
      );
    }
  }
}

export async function login(credentials: { email: string; password: string }) {
  try {
    const { data }: { data: { message: string; user: IUser } } = await api.post(
      "/auth/login",
      credentials
    );
    if (data) {
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(
        error.response?.data.message || "Login failed. Please try again."
      );
    }
  }
}

export async function verify(email: string, code: string) {
  try {
    const { data }: { data: { message: string; user: IUser } } = await api.post(
      "/auth/verification",
      { email, code }
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message || "Verification failed. Please try again."
      );
    }
  }
}

export async function logout() {
  try {
    const response = await api.post("/auth/logout");
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
  return false;
}

export async function updateShippingInfo(payload: IShippingInfo) {
  try {
    const { data }: { data: { message: string; updatedUser: IUser } } =
      await api.put("/auth/shipping", payload);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw new Error("Failed to update shipping information");
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
) {
  try {
    const { data }: { data: { message: string; updatedUser: IUser } } =
      await api.patch("/auth/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw new Error("Failed to change password");
  }
}

export async function updateName(firstName: string, lastName: string) {
  try {
    const { data }: { data: { message: string; updatedUser: IUser } } =
      await api.patch("/auth/change-name", {
        firstName,
        lastName,
      });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw new Error("Failed to update name");
  }
}

export async function fetchUser(email: string) {
  try {
    const { data }: { data: { user: IUser } } = await api.get(`/auth/${email}`);
    return data.user;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw new Error("Failed to fetch user");
  }
}
