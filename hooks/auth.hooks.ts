import { BASE_URL } from "@/helpers/route";
import { SignUpFormData } from "@/types/iauth";
import axios from "axios";

export const loginFxn = async (body: { email: string; password: string }) => {
  console.log(body)
  let response = await axios
    .post(`${BASE_URL}auth/login`, body)
    .then((resp) => {
      if (resp.status == 200) {
        // console.log("response>",response);
        console.log("resp>", resp);
        window.sessionStorage.setItem("a_c", resp.data.accessToken)
        window.sessionStorage.setItem("u_role", resp.data.user.role)
        window.sessionStorage.setItem("u_mem_type", resp.data.user.membership_type)
        window.sessionStorage.setItem("u_id", resp.data.user._id)
        if (resp.data.accessToken){
          resp.data.user.role != "admin"
          ? (resp.data.user.membership_type == "affiliate" ? (window.location.href = "/dashboard") : (window.location.href = "/member/dashboard"))
          : (window.location.href = "/admin/dashboard");
          // window.location.href = "/admindashboard"
        }else {
          window.location.href = "#"
        }
        // resp.data.accessToken
        //   ? (window.location.href = "/dashboard")
        //   : (window.location.href = "#");
      }
    })
    .then((err) => {
      console.log(err);
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
    .post(`${BASE_URL}api/auth/register`, body)
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
