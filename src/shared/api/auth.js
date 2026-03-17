import { api } from "./http";
import { getApiPrefix } from "../i18n/apiLang";

export async function startRegisterRequest({ fullName, email, password }) {
  const prefix = getApiPrefix();

  const response = await api.post(
    `${prefix}/users/users/register/`,
    {
      username: email,
      password,
      name: fullName,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function confirmRegisterRequest({ email, code }) {
  const prefix = getApiPrefix();

  const response = await api.post(
    `${prefix}/users/users/register/confirm/`,
    {
      username: email,
      code,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function loginRequest({ email, password }) {
  const prefix = getApiPrefix();

  const response = await api.post(
    `${prefix}/users/sessions/login/`,
    {
      username: email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function logoutRequest(refreshToken) {
  const prefix = getApiPrefix();

  const response = await api.post(
    `${prefix}/users/sessions/logout/`,
    refreshToken ? { refresh: refreshToken } : {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function refreshSessionRequest(refreshToken) {
  const prefix = getApiPrefix();

  const response = await api.post(
    `${prefix}/users/sessions/refresh/`,
    {
      refresh: refreshToken,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function getMeRequest() {
  const prefix = getApiPrefix();

  const response = await api.get(`${prefix}/users/users/me/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export async function updateMeRequest({ name, dateOfBirth, gender, picture }) {
  const prefix = getApiPrefix();

  const payload = {};

  if (name !== undefined && name !== null && name !== "") {
    payload.name = name;
  }

  if (
    dateOfBirth !== undefined &&
    dateOfBirth !== null &&
    dateOfBirth !== ""
  ) {
    payload.date_of_birth = dateOfBirth;
  }

  if (gender !== undefined && gender !== null && gender !== "") {
    payload.gender = gender;
  }

  if (picture !== undefined && picture !== null && picture !== "") {
    if (typeof picture === "string") {
      payload.picture = picture;
    } else if (typeof picture === "object") {
      payload.picture =
        picture.large ||
        picture.medium ||
        picture.original ||
        picture.small ||
        picture.thumbnail ||
        "";
    }
  }

  const response = await api.patch(`${prefix}/users/users/me/`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export async function changePasswordRequest({ oldPassword, newPassword }) {
  const prefix = getApiPrefix();

  const response = await api.post(
    `${prefix}/users/users/password/change/`,
    {
      old_password: oldPassword,
      new_password: newPassword,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function googleAuth(idToken) {
  const prefix = getApiPrefix();

  const response = await api.post(
    `${prefix}/users/users/google-auth/`,
    {
      id_token: idToken,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function requestPasswordReset({ email }) {
  const prefix = getApiPrefix();

  const response = await api.post(
    `${prefix}/users/users/password/reset/request/`,
    {
      username: email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function confirmPasswordReset({ email, code, newPassword }) {
  const prefix = getApiPrefix();

  const response = await api.post(
    `${prefix}/users/users/password/reset/confirm/`,
    {
      username: email,
      code,
      password: newPassword,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}