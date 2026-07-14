require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const User = require("../models/User");

const bios = [
  "Frontend Developer passionate about React and TypeScript.",
  "Full Stack Developer building modern web applications.",
  "MERN Stack enthusiast sharing coding tutorials.",
  "Open Source contributor and JavaScript lover.",
  "Backend engineer exploring Node.js and MongoDB.",
  "UI/UX enthusiast creating beautiful interfaces.",
  "Next.js developer writing about web performance.",
  "Software Engineer who loves solving complex problems.",
  "Tech blogger sharing coding tips every week.",
  "Building SaaS products one feature at a time.",
];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    const hashedPassword = await bcrypt.hash("Password@123", 10);

    let inserted = 0;

    while (inserted < 50) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${faker.number.int({
        min: 100,
        max: 999,
      })}`;

      const email = faker.internet.email({
        firstName,
        lastName,
      }).toLowerCase();

      // Skip duplicates
      const exists = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (exists) continue;

      await User.create({
        username,
        email,
        password: hashedPassword,
        role: "user",
        bio: faker.helpers.arrayElement(bios),
        avatar: `https://i.pravatar.cc/300?img=${faker.number.int({
          min: 1,
          max: 70,
        })}`,
        social: {
          twitter: `https://twitter.com/${username}`,
          github: `https://github.com/${username}`,
          website: faker.internet.url(),
        },
      });

      inserted++;
      console.log(`✅ ${inserted}/50 users inserted`);
    }

    console.log("\n🎉 Successfully added 50 dummy users!");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedUsers();