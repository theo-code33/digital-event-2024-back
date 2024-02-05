import admin, { firestore } from "firebase-admin";
import { ServiceAccount, initializeApp } from "firebase-admin/app";
import serviceAccountKey from "../../serviceAccountKey.json";

export class FirebaseService {
    private app: any;
    private db: any;
    constructor() {
        this.init();
    }

    init(): void {
        if (!serviceAccountKey) throw new Error("Missing serviceAccountKey");
        if (!this.app)
            this.app = initializeApp({
                credential: admin.credential.cert(serviceAccountKey as ServiceAccount),
            });
        this.db = firestore(admin.app());

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

    public async createDoc(
        collection: string,
        data: any): Promise<void> {
        await this.db.collection(collection).add(data);
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