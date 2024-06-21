import { baseAPI } from "./baseAPI";

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const res = await baseAPI.post(
      "/signin",
      JSON.stringify({
        username: username,
        password: password,
      })
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

async function signup({
  username,
  email,
  password,
  first_name,
  last_name,
  admin_code,
}: {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  admin_code: string;
}) {
  try {
    const res = await baseAPI.post(
      "/signup",
      JSON.stringify({
        username: username,
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        admin_code: admin_code,
      })
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

async function refreshToken(token: string) {
  try {
    const res = await baseAPI.post(
      "/token/refresh",
      JSON.stringify({
        refresh_token: token,
      })
    );
    return res.data;
  } catch (error) {
    return error;
  }
}

async function inviteAdmin(email: string, role: string, access_token: string) {
  try {
    const res = await baseAPI.post(
      "/admin/invite",
      JSON.stringify({
        email: email,
        role: role,
      }),
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}

export default {
  login,
  refreshToken,
  signup,
  inviteAdmin,
};
