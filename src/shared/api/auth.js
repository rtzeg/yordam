import { api } from "./http";
import { getApiPrefix } from "../i18n/apiLang";

export async function startRegisterRequest({ fullName, email, password }) {
  const prefix = getApiPrefix();

  const response = await api.post(
    `${prefix}/users/users/register/`,
    {
      username: email,
      password,
      // позже можно добавить:
      // name: fullName,
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