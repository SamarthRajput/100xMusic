
// The NEXT_AUTH accepts an array called Providers where we which all types of providers we are using such as google, github or credentialsProvider where we decide what credentials we need
// the Providers array accepts CredentialsProvider which accepts an object as an argument, where we give it a name

import CredentialsProvider from "next-auth/providers/credentials";

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            // the significance of name is the name we give will come in the button,for eg Sign in with Credentials
            name: 'Sign In',
            // the significance of credentials is what all inputs do you want 
            credentials: {
                email: { label: "email", type: "text", placeholder: "Email", required: true},
                password: { label: "password", type: "password", placeholder: "Password", required: true }
            },

             // authorize is the most imp thing, authorize is the function that gets called anytime we click on submit or click on Sign in with Credentials
            // anytime you click on submit your username and password that you put here reach this credentials argument, here is the meet of the logic that signups the user or if the user is already signed up then signins the user make sure the password is correct 
            // and if the password is correct tells the next-auth that you are good to go, if the credentials are wrong tell the next auth the credentials are wrong 
            async authorize(credentials: any){
                // do database calls 
                console.log(credentials);
                // if the user exists return the users credentials
                // if the user doesnt exists create one user
                return {
                    id: "1",
                    email: "harkiat@gmail.com",
                }

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