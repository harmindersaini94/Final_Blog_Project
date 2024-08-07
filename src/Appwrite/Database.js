import { Client, Databases, Storage, ID, Query } from "appwrite";
import envObj from "../Config/Config";

class PostDatabase {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client.setEndpoint(envObj.ENDPOINT_ID).setProject(envObj.PROJECT_ID);

    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async CreatePost({
    title,
    description,
    email,
    phone,
    address,
    status,
    image,
    userid,
  }) {
    try {
        console.log("hiiiii", title,
            description,
            email,
            phone,
            address,
            status,
            image,
            userid)
      const response = await this.database.createDocument(
        envObj.DATABASE_ID,
        envObj.COLLECTION_ID,
        ID.unique(),
        {
          title,
          description,
          email,
          phone,
          address,
          status,
          image,
          userid,
        }
      );
      return response;
    } catch (error) {
        console.log("Appwrite serive :: createDocument :: error", error);
        throw "Appwrite serive :: createDocument :: error", error
    }
  }

  async GetParticularPost(postid){
    try {
      const postData = await this.database.getDocument(
        envObj.DATABASE_ID,
        envObj.COLLECTION_ID,
        postid
      )
      return postData
    } catch (error) {
      console.log("Appwrite serive :: GetParticularPost :: error", error);
      throw "Appwrite serive :: GetParticularPost :: error", error
    }
  }

  async GetAllPosts(){
    try {
      const allPosts = await this.database.listDocuments(
        envObj.DATABASE_ID,
        envObj.COLLECTION_ID
      )
      return allPosts
    } catch (error) {
      console.log("Appwrite serive :: GetAllPosts :: error", error);
      throw "Appwrite serive :: GetAllPosts :: error", error
    }
  }

  async GetAllPostForAUser(useid){
    try {
      const allPosts = await this.database.listDocuments(
        envObj.DATABASE_ID,
        envObj.COLLECTION_ID,
        [
          Query.equal('userid', [useid])
        ]
      )
      return allPosts
    } catch (error) {
      console.log("Appwrite serive :: GetAllPostForAUser :: error", error);
      throw "Appwrite serive :: GetAllPostForAUser :: error", error
    }
  }

  async DeletePost(postid){
    try {
      const response = this.database.deleteDocument(
        envObj.DATABASE_ID,
        envObj.COLLECTION_ID,
        postid
      )
      return response
    } catch (error) {
      console.log("Appwrite serive :: DeletePost :: error", error);
      throw "Appwrite serive :: DeletePost :: error", error
    }
  }

  // File Upload
  async UploadFile(image){
    try {
        console.log("featuredImage" ,image)
        return await this.storage.createFile(
            envObj.BUCKET_ID,
            ID.unique(),
            image
        )
    } catch (error) {
      console.log("Appwrite serive :: UploadFile :: error", error);
      throw "Appwrite serive :: UploadFile :: error", error
    }
}

async UpdatePost({
  title,
  description,
  email,
  phone,
  address,
  status,
  image,
  postID,
}) {
  try {
    return await this.database.updateDocument(
      envObj.DATABASE_ID,
      envObj.COLLECTION_ID,
      postID,
      {
        title,
        description,
        email,
        phone,
        address,
        status,
        image
      }
  )
  } catch (error) {
    console.log("Appwrite serive :: UpdatePost :: error", error);
    throw "Appwrite serive :: UpdatePost :: error", error
  }
}

PreviewFile(fileId){
  console.log("Image here 123", fileId)
  try {
      return this.storage.getFilePreview(
          envObj.BUCKET_ID,
          fileId.toString()
      )
  } catch (error) {
    console.log("Appwrite serive :: PreviewFile :: error", error);
    throw "Appwrite serive :: PreviewFile :: error", error
  }
}

async DeleteFile(fileId){
  try {
      return await this.storage.deleteFile(
          envObj.BUCKET_ID,
          fileId
      )
  } catch (error) {
    console.log("Appwrite serive :: DeleteFile :: error", error);
    throw "Appwrite serive :: DeleteFile :: error", error
  }
}

}

const postDbObj = new PostDatabase();
export default postDbObj;
