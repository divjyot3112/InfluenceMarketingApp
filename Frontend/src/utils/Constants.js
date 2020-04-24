//TODO: update MY_USER_ID and MY_ROLE to get form localStorage 
const MY_USER_ID = 'sheena@gmail.com'
const MY_ROLE = "Sponsor"
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

const NoImageFoundForTask = "https://firebasestorage.googleapis.com/v0/b/masterfinalproject-4583d.appspot.com/o/tasks%2FnoImageFound.jpg?alt=media&token=cad1cdd5-4571-4192-8962-d67f42a54cdb";
const NoImageFoundForUser = "https://firebasestorage.googleapis.com/v0/b/masterfinalproject-4583d.appspot.com/o/users%2FNoImageFoundForUser.jpg?alt=media&token=dc0e62e8-ebda-4459-9d2d-88ba55b351eb";

export {UserRoles, TaskStatus, TaskCategories, Gender, MY_USER_ID, MY_ROLE, NoImageFoundForTask, NoImageFoundForUser}