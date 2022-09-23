import {  getDoc, DocumentReference, DocumentData } from "firebase/firestore/lite";



export const getImages = async (docRef: DocumentReference<DocumentData>):Promise<string[]> => {
    try {
        const document = await getDoc(docRef);
        if (document.exists()) {
            const data = document.data();
            return data.imagesURLs;
        }
    } catch (error) {
        console.log(error);
    }
    return []
}
