
// The NEXT_AUTH accepts an array called Providers where we which all types of providers we are using such as google, github or credentialsProvider where we decide what credentials we need
// the Providers array accepts CredentialsProvider which accepts an object as an argument, where we give it a name

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import prisma from "./db";

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            // the significance of name is the name we give will come in the button,for eg Sign in with Credentials
            name: 'Sign In',
            // the significance of credentials is what all inputs do you want 
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email", required: true},
                password: { label: "Password", type: "password", placeholder: "Password", required: true }
            },

             // authorize is the most imp thing, authorize is the function that gets called anytime we click on submit or click on Sign in with Credentials
            // anytime you click on submit your username and password that you put here reach this credentials argument, here is the meet of the logic that signups the user or if the user is already signed up then signins the user make sure the password is correct 
            // and if the password is correct tells the next-auth that you are good to go, if the credentials are wrong tell the next auth the credentials are wrong 
            async authorize(credentials: any){
                console.log(credentials.email);
                console.log(credentials.password);
                // do database calls 
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                })
                console.log(existingUser);
                // if the user exists return the users credentials
                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if(passwordValidation){
                        return {
                            id: existingUser.id.toString(),
                            email: existingUser.email,
                        }
                    }
                    return null;
                }

                // if the user doesnt exists create one user
                try{
                    const user = await prisma.user.create({
                        data: {
                            email: credentials.email,
                            password: hashedPassword
                        }
                    });
                    return {
                        id: user.id.toString(),
                        email: user.email,
                    }
                }
                catch(e){
                    console.error(e);
                }
                
                return null;
            },
        })
    ],
    secret: process.env.JWT_SECRET || "supersecret",
    callbacks: {
        async session({token, session}: any){
            if(session && session.user){
                session.user.id = token.userId;  //token.sub
            }
            return session;
        }
    }
}