const { faker } = require('@faker-js/faker');
const { Pool } = require('pg');

// -- Configure the database connection
const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'industry_connect',
  password: 'labber',
  port: 5432,
});

const industryCategories = [
  "Information Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Marketing",
  "Sales",
  "Engineering",
  "Human Resources",
  "Design",
  "Business Development",
  "Customer Service",
  "Project Management",
  "Consulting",
  "Media and Communication",
  "Legal Services",
  "Accounting",
  "Administration",
  "Research and Development",
  "Manufacturing",
  "Retail",
  "Hospitality and Tourism",
  "Real Estate",
  "Nonprofit and Social Services",
  "Government and Public Administration",
  "Art and Entertainment",
  "Science and Technology",
  "Environmental and Sustainability",
  "Transportation and Logistics",
  "Architecture and Construction",
  "Sports and Fitness"
];
const itBios = [
    "Full-stack developer with expertise in React and Node.js.",
    "Cybersecurity specialist focusing on enterprise solutions.",
    "Cloud engineer experienced in AWS and Azure platforms.",
    "DevOps engineer with deep knowledge in CI/CD pipelines.",
    "Machine learning engineer working on NLP challenges.",
    "UI/UX designer passionate about user-centered design.",
    "Backend developer with extensive knowledge in microservices.",
    "Mobile app developer who specializes in both iOS and Android.",
    "Database administrator with proficiency in PostgreSQL and MongoDB.",
    "Tech lead with a track record of delivering large-scale projects."
];

const itEducation = [
    "Bachelor's in Computer Science from MIT.",
    "Master's in Cybersecurity from Stanford University.",
    "Certified AWS Cloud Architect.",
    "Master's in Software Engineering from Carnegie Mellon.",
    "PhD in Artificial Intelligence from Caltech.",
    "Diploma in Design from Rhode Island School of Design.",
    "Bachelor's in Software Engineering from University of Washington.",
    "Mobile Development certification from Apple Developers Academy.",
    "Master's in Database Systems from University of Texas at Austin.",
    "Leadership in Tech course from Berkeley."
];

const itJobTitles = [
    "Full-stack Developer",
    "Cybersecurity Specialist",
    "Cloud Engineer",
    "DevOps Engineer",
    "Machine Learning Engineer",
    "UI/UX Designer",
    "Backend Developer",
    "Mobile App Developer",
    "Database Administrator",
    "Tech Lead"
];

const healthcareBios = [
    "Registered nurse with experience in pediatric care.",
    "Clinical researcher focusing on cardiology.",
    "Surgeon with a specialty in orthopedics.",
    "Medical laboratory technologist skilled in hematology.",
    "Pharmacist with knowledge in both clinical and retail settings.",
    "Radiologist proficient in MRI and CT scan technologies.",
    "Dentist practicing pediatric and general dentistry.",
    "Physical therapist focusing on sports injuries.",
    "Dietician helping patients with diabetes management.",
    "Healthcare administrator overseeing a large urban hospital."
];

const healthcareEducation = [
    "Bachelor's in Nursing from John Hopkins.",
    "PhD in Clinical Research from Harvard University.",
    "MD from University of Pennsylvania.",
    "Bachelor's in Medical Technology from University of Florida.",
    "Doctor of Pharmacy from University of California, San Francisco.",
    "Radiology certification from Radiological Society of North America.",
    "DDS from New York University.",
    "Master's in Physical Therapy from Northwestern University.",
    "Certified Nutrition Specialist (CNS) designation.",
    "MHA from Cornell University."
];

const healthcareJobTitles = [
    "Registered Nurse",
    "Clinical Researcher",
    "Surgeon",
    "Medical Lab Technologist",
    "Pharmacist",
    "Radiologist",
    "Dentist",
    "Physical Therapist",
    "Dietician",
    "Healthcare Administrator"
];

const generateRandomUser = (industry, index, shouldConnectTo301 = false) => {
    const isIT = index < 10;
    const isHealthcare = index >= 10 && index < 20;

    const bio = isIT ? itBios[index] : (isHealthcare ? healthcareBios[index - 10] : faker.lorem.paragraph());
    const education = isIT ? itEducation[index] : (isHealthcare ? healthcareEducation[index - 10] : faker.lorem.sentence());
    const experience = isIT ? itJobTitles[index] : (isHealthcare ? healthcareJobTitles[index - 10] : faker.person.jobTitle());

    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        authentication_id: faker.string.uuid(),
        profile_picture: faker.image.avatarLegacy(),
        industry: industry,
        bio: bio,
        education: education,
        experience: experience,
        linkedin: faker.internet.url(),
        twitter: faker.internet.url(),
        github: faker.internet.url(),
        facebook: faker.internet.url(),
        website: faker.internet.url(),
        connections: shouldConnectTo301 ? [301, 302, 303, 304, 305, 306, 307, 308, 309,310] : []
    };
};

const seedUsersTable = async () => {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM users');

    let userCount = 0;
    for (let industry of industryCategories) {
      for (let i = 0; i < 10; i++) {
        const shouldConnectTo301 = i % 2 === 1;
        const userData = generateRandomUser(industry, userCount, shouldConnectTo301);

        const query = {
          // ... (no changes here in the query setup)
        };
        await client.query(query);

        userCount++;
      }
    }

    console.log('Users table seeded successfully.');
  } catch (err) {
    console.error('Error seeding users table:', err);
  } finally {
    client.release();
    pool.end();
  }
};

module.exports = seedUsersTable;
