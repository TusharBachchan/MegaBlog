import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";

// Code in the documentation
// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');               // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });

// Better Approach - Create a Service by referencing above code
export class AuthService{
    client = new Client();
    account;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    // signup
    async createAccount({email, password, name}){
        // Refer Appwrite documentation and look for signup snippet for reference
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount){
                // According to our flow if user account is created successfully -> they are logged in directly
                // call another method
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }
    // login
    async login({email, password}){
        // Refer Appwrite documentation and look for login snippet for reference
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            
        }
    }

    // If we directly land on homepage, we need to know if we are logged in or not
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            // throw error;
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }

        return null; // if return in try block fails
    }

    // logout -> Delete session
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
    }

}

const authService = new AuthService();

export default authService