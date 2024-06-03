"use client";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUserActions } from "@/redux/store/redux-store";
import { getUserDetails } from "@/lib/http";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  const [idToken, _setIdToken, removeItem] =
    useLocalStorage<string>("accessToken");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!idToken) {
      push("/login");
    } else {
      getUserDetails(idToken).then((currentUserDetails) =>
        dispatch(currentUserActions.setCurrentUser({ ...currentUserDetails }))
      );
    }
  }, []);

  return <div className="ml-[250px]"></div>;
}
