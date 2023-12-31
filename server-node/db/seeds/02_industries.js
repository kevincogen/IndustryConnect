const db = require('../connection');

// -- List of industry categories
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

// -- Function to seed industries table
const seedIndustriesTable = async () => {
  const client = await db.connect();
  try {
    for (const category of industryCategories) {
      const query = {
        text: `
          INSERT INTO industries
            (name)
          VALUES
            ($1)
        `,
        values: [category],
      };
      await client.query(query);
    }
    console.log('Industries table seeded successfully.');
  } catch (err) {
    console.error('Error seeding industries table:', err);
  } finally {
    client.release();
  }
};

module.exports = seedIndustriesTable;
