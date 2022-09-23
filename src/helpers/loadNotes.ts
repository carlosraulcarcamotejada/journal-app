import { collection, getDocs } from "firebase/firestore/lite"
import { firebaseDB } from "../firebase/config";
import { Note } from "../store/journal";


export const loadNotes = async (uid:string = ''):Promise<Note[]> => {

    const collectionRef = collection(firebaseDB,`${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes:Note[] = [];
    docs.forEach(doc => {
        notes.push({
            id:doc.id,
            body:doc.data().body,
            date:doc.data().date,
            imagesURLs:doc.data().imagesURLs,
            title:doc.data().title,
        });
    });
    return notes;
}