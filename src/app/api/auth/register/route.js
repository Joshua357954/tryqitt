import {
  collection,
  doc,
  update,
  setDoc,
  add,
  query,
  where,
  getDocs,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import { Respond } from "@/utils/utils";



export async function POST(request) {
  try {
    const body = await request.json()
    const { email, displayName, imgURL, uid } = body;

    // Check if the user with the given email already exists
    const userQuery = query(
      collection(firestore, "usersV1"),
      where("email", "==", email)
    );
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const existingUser = userSnapshot.docs[0].data();
      console.log("User with this email already exists:", existingUser.email);

      return Respond({
        login: true,
        message: `Welcome back ${existingUser.name} 😊`,
        ...existingUser,
      });
    }

    // User does not exist, proceed to registration
    const user_data = {
      id: uid,
      email: email,
      imgURL,
      name: displayName,
      verified: false,
      enrolled: false,
    };

    // Use customUserId as the document ID
    const userDocRef = doc(collection(firestore, "usersV1"), uid);

    // Create user in Firestore (or update an existing one)
    await setDoc(userDocRef, user_data, { merge: true });

    // Log the response before sending it
    console.log("Response:", {
      message: "✅ User registered successfully ✅",
      uid: userDocRef.id,
      name: displayName,
    });

    return Respond(
      {
        login: false,
        message: "✅ User registered successfully",
        uid: userDocRef.id,
        name: displayName,
      },
      201 //Status
    );
  } catch (error) {
    console.error("Error registering user:", error);

    // Log the error response before sending it
    console.log("Error Response:", { error: "❌ Internal server error ❌" });

    return Respond({ error: "❌ Internal server error ❌" }, 500);
  }
}
