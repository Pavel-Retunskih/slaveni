import { dbConnect } from "../shared/api/db/client"
import { Admin } from "../shared/api/db/models/Admin"

async function createAdmin(login: string, password: string) {
    await dbConnect()

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ login })
    if (existingAdmin) {
        console.log(`Admin with login '${login}' already exists`)
        return
    }

    // Create admin, password will be hashed by schema hook
    const admin = new Admin({
        login,
        password
    })

    await admin.save()
    console.log(`Admin '${login}' created successfully`)
    console.log(`Login: ${login}`)
    console.log(`Password: ${password}`)
    console.log(`Hashed password: ${admin.password}`)
}

// Get command line arguments
const args = process.argv.slice(2)
if (args.length !== 2) {
    console.log("Usage: npx tsx scripts/create-admin.ts <login> <password>")
    console.log("Example: npx tsx scripts/create-admin.ts admin mypassword123")
    process.exit(1)
}

const [login, password] = args

createAdmin(login, password)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error creating admin:", error)
        process.exit(1)
    })
