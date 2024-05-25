import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase";
import { navigate } from "./actions";
import supabase from "@/config/supabase";

const provider = new GoogleAuthProvider();

export async function googleSignIn() {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      localStorage.setItem("accessToken", token!);
      const user = result.user;
      // add google user details to database
      const currentTimeStamp = new Date();
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("username", user.displayName);
      if (!data) {
        const { error } = await supabase.from("users").insert({
          username: user.displayName,
          email: user.email,
          created_at: currentTimeStamp.toISOString(),
          updated_at: currentTimeStamp.toISOString(),
        });
        if (error) {
          console.log(error);
        } else {
          navigate("");
        }
      }
      navigate("");
    })
    .catch((error) => {
      console.log(error);
    });
}
