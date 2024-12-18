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

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const departmentId = searchParams.get("department");
  const yearId = searchParams.get("year");

  try {
    const timetableRef = doc(
      firestore,
      "timetables",
      departmentId,
      "years",
      yearId + "00"
    );
    const docSnapshot = await getDoc(timetableRef);

    console.log("Timetable .....loading .....");
    if (docSnapshot.exists()) {
      const allTimetables = docSnapshot.data().timetable || [];

      console.log("Timetable : ", allTimetables);

      const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

      const structuredTimetables = days.map((day) => ({
        [day]: allTimetables.filter(
          (entry) => entry.day.toLocaleLowerCase() === day.toLocaleLowerCase()
        ),
      }));

      console.log(structuredTimetables);

      return Respond({ allTimetables: structuredTimetables }, 200);
    } else {
      return Respond({ allTimetables: [] }, 200);
    }
  } catch (error) {
    console.error(error);
    return Respond(
      { error: "Failed to get all timetables. Try again later. 😞" },
      500
    );
  }
}

// Test Data --- >
const timetableToAdd = [
  { day: "monday", course: "PHY 216.1", time: "10-11am", venue: "MBA 3/4" },
  { day: "monday", course: "MEG 251.1", time: "4-6PM", venue: "EDS" },

  {
    day: "tuesday",
    course: "ENG 251.1",
    time: "8-10am",
    venue: "EDS/MET HALL/TETFUND HALL 8",
  },
  {
    day: "tuesday",
    course: "ENG 204.1",
    time: "2-4PM",
    venue: "EDS/MET HALL/TETFUND HALL 8",
  },

  { day: "wednesday", course: "PHY 216.1", time: "1-3PM", venue: "MBA 2" },
  {
    day: "wednesday",
    course: "MEG 251.1",
    time: "4-6PM",
    venue: "Abuja Field",
  },

  { day: "thursday", course: "PHY 216.1", time: "12-1PM", venue: "MBA 2" },

  { day: "friday", course: "ENG 201.1", time: "8-10am", venue: "EDS/MET HALL" },
  {
    day: "friday",
    course: "ENG 202.1",
    time: "10-12PM",
    venue: "EDS/MET HALL",
  },
  { day: "friday", course: "Jumat Service", time: "1-2PM", venue: "-----" },
  { day: "friday", course: "ENG 203.1", time: "2-4PM", venue: "EDS/MET HALL" },
];

// [
//     { day: 'MONDAY', course: 'MTH270.1', time: '12-2pm', venue: 'MBA 2' },
//     { day: 'MONDAY', course: 'STA260.1', time: '2-4pm', venue: 'MBA 2' },

//     { day: 'TUESDAY', course: 'CSC283.1', time: '11-12pm', venue: 'Csc hall 2' },
//     { day: 'TUESDAY', course: 'CSC280.1', time: '12-2pm', venue: 'Fos Auditorium' },
//     { day: 'TUESDAY', course: 'CSC288.1', time: '2-3pm', venue: 'Csc hall 2' },
//     { day: 'TUESDAY', course: 'CSC284.1', time: '4-6pm', venue: 'Csc hall 2' },

//     { day: 'WEDNESDAY', course: 'CSC283.1', time: '8-9am', venue: 'Mbs 14' },
//     { day: 'WEDNESDAY', course: 'CSC281.1', time: '10-11am', venue: 'Csc hall 2' },
//     { day: 'WEDNESDAY', course: 'MTH210.1', time: '2-4pm', venue: 'Fos Auditorium' },

//     { day: 'THURSDAY', course: 'CSC284.1', time: '8-9am', venue: 'Mbs 14' },
//     { day: 'THURSDAY', course: 'CSC288.1', time: '12-1pm', venue: 'Csc hall 2' },
//     { day: 'THURSDAY', course: 'MTH270.1', time: '3-4pm', venue: 'MBA 2' },
//     { day: 'THURSDAY', course: 'CSC281.1', time: '4-5pm', venue: 'Csc hall 2' },

//     { day: 'FRIDAY', course: 'STA260.1', time: '9-10am', venue: 'MBA 2' },
//     { day: 'FRIDAY', course: 'CSC280.1', time: '10-11am', venue: 'MBA 2' },
//     { day: 'FRIDAY', course: 'CSC283.1', time: '2-4pm', venue: 'MBA 1' },
//     { day: 'FRIDAY', course: 'MTH210.1', time: '4-5pm', venue: 'MBA 2' },
//   ];




// @ For Creators and Qitt Admin Only
// Get Timetable For A Department
export async function POST(req, res) {
  const { searchParams } = new URL(req.url);
  const departmentId = searchParams.get("department");
  const yearId = searchParams.get("year");
  const newTimetableEntries = req.body;

  console.log("😇 New Timetable Entries");

  const timetableRef = doc(
    firestore,
    "timetables",
    departmentId,
    "years",
    yearId
  );

  try {
    const docSnapshot = await getDoc(timetableRef);

    if (docSnapshot.exists()) {
      const currentTimetable = docSnapshot.data().timetable || [];
      const updatedTimetable = [...currentTimetable, ...newTimetableEntries];

      await updateDoc(timetableRef, { timetable: updatedTimetable });
      return Respond(
        { success: true, message: "Timetable entries added successfully! 🎉" },
        200
      );
    } else {
      return Respond(
        { success: false, error: "Department or year not found. 😞" },
        401
      );
    }
  } catch (error) {
    console.error(error);
    return Respond({
      success: false,
      error: "Failed to retrieve timetable. Try again later. 😞",
    },400);
  }
}
