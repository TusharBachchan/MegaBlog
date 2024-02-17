import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket; // or storage
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // documentation -> databases -> create document 

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            // slug is used as document id
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, { title, content, featuredImage, status, userId });
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            // slug is used as document id
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, { title, content, featuredImage, status });
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            // slug is used as document id
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return true; // returning true to indicate deletion since above line returns deleted document -> to be confirmed
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // getPost -> get one particular post
    async getPost(slug) {
        try {
            // slug is used as document id
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false; // if no post is found
        }
    }
    // getPosts(queries) -> to get posts with status = active, providing default parameter so user dosent have to pass anything 
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            // slug is used as document id
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false; // if no post is found
        }
    }

    // file upload service
    // uploadFile(file) -> here file parameter is a blob and not the file name
    async uploadFile(fileId) {
        try {
            // slug is used as document id
            return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            // fileId will be returned
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false; // if no post is found
        }
    }
    // deleteFile
    async deleteFile(fileId) {
        try {
            // slug is used as document id
            await this.bucket.createFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false; // if no post is found
        }
    }
    // getFilePreview -> returns url of preview image
    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
    }

}

const service = new Service();
export default service;