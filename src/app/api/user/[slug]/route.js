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

// @ Get User Dynamic Route
export async function GET(req, { params }) {
  const { slug: uid } = params; // Extract dynamic route parameter
  console.log("My Api UID 🥳:", uid);
  const { searchParams } = new URL(req.url); // Extract query parameters from the URL
  const department = searchParams.get("department");

  // Get UserData
  if (uid) {
    try {
      console.log("User ID:", uid);
      // Construct the collection path and get user data from Firestore
      const userDoc = await getDoc(doc(collection(firestore, "usersV1"), uid));

      if (!userDoc.exists()) {
        console.log("User not found 🥹");
        return new Response(JSON.stringify({ message: "User not found" }), {
          status: 404,
        });
      }

      const userData = userDoc.data();
      return new Response(JSON.stringify({ ...userData }), { status: 200 });
    } catch (error) {
      console.error("Error getting user:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
      });
    }
  }


  // Get Department
  if (department) {
    try {
      console.log(department, " loading ...");
      // Create a query to get all documents from the users collection
      const querySnapshot = await getDocs(collection(firestore, "usersV1"));

      // Extract and filter data from the snapshot based on the search condition
      const users = querySnapshot.docs
        .filter((doc) => doc.data().department.value === department)
        .map((doc) => ({ id: doc.id, name: doc.data().name }));

      console.log("Users:", users);
      // Send the matching users as a response
      return new Response(JSON.stringify(users), { status: 200 });
    } catch (err) {
      // Handle errors
      console.error(err);
      return new Response(
        JSON.stringify({
          error: "Error searching for users",
          details: err.message,
        }),
        { status: 500 }
      );
    }
  }

  // Default response for invalid or missing parameters
  return new Response(JSON.stringify({ error: "Invalid parameters" }), {
    status: 400,
  });
}
