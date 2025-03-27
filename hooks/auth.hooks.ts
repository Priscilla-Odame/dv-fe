import { BASE_URL } from "@/helpers/route";
import { SignUpFormData } from "@/types/iauth";
import axios from "axios";

export const loginFxn = async (body: { email: string; password: string }, setLoading: any) => {
  console.log(body);
  setLoading(true);
  await axios
    .post(`${BASE_URL}auth/login`, body)
    .then((resp) => {
      if (resp.status == 200) {
        // console.log("response>",response);
        setLoading(false);
        window.sessionStorage.setItem("a_c", resp.data.accessToken);
        window.sessionStorage.setItem("u_role", resp.data.user.role);
        window.sessionStorage.setItem(
          "u_mem_type",
          resp.data.user.membership_type
        );
        window.sessionStorage.setItem("u_id", resp.data.user._id);
        window.sessionStorage.setItem("u_d", JSON.stringify(resp.data.user));
        if (resp.data.accessToken) {
          setLoading(false);
          resp.data.user.role != "admin"
            ? resp.data.user.membership_type == "affiliate"
              ? (window.location.href = "/dashboard")
              : (window.location.href = "/member/dashboard")
            : (window.location.href = "/admin/dashboard");
          // window.location.href = "/admindashboard"
        } else {
          alert(resp?.data?.error?.message ?? "Could not complete login. An unknown error occurred");

        }
        // resp.data.accessToken
        //   ? (window.location.href = "/dashboard")
        //   : (window.location.href = "#");
      } else {
        setLoading(false);
        alert(resp?.data?.error?.message ?? "Could not complete login. An unknown error occurred");
      }
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
      alert(err.response.data.error ?? "Could not complete login. An unknown error occurred");
    });
};

export const registerFxn = (body: SignUpFormData) => {
  console.log("Body->>>", body);
  Object.keys(body).forEach((key) => {
    if (body[key as keyof SignUpFormData] === "") {
      delete body[key as keyof SignUpFormData]; // Correctly delete the property
    }
  });

  let response = axios
    .post(`${BASE_URL}auth/register`, body)
    .then((resp) => {
      if (resp.status == 200) {
        console.log(response);
        window.location.href = "/auth/login";
      }
    })
    .then((err) => {
      console.log(err);
    });
};
export const registerAdminFxn = (body: SignUpFormData) => {
  console.log("Body->>>", body);
  Object.keys(body).forEach((key) => {
    if (body[key as keyof SignUpFormData] === "") {
      delete body[key as keyof SignUpFormData]; // Correctly delete the property
    }
  });

  let response = axios
    .post(`${BASE_URL}auth/admin/register`, body)
    .then((resp) => {
      if (resp.status == 200) {
        console.log(response);
        window.location.href = "/auth/login";
      }
    })
    .then((err) => {
      console.log(err);
    });
};
export const registerMemberFxn = (body: SignUpFormData) => {
  console.log("Body->>>", body);
  Object.keys(body).forEach((key) => {
    if (body[key as keyof SignUpFormData] === "") {
      delete body[key as keyof SignUpFormData]; // Correctly delete the property
    }
  });

  let response = axios
    .post(`${BASE_URL}auth/member/register`, body)
    .then((resp) => {
      if (resp.status == 200) {
        console.log(response);
        window.location.href = "/auth/login";
      }
    })
    .then((err) => {
      console.log(err);
    });
};

export const getAuthHeaders = () => {
  const token = sessionStorage.getItem("a_c");
  return { headers: { Authorization: `Bearer ${token}` } };
};
export const nonAuthHeaders = {
  "Content-Type": "application/json",
};
