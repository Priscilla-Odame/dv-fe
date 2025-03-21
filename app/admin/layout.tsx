// import { checkUserAuth } from "@/helpers/authChecker";
"use client";
import AdminLayout from "@/app/components/page_components/AdminLayout";
import { useEffect, useState } from "react";

export default function AdminWrapper({ children }: any) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserAuth = () => {
        if (typeof window != undefined || typeof window != "undefined") {
            const token: any = sessionStorage.getItem('a_c');
            if (token){
                setIsLoggedIn(true);
            } else{
                setIsLoggedIn(false);
            }
        }
    }
      useEffect(() => {
        checkUserAuth();
      }, []);
    if (isLoggedIn) {
        return <AdminLayout>{children}</AdminLayout>;
    } else {
        return null;
    }
}