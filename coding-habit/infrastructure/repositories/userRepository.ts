import { neonDB } from "../db/neondb";
export default async function login(email:string, password:string) {
    const user = neonDB`Select * from users where user_email = ${email} and user_password = ${password}`
    console.log(user)
}