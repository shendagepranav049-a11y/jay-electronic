import { useState, useEffect } from 'react';
import { doc, onSnapshot, getDoc, setDoc, updateDoc, collection, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export const useSiteContent = (sectionId, fallbackData) => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sectionId) return;
    
    const docRef = doc(db, 'siteContent', sectionId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData({ ...fallbackData, ...docSnap.data() });
      } else {
        setData(fallbackData);
      }
      setLoading(false);
    }, (error) => {
      console.error(`Error fetching siteContent/${sectionId}:`, error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [sectionId]);

  return { data, loading };
};

export const useSiteCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!collectionName) return;
    
    const q = query(collection(db, collectionName), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setData(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      console.error(`Error fetching collection \${collectionName}:`, error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [collectionName]);

  return { data, loading };
};

export const updateSiteContent = async (sectionId, newData) => {
  try {
    const docRef = doc(db, 'siteContent', sectionId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        ...newData,
        updatedAt: new Date()
      });
    } else {
      await setDoc(docRef, {
        ...newData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return true;
  } catch (error) {
    console.error(`Error updating siteContent/${sectionId}:`, error);
    throw error;
  }
};

export const uploadMedia = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const storageRef = ref(storage, `media/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          fileName: file.name,
          storagePath: `media/${fileName}`,
          downloadURL,
          contentType: file.type,
          size: file.size,
          createdAt: new Date()
        });
      }
    );
  });
};
