import { dbConnect, dbDisconnect } from "../shared/api/db/client"
import { Admin } from "../shared/api/db/models/Admin"
import bcrypt from "bcrypt"

async function checkAdmin(login: string, password: string) {
    await dbConnect()

    const admin = await Admin.findOne({ login })
    if (!admin) {
        console.log(`Admin with login '${login}' not found`)
        await dbDisconnect()
        return
    }

    console.log("=== Admin Document ===")
    console.log("Login:", admin.login)
    console.log("Stored hash:", admin.password)
    console.log("Hash prefix:", admin.password?.substring(0, 7))
    console.log("Hash length:", admin.password?.length)
    console.log("")

    // Check if stored value looks like a bcrypt hash
    const isBcryptHash = /^\$2[aby]\$\d{2}\$/.test(admin.password)
    console.log("Is valid bcrypt hash:", isBcryptHash)
    console.log("")

    // Test comparePassword method
    console.log("=== comparePassword method ===")
    console.log("Has comparePassword:", typeof admin.comparePassword)
    const result1 = await admin.comparePassword(password)
    console.log(`comparePassword('${password}'):`, result1)
    console.log("")

    // Test bcrypt.compare directly
    console.log("=== Direct bcrypt.compare ===")
    const result2 = await bcrypt.compare(password, admin.password)
    console.log(`bcrypt.compare('${password}', hash):`, result2)
    console.log("")

    // Check if hash is a double-hash (hash of a hash)
    console.log("=== Double-hash check ===")
    const testHash = await bcrypt.hash(password, 10)
    const isDoubleHashed = await bcrypt.compare(testHash, admin.password)
    console.log("Password was double-hashed:", isDoubleHashed)

    await dbDisconnect()
}

const args = process.argv.slice(2)
if (args.length !== 2) {
    console.log("Usage: npx tsx scripts/check-admin.ts <login> <password>")
    console.log("Example: npx tsx scripts/check-admin.ts admin mypassword123")
    process.exit(1)
}

const [login, password] = args

checkAdmin(login, password)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error:", error)
        process.exit(1)
    })
