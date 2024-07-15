import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase";
import supabase from "@/config/supabase";
import axios from "axios"
import { useRouter } from "next/navigation";

const provider = new GoogleAuthProvider();

export async function googleSignIn() {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const googleIdToken = credential?.idToken;
      // The signed-in user info.
      localStorage.setItem("accessToken", googleIdToken!);
      localStorage.setItem("credential", JSON.stringify(credential!));
      const user = result.user;
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
        } else {
          useRouter().push("/");
        }
      }
      useRouter().push("/");
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function logOut(){
  await axios.get("https://gaming-haven-backend.up.railway.app/users/logout")
}
