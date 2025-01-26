import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/users.model.js";

config();

const seedUsers = [
    // Female Users
    {
        email: "emma.thompson@example.com",
        fullName: "Emma Thompson",
        password: "password1",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
        location: {
            city: "New York",
            country: "USA"
        },
        phone: "123-456-7890"
    },
    {
        email: "olivia.miller@example.com",
        fullName: "Olivia Miller",
        password: "password2",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
        location: {
            city: "Los Angeles",
            country: "USA"
        },
        phone: "123-456-7891"
    },
    {
        email: "sophia.davis@example.com",
        fullName: "Sophia Davis",
        password: "password3",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
        location: {
            city: "Chicago",
            country: "USA"
        },
        phone: "123-456-7892"
    },
    {
        email: "ava.wilson@example.com",
        fullName: "Ava Wilson",
        password: "password4",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
        location: {
            city: "San Francisco",
            country: "USA"
        },
        phone: "123-456-7893"
    },
    {
        email: "isabella.brown@example.com",
        fullName: "Isabella Brown",
        password: "password5",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
        location: {
            city: "Miami",
            country: "USA"
        },
        phone: "123-456-7894"
    },
    {
        email: "mia.johnson@example.com",
        fullName: "Mia Johnson",
        password: "password6",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
        location: {
            city: "Houston",
            country: "USA"
        },
        phone: "123-456-7895"
    },
    {
        email: "charlotte.williams@example.com",
        fullName: "Charlotte Williams",
        password: "password7",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
        location: {
            city: "Phoenix",
            country: "USA"
        },
        phone: "123-456-7896"
    },
    {
        email: "amelia.garcia@example.com",
        fullName: "Amelia Garcia",
        password: "password8",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
        location: {
            city: "Dallas",
            country: "USA"
        },
        phone: "123-456-7897"
    },

    // Male Users
    {
        email: "james.anderson@example.com",
        fullName: "James Anderson",
        password: "password9",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
        location: {
            city: "New York",
            country: "USA"
        },
        phone: "234-567-8901"
    },
    {
        email: "william.clark@example.com",
        fullName: "William Clark",
        password: "password10",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
        location: {
            city: "Los Angeles",
            country: "USA"
        },
        phone: "234-567-8902"
    },
    {
        email: "benjamin.taylor@example.com",
        fullName: "Benjamin Taylor",
        password: "password11",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
        location: {
            city: "Chicago",
            country: "USA"
        },
        phone: "234-567-8903"
    },
    {
        email: "lucas.moore@example.com",
        fullName: "Lucas Moore",
        password: "password12",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
        location: {
            city: "San Francisco",
            country: "USA"
        },
        phone: "234-567-8904"
    },
    {
        email: "henry.jackson@example.com",
        fullName: "Henry Jackson",
        password: "password13",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
        location: {
            city: "Miami",
            country: "USA"
        },
        phone: "234-567-8905"
    },
    {
        email: "alexander.martin@example.com",
        fullName: "Alexander Martin",
        password: "password14",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
        location: {
            city: "Houston",
            country: "USA"
        },
        phone: "234-567-8906"
    },
    {
        email: "daniel.rodriguez@example.com",
        fullName: "Daniel Rodriguez",
        password: "password15",  // Updated to meet min length of 8
        profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
        location: {
            city: "Phoenix",
            country: "USA"
        },
        phone: "234-567-8907"
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

// Call the function
seedDatabase();
