import bcrypt from "bcrypt"
import dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config()

async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    console.log(`Original password: ${password}`)
    console.log(`Hashed password: ${hashedPassword}`)
    console.log("\nYou can use this hashed password directly in MongoDB:")
    console.log(`db.admins.insertOne({ login: "your_login", password: "${hashedPassword}" })`)
}

// Get command line arguments
const args = process.argv.slice(2)
if (args.length !== 1) {
    console.log("Usage: npx tsx scripts/hash-password.ts <password>")
    console.log("Example: npx tsx scripts/hash-password.ts mypassword123")
    process.exit(1)
}

const [password] = args

hashPassword(password)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error hashing password:", error)
        process.exit(1)
    })
