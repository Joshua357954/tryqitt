import firebase, { firestore } from "@/firebase";
import { Respond } from "@/utils/utils";

// Firestore
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

// Enroll User (User MetaData)
export async function POST(request) {
  try {
    const body = await request.json();
    const { uid, regNumber, faculty, department, year, birthday } = body;
    console.log(body);

    // Create a reference to the user document in Firestore
    const userRef = doc(collection(firestore, "usersV1"), uid);

    // Fetch user data
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.log("User Not Registered In DB")
      return Respond({ error: "User not found" }, 404);
    }

    // Check if user is already enrolled
    const isEnrolled = userDoc.data().enrolled;

    if (isEnrolled) {
      console.log("Already Enrolled");
      return Respond({ error: "🚫 User is already enrolled , Login" });
    }

    // Update user data using updateDoc
    await updateDoc(userRef, {
      enrolled: true,
      regNumber: regNumber,
      faculty: faculty,
      department: department,
      year: year,
      birthday: birthday,
    });

    // Fetch the updated user data
    const updatedUserDoc = await getDoc(userRef);

    // Send back the updated user data in the response
    return Respond(
      {
        message: "✅ User enrolled successfully",
        user: updatedUserDoc.data(),
      },
      200
    );
  } catch (error) {
    console.error("Error enrolling user:", error);
    return Respond({ error: "❌ Internal server error" }, 500);
  }
}
