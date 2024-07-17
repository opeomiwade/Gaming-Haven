import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase";
import supabase from "@/config/supabase";
import axios from "axios";
import { getAccessToken } from "./http";

const provider = new GoogleAuthProvider();

export async function handleGoogleSignIn() {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const googleIdToken = credential?.idToken;

      const user = result.user;
      // get access token for third party provider so user can access API
      const response = await getAccessToken(user.email!, googleIdToken!);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("provider", "google");

      // add google user details to database
      const currentTimeStamp = new Date();
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("username", user.displayName);
      if (data && data?.length < 1) {
        const { error } = await supabase.from("users").insert({
          username: user.displayName,
          email: user.email,
          created_at: currentTimeStamp.toISOString(),
          updated_at: currentTimeStamp.toISOString(),
          image_url: user.photoURL,
        });
        if (error) {
          console.log(error);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function logOut() {
  await axios.get("https://gaming-haven-backend.up.railway.app/users/logout");
}
