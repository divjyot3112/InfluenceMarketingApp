import {getEmailFromLocalStorage, getRoleFromLocalStorage} from "../components/Common/auth";

const MY_USER_ID = getEmailFromLocalStorage();
const MY_ROLE = getRoleFromLocalStorage();

const UserRoles = {
    SPONSOR: "Sponsor",
    INFLUENCER: "Influencer"
}

const TaskStatus = {
    CREATED: 'Created',
    INPROGRESS: 'In Progress',
    PENDING: 'Pending',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    APPLIED: 'Applied',
    ALL: "All"
}

const TaskCategories = [
    "Apparels",
    "Automobile",
    "Beauty and Personal Care",
    "Education",
    "Electronics",
    "Entertainment",
    "Fitness & Gym",
    "Food",
    "Health",
    "Kids",
    "Photography",
    "Sports & Outdoors",
    "Travel",
    "Video Games"
];

const Gender = [
    "Female",
    "Male",
    "Other"
];

const NoImageFound = "https://firebasestorage.googleapis.com/v0/b/masterfinalproject-4583d.appspot.com/o/NoImageFound.jpg?alt=media&token=5f7b9f08-fd8a-4f3f-bd80-c129a971be20";

export {UserRoles, TaskStatus, TaskCategories, Gender, MY_USER_ID, MY_ROLE, NoImageFound}