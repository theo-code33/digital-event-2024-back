import { firestore } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import "dotenv/config";

export class FirebaseService {
  private app: any;
  private db: any;
  constructor() {
    this.init();
  }

  init(): void {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };

    Object.entries(firebaseConfig).forEach(([key, value]) => {
      if (!value) {
        throw new Error(`Missing firebase config value for key: ${key}`);
      }
    });
    if(!this.app) this.app = initializeApp(firebaseConfig);
    this.db = firestore(admin.app);

    console.log("Firebase initialized successfully ! 🎉");
  }

  public async getCollection(collection: string): Promise<any> {
    const snapshot = await this.db.collection(collection).get();
    return snapshot.docs.map((doc: any) => doc.data());
  }

  public async getDoc(collection: string, doc: string): Promise<any> {
    const snapshot = await this.db.collection(collection).doc(doc).get();
    return snapshot.data();
  }

  public async setDoc(
    collection: string,
    doc: string,
    data: any
  ): Promise<void> {
    await this.db.collection(collection).doc(doc).set(data);
  }

  public async updateDoc(
    collection: string,
    doc: string,
    data: any
  ): Promise<void> {
    await this.db.collection(collection).doc(doc).update(data);
  }
}
