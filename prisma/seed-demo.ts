import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function seedDemoExpenses() {
  // Find or create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@expensetracker.com" },
    update: {},
    create: {
      email: "demo@expensetracker.com",
      name: "Demo User",
      image: null,
    },
  });

  console.log("Demo user:", demoUser);

  // Get all categories
  const categories = await prisma.category.findMany();

  if (categories.length === 0) {
    console.error(
      "No categories found. Please run the main seed script first."
    );
    return;
  }

  // Delete existing demo expenses
  await prisma.expense.deleteMany({
    where: { userId: demoUser.id },
  });

  console.log("Cleared existing demo expenses");

  // Create demo expenses for the last 3 months (90 days)
  const today = new Date();
  const demoExpenses = [];

  // Helper to get date N days ago
  const daysAgo = (days: number) =>
    new Date(today.getTime() - days * 24 * 60 * 60 * 1000);

  // Food & Dining expenses - frequent throughout 3 months
  const foodCategory = categories.find((c) => c.name === "Food & Dining");
  if (foodCategory) {
    demoExpenses.push(
      // Month 1 (0-30 days ago)
      {
        date: daysAgo(1),
        categoryId: foodCategory.id,
        amount: 250.5,
        description: "Lunch at Italian restaurant",
      },
      {
        date: daysAgo(2),
        categoryId: foodCategory.id,
        amount: 180.0,
        description: "Dinner with friends",
      },
      {
        date: daysAgo(4),
        categoryId: foodCategory.id,
        amount: 95.75,
        description: "Breakfast at cafe",
      },
      {
        date: daysAgo(7),
        categoryId: foodCategory.id,
        amount: 420.0,
        description: "Family dinner",
      },
      {
        date: daysAgo(10),
        categoryId: foodCategory.id,
        amount: 155.5,
        description: "Thai food delivery",
      },
      {
        date: daysAgo(13),
        categoryId: foodCategory.id,
        amount: 320.0,
        description: "Sushi restaurant",
      },
      {
        date: daysAgo(16),
        categoryId: foodCategory.id,
        amount: 125.0,
        description: "Coffee shop",
      },
      {
        date: daysAgo(19),
        categoryId: foodCategory.id,
        amount: 280.5,
        description: "Korean BBQ",
      },
      {
        date: daysAgo(22),
        categoryId: foodCategory.id,
        amount: 165.0,
        description: "Pizza delivery",
      },
      {
        date: daysAgo(25),
        categoryId: foodCategory.id,
        amount: 195.0,
        description: "Brunch",
      },
      {
        date: daysAgo(28),
        categoryId: foodCategory.id,
        amount: 210.0,
        description: "Mexican restaurant",
      },
      // Month 2 (31-60 days ago)
      {
        date: daysAgo(32),
        categoryId: foodCategory.id,
        amount: 175.5,
        description: "Street food tour",
      },
      {
        date: daysAgo(35),
        categoryId: foodCategory.id,
        amount: 145.0,
        description: "Lunch buffet",
      },
      {
        date: daysAgo(38),
        categoryId: foodCategory.id,
        amount: 230.0,
        description: "Fine dining",
      },
      {
        date: daysAgo(41),
        categoryId: foodCategory.id,
        amount: 110.5,
        description: "Sandwich shop",
      },
      {
        date: daysAgo(44),
        categoryId: foodCategory.id,
        amount: 195.0,
        description: "Chinese takeout",
      },
      {
        date: daysAgo(47),
        categoryId: foodCategory.id,
        amount: 265.0,
        description: "Steakhouse",
      },
      {
        date: daysAgo(50),
        categoryId: foodCategory.id,
        amount: 135.5,
        description: "Cafe breakfast",
      },
      {
        date: daysAgo(53),
        categoryId: foodCategory.id,
        amount: 190.0,
        description: "Seafood restaurant",
      },
      {
        date: daysAgo(56),
        categoryId: foodCategory.id,
        amount: 155.0,
        description: "Food delivery",
      },
      {
        date: daysAgo(59),
        categoryId: foodCategory.id,
        amount: 220.0,
        description: "Japanese restaurant",
      },
      // Month 3 (61-90 days ago)
      {
        date: daysAgo(62),
        categoryId: foodCategory.id,
        amount: 185.0,
        description: "Vietnamese pho",
      },
      {
        date: daysAgo(65),
        categoryId: foodCategory.id,
        amount: 140.5,
        description: "Burger joint",
      },
      {
        date: daysAgo(68),
        categoryId: foodCategory.id,
        amount: 295.0,
        description: "Birthday dinner",
      },
      {
        date: daysAgo(71),
        categoryId: foodCategory.id,
        amount: 125.0,
        description: "Lunch with colleagues",
      },
      {
        date: daysAgo(74),
        categoryId: foodCategory.id,
        amount: 165.5,
        description: "Bakery and coffee",
      },
      {
        date: daysAgo(77),
        categoryId: foodCategory.id,
        amount: 245.0,
        description: "Indian restaurant",
      },
      {
        date: daysAgo(80),
        categoryId: foodCategory.id,
        amount: 175.0,
        description: "Food court",
      },
      {
        date: daysAgo(83),
        categoryId: foodCategory.id,
        amount: 215.0,
        description: "Weekend brunch",
      },
      {
        date: daysAgo(86),
        categoryId: foodCategory.id,
        amount: 155.5,
        description: "Fast food",
      },
      {
        date: daysAgo(89),
        categoryId: foodCategory.id,
        amount: 285.0,
        description: "French bistro",
      }
    );
  }

  // Transportation expenses - regular throughout 3 months
  const transportCategory = categories.find((c) => c.name === "Transportation");
  if (transportCategory) {
    demoExpenses.push(
      // Month 1
      {
        date: daysAgo(1),
        categoryId: transportCategory.id,
        amount: 1200.0,
        description: "Monthly bus pass",
      },
      {
        date: daysAgo(3),
        categoryId: transportCategory.id,
        amount: 45.0,
        description: "Taxi to office",
      },
      {
        date: daysAgo(5),
        categoryId: transportCategory.id,
        amount: 85.5,
        description: "Grab ride",
      },
      {
        date: daysAgo(8),
        categoryId: transportCategory.id,
        amount: 650.0,
        description: "Fuel for car",
      },
      {
        date: daysAgo(12),
        categoryId: transportCategory.id,
        amount: 95.0,
        description: "Parking fees",
      },
      {
        date: daysAgo(18),
        categoryId: transportCategory.id,
        amount: 125.0,
        description: "Taxi ride",
      },
      {
        date: daysAgo(24),
        categoryId: transportCategory.id,
        amount: 580.0,
        description: "Gas refill",
      },
      // Month 2
      {
        date: daysAgo(31),
        categoryId: transportCategory.id,
        amount: 1200.0,
        description: "Monthly bus pass",
      },
      {
        date: daysAgo(36),
        categoryId: transportCategory.id,
        amount: 75.5,
        description: "Grab to airport",
      },
      {
        date: daysAgo(42),
        categoryId: transportCategory.id,
        amount: 620.0,
        description: "Fuel for car",
      },
      {
        date: daysAgo(48),
        categoryId: transportCategory.id,
        amount: 110.0,
        description: "Parking",
      },
      {
        date: daysAgo(54),
        categoryId: transportCategory.id,
        amount: 85.0,
        description: "Taxi",
      },
      // Month 3
      {
        date: daysAgo(61),
        categoryId: transportCategory.id,
        amount: 1200.0,
        description: "Monthly bus pass",
      },
      {
        date: daysAgo(67),
        categoryId: transportCategory.id,
        amount: 95.5,
        description: "Grab ride",
      },
      {
        date: daysAgo(73),
        categoryId: transportCategory.id,
        amount: 590.0,
        description: "Gas station",
      },
      {
        date: daysAgo(79),
        categoryId: transportCategory.id,
        amount: 125.0,
        description: "Taxi to meeting",
      },
      {
        date: daysAgo(85),
        categoryId: transportCategory.id,
        amount: 65.0,
        description: "Parking fee",
      }
    );
  }

  // Shopping expenses - spread throughout 3 months
  const shoppingCategory = categories.find((c) => c.name === "Shopping");
  if (shoppingCategory) {
    demoExpenses.push(
      {
        date: daysAgo(2),
        categoryId: shoppingCategory.id,
        amount: 890.0,
        description: "New shoes",
      },
      {
        date: daysAgo(6),
        categoryId: shoppingCategory.id,
        amount: 1250.0,
        description: "Clothes shopping",
      },
      {
        date: daysAgo(12),
        categoryId: shoppingCategory.id,
        amount: 450.0,
        description: "Online shopping",
      },
      {
        date: daysAgo(20),
        categoryId: shoppingCategory.id,
        amount: 3500.0,
        description: "New laptop",
      },
      {
        date: daysAgo(27),
        categoryId: shoppingCategory.id,
        amount: 680.0,
        description: "Electronics accessories",
      },
      {
        date: daysAgo(39),
        categoryId: shoppingCategory.id,
        amount: 950.0,
        description: "Winter jacket",
      },
      {
        date: daysAgo(45),
        categoryId: shoppingCategory.id,
        amount: 1580.0,
        description: "Furniture",
      },
      {
        date: daysAgo(52),
        categoryId: shoppingCategory.id,
        amount: 420.0,
        description: "Shoes",
      },
      {
        date: daysAgo(63),
        categoryId: shoppingCategory.id,
        amount: 2200.0,
        description: "New phone",
      },
      {
        date: daysAgo(70),
        categoryId: shoppingCategory.id,
        amount: 750.0,
        description: "Clothes",
      },
      {
        date: daysAgo(78),
        categoryId: shoppingCategory.id,
        amount: 890.0,
        description: "Home decor",
      },
      {
        date: daysAgo(87),
        categoryId: shoppingCategory.id,
        amount: 1100.0,
        description: "Shopping spree",
      }
    );
  }

  // Entertainment expenses
  const entertainmentCategory = categories.find(
    (c) => c.name === "Entertainment"
  );
  if (entertainmentCategory) {
    demoExpenses.push(
      {
        date: daysAgo(3),
        categoryId: entertainmentCategory.id,
        amount: 350.0,
        description: "Movie tickets and snacks",
      },
      {
        date: daysAgo(9),
        categoryId: entertainmentCategory.id,
        amount: 599.0,
        description: "Spotify Premium",
      },
      {
        date: daysAgo(14),
        categoryId: entertainmentCategory.id,
        amount: 1500.0,
        description: "Concert tickets",
      },
      {
        date: daysAgo(21),
        categoryId: entertainmentCategory.id,
        amount: 799.0,
        description: "Netflix yearly",
      },
      {
        date: daysAgo(33),
        categoryId: entertainmentCategory.id,
        amount: 450.0,
        description: "Theater show",
      },
      {
        date: daysAgo(43),
        categoryId: entertainmentCategory.id,
        amount: 2200.0,
        description: "Music festival",
      },
      {
        date: daysAgo(55),
        categoryId: entertainmentCategory.id,
        amount: 380.0,
        description: "Cinema IMAX",
      },
      {
        date: daysAgo(66),
        categoryId: entertainmentCategory.id,
        amount: 650.0,
        description: "Gaming subscription",
      },
      {
        date: daysAgo(75),
        categoryId: entertainmentCategory.id,
        amount: 890.0,
        description: "Sports event tickets",
      },
      {
        date: daysAgo(84),
        categoryId: entertainmentCategory.id,
        amount: 420.0,
        description: "Bowling night",
      }
    );
  }

  // Bills & Utilities - monthly recurring
  const billsCategory = categories.find((c) => c.name === "Bills & Utilities");
  if (billsCategory) {
    demoExpenses.push(
      // Month 1
      {
        date: daysAgo(5),
        categoryId: billsCategory.id,
        amount: 1200.0,
        description: "Electricity bill",
      },
      {
        date: daysAgo(5),
        categoryId: billsCategory.id,
        amount: 599.0,
        description: "Internet bill",
      },
      {
        date: daysAgo(5),
        categoryId: billsCategory.id,
        amount: 350.0,
        description: "Water bill",
      },
      {
        date: daysAgo(7),
        categoryId: billsCategory.id,
        amount: 450.0,
        description: "Mobile phone bill",
      },
      // Month 2
      {
        date: daysAgo(35),
        categoryId: billsCategory.id,
        amount: 1180.0,
        description: "Electricity bill",
      },
      {
        date: daysAgo(35),
        categoryId: billsCategory.id,
        amount: 599.0,
        description: "Internet bill",
      },
      {
        date: daysAgo(35),
        categoryId: billsCategory.id,
        amount: 320.0,
        description: "Water bill",
      },
      {
        date: daysAgo(37),
        categoryId: billsCategory.id,
        amount: 450.0,
        description: "Mobile phone bill",
      },
      // Month 3
      {
        date: daysAgo(65),
        categoryId: billsCategory.id,
        amount: 1350.0,
        description: "Electricity bill",
      },
      {
        date: daysAgo(65),
        categoryId: billsCategory.id,
        amount: 599.0,
        description: "Internet bill",
      },
      {
        date: daysAgo(65),
        categoryId: billsCategory.id,
        amount: 365.0,
        description: "Water bill",
      },
      {
        date: daysAgo(67),
        categoryId: billsCategory.id,
        amount: 450.0,
        description: "Mobile phone bill",
      }
    );
  }

  // Groceries - regular weekly purchases
  const groceriesCategory = categories.find((c) => c.name === "Groceries");
  if (groceriesCategory) {
    demoExpenses.push(
      // Month 1
      {
        date: daysAgo(1),
        categoryId: groceriesCategory.id,
        amount: 650.0,
        description: "Weekly groceries",
      },
      {
        date: daysAgo(4),
        categoryId: groceriesCategory.id,
        amount: 320.5,
        description: "Fresh vegetables and fruits",
      },
      {
        date: daysAgo(8),
        categoryId: groceriesCategory.id,
        amount: 890.0,
        description: "Monthly grocery shopping",
      },
      {
        date: daysAgo(11),
        categoryId: groceriesCategory.id,
        amount: 280.0,
        description: "Meat and fish",
      },
      {
        date: daysAgo(15),
        categoryId: groceriesCategory.id,
        amount: 450.0,
        description: "Snacks and beverages",
      },
      {
        date: daysAgo(18),
        categoryId: groceriesCategory.id,
        amount: 580.0,
        description: "Weekly shopping",
      },
      {
        date: daysAgo(22),
        categoryId: groceriesCategory.id,
        amount: 390.5,
        description: "Fresh produce",
      },
      {
        date: daysAgo(25),
        categoryId: groceriesCategory.id,
        amount: 720.0,
        description: "Grocery haul",
      },
      {
        date: daysAgo(29),
        categoryId: groceriesCategory.id,
        amount: 420.0,
        description: "Dairy and eggs",
      },
      // Month 2
      {
        date: daysAgo(32),
        categoryId: groceriesCategory.id,
        amount: 680.0,
        description: "Weekly groceries",
      },
      {
        date: daysAgo(36),
        categoryId: groceriesCategory.id,
        amount: 350.0,
        description: "Vegetables",
      },
      {
        date: daysAgo(39),
        categoryId: groceriesCategory.id,
        amount: 920.0,
        description: "Monthly shopping",
      },
      {
        date: daysAgo(43),
        categoryId: groceriesCategory.id,
        amount: 480.5,
        description: "Fresh items",
      },
      {
        date: daysAgo(46),
        categoryId: groceriesCategory.id,
        amount: 520.0,
        description: "Weekly restock",
      },
      {
        date: daysAgo(50),
        categoryId: groceriesCategory.id,
        amount: 395.0,
        description: "Fruits and veggies",
      },
      {
        date: daysAgo(53),
        categoryId: groceriesCategory.id,
        amount: 750.0,
        description: "Grocery shopping",
      },
      {
        date: daysAgo(57),
        categoryId: groceriesCategory.id,
        amount: 420.0,
        description: "Pantry items",
      },
      // Month 3
      {
        date: daysAgo(61),
        categoryId: groceriesCategory.id,
        amount: 695.0,
        description: "Weekly groceries",
      },
      {
        date: daysAgo(64),
        categoryId: groceriesCategory.id,
        amount: 380.0,
        description: "Fresh produce",
      },
      {
        date: daysAgo(68),
        categoryId: groceriesCategory.id,
        amount: 850.0,
        description: "Big grocery haul",
      },
      {
        date: daysAgo(71),
        categoryId: groceriesCategory.id,
        amount: 450.5,
        description: "Meat and seafood",
      },
      {
        date: daysAgo(75),
        categoryId: groceriesCategory.id,
        amount: 580.0,
        description: "Weekly shopping",
      },
      {
        date: daysAgo(78),
        categoryId: groceriesCategory.id,
        amount: 410.0,
        description: "Fresh items",
      },
      {
        date: daysAgo(82),
        categoryId: groceriesCategory.id,
        amount: 720.0,
        description: "Grocery run",
      },
      {
        date: daysAgo(86),
        categoryId: groceriesCategory.id,
        amount: 395.0,
        description: "Snacks and drinks",
      }
    );
  }

  // Healthcare
  const healthcareCategory = categories.find((c) => c.name === "Healthcare");
  if (healthcareCategory) {
    demoExpenses.push(
      {
        date: daysAgo(6),
        categoryId: healthcareCategory.id,
        amount: 500.0,
        description: "Doctor consultation",
      },
      {
        date: daysAgo(11),
        categoryId: healthcareCategory.id,
        amount: 280.0,
        description: "Pharmacy - medications",
      },
      {
        date: daysAgo(23),
        categoryId: healthcareCategory.id,
        amount: 1200.0,
        description: "Dental checkup",
      },
      {
        date: daysAgo(40),
        categoryId: healthcareCategory.id,
        amount: 450.0,
        description: "Medical prescription",
      },
      {
        date: daysAgo(51),
        categoryId: healthcareCategory.id,
        amount: 850.0,
        description: "Lab tests",
      },
      {
        date: daysAgo(69),
        categoryId: healthcareCategory.id,
        amount: 600.0,
        description: "Eye examination",
      },
      {
        date: daysAgo(81),
        categoryId: healthcareCategory.id,
        amount: 380.0,
        description: "Vitamins and supplements",
      }
    );
  }

  // Education
  const educationCategory = categories.find((c) => c.name === "Education");
  if (educationCategory) {
    demoExpenses.push(
      {
        date: daysAgo(7),
        categoryId: educationCategory.id,
        amount: 1500.0,
        description: "Online course subscription",
      },
      {
        date: daysAgo(13),
        categoryId: educationCategory.id,
        amount: 850.0,
        description: "Books and study materials",
      },
      {
        date: daysAgo(34),
        categoryId: educationCategory.id,
        amount: 2200.0,
        description: "Professional certification",
      },
      {
        date: daysAgo(58),
        categoryId: educationCategory.id,
        amount: 1100.0,
        description: "Workshop registration",
      },
      {
        date: daysAgo(76),
        categoryId: educationCategory.id,
        amount: 950.0,
        description: "E-learning platform",
      }
    );
  }

  // Housing - monthly rent
  const housingCategory = categories.find((c) => c.name === "Housing");
  if (housingCategory) {
    demoExpenses.push(
      {
        date: daysAgo(1),
        categoryId: housingCategory.id,
        amount: 8500.0,
        description: "Monthly rent",
      },
      {
        date: daysAgo(31),
        categoryId: housingCategory.id,
        amount: 8500.0,
        description: "Monthly rent",
      },
      {
        date: daysAgo(61),
        categoryId: housingCategory.id,
        amount: 8500.0,
        description: "Monthly rent",
      },
      {
        date: daysAgo(17),
        categoryId: housingCategory.id,
        amount: 450.0,
        description: "Home maintenance",
      },
      {
        date: daysAgo(49),
        categoryId: housingCategory.id,
        amount: 680.0,
        description: "Cleaning supplies",
      },
      {
        date: daysAgo(72),
        categoryId: housingCategory.id,
        amount: 1200.0,
        description: "Repairs",
      }
    );
  }

  // Personal Care
  const personalCareCategory = categories.find(
    (c) => c.name === "Personal Care"
  );
  if (personalCareCategory) {
    demoExpenses.push(
      {
        date: daysAgo(9),
        categoryId: personalCareCategory.id,
        amount: 450.0,
        description: "Haircut and styling",
      },
      {
        date: daysAgo(16),
        categoryId: personalCareCategory.id,
        amount: 680.0,
        description: "Skincare products",
      },
      {
        date: daysAgo(30),
        categoryId: personalCareCategory.id,
        amount: 350.0,
        description: "Salon visit",
      },
      {
        date: daysAgo(44),
        categoryId: personalCareCategory.id,
        amount: 520.0,
        description: "Cosmetics",
      },
      {
        date: daysAgo(60),
        categoryId: personalCareCategory.id,
        amount: 420.0,
        description: "Spa treatment",
      },
      {
        date: daysAgo(74),
        categoryId: personalCareCategory.id,
        amount: 380.0,
        description: "Hair color",
      },
      {
        date: daysAgo(88),
        categoryId: personalCareCategory.id,
        amount: 590.0,
        description: "Beauty products",
      }
    );
  }

  // Travel
  const travelCategory = categories.find((c) => c.name === "Travel");
  if (travelCategory) {
    demoExpenses.push(
      {
        date: daysAgo(26),
        categoryId: travelCategory.id,
        amount: 4500.0,
        description: "Weekend getaway hotel",
      },
      {
        date: daysAgo(26),
        categoryId: travelCategory.id,
        amount: 1200.0,
        description: "Flight tickets",
      },
      {
        date: daysAgo(62),
        categoryId: travelCategory.id,
        amount: 8500.0,
        description: "Beach resort booking",
      },
      {
        date: daysAgo(62),
        categoryId: travelCategory.id,
        amount: 2800.0,
        description: "Round trip flights",
      }
    );
  }

  // Create all expenses
  for (const expense of demoExpenses) {
    await prisma.expense.create({
      data: {
        userId: demoUser.id,
        categoryId: expense.categoryId,
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
      },
    });
  }

  console.log(`Created ${demoExpenses.length} demo expenses`);

  // Summary
  const totalAmount = demoExpenses.reduce((sum, e) => sum + e.amount, 0);
  console.log(`Total demo expenses: ฿${totalAmount.toFixed(2)}`);
}

seedDemoExpenses()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
