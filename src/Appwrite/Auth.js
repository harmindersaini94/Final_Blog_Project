import { Client, Account, ID } from "appwrite";
import envObj from "../Config/Config";

class AppwriteAuth {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(envObj.ENDPOINT_ID).setProject(envObj.PROJECT_ID);

    this.account = new Account(this.client);
  }

  async CreateAccount({ name, email, password }) {
    try {
      const response = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      // Here we will get the response, which is a user object
      return response;
    } catch (error) {
      console.log("Appwrite serive :: CreateAccount :: error", error);
      throw error;
    }
  }
  async LoginAccount({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      if (session) return session;
    } catch (error) {
      console.log("Appwrite serive :: LoginAccount :: error", error);
      throw error;
    }
  }
  async GetCurrentLoggedInUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("Appwrite serive :: GetCurrentLoggedInUser :: error", error);
      throw error;
    }
  }
  async Logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: Logout :: error", error);
      throw error;
    }
  }
}

const authObj = new AppwriteAuth();
export default authObj;
