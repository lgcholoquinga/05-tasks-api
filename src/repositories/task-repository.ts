import { ITaskRepository } from "types/tasks/itask.repository";
import { Task } from "types/tasks/task.interface";

import firebase from "@config/firebase";
import {
   getFirestore,
   collection,
   doc,
   addDoc,
   getDoc,
   getDocs,
   updateDoc,
   deleteDoc,
   query,
   where,
 } from 'firebase/firestore';
import { Response } from "types/response.interface";

export class TaskRepository implements ITaskRepository {
   private db = getFirestore(firebase);
   private taskCollection = collection(this.db, 'tasks');
   private userCollection = collection(this.db, 'users');

   async create(data: Task): Promise<Response<Task>> {
      try {
         const existUser = await this.findUserByEmail(data.userId);

         if(!existUser) {
            return {
               ok: false,
               message: `There is no user with email: ${data.userId}`
            }
         }

         data.createdAt = new Date();
         data.completed = false;
         const docRef = await addDoc(this.taskCollection, data);
         return {
            ok:true,
            data: { ...data, id: docRef.id },
            message: 'Task created successfully.'
         }
         
      } catch (error) {
         return this.handleError();
      }
   }

   async findAll(): Promise<Response<Task[]>> {
      try {
         const snapshot = await getDocs(this.taskCollection);
         const tasksDB = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));

         return {
            ok:true,
            data: tasksDB
         }
      } catch (error) {
         return this.handleError();
      }
   }

   async findAllById(id: string): Promise<Response<Task[]>> {

      const q = query(this.taskCollection, where('userId', '==', id));
      const querySnapshot = await getDocs(q);

      const tasksDoc = querySnapshot.docs;
      const taskDB: Task[] = [];

      tasksDoc.forEach((doc) => {
         const { userId, createdAt, ...taskData } = doc.data();
         const formattedCreatedAt = createdAt.toDate();
         taskDB.push({ id: doc.id, createdAt: formattedCreatedAt, ...taskData } as Task);
      });

      return {
         ok: true,
         data: taskDB,
      }
   }

   async findOne(id: string): Promise<Response<Task | null>> {
      const docRef = doc(this.taskCollection, id);
      const docSnap = await getDoc(docRef);
   
      if(!docSnap.exists()){
         return {
            ok: false,
            message: 'Task not found.',
         }
      }

      return {
         ok: true,
         data: { id: docSnap.id, ...docSnap.data() } as Task
      }
   }

   async update(id: string, data: Partial<Task>): Promise<Response<Boolean>> {
      const { ok, message } = await this.findOne(id);

      if(!ok){
         return {
            ok: false,
            message
         }
      }

      const docRef = doc(this.taskCollection, id);
      await updateDoc(docRef, data);
      return {
         ok:true,
         message: 'Task updated successfully.'
      }
   }

   async delete(id: string): Promise<Response<Boolean>> {
      const { ok, message } = await this.findOne(id);

      if(!ok){
         return {
            ok: false,
            message
         }
      }

      const docRef = doc(this.taskCollection, id);
      await deleteDoc(docRef);
      return {
         ok:true,
         message: 'Task deleted successfully.'
      }
   }

   private async findUserByEmail(email: string): Promise<boolean> {
      try {
         const q = query(this.userCollection, where('email', '==', email));
         const querySnapshot = await getDocs(q);

         if (querySnapshot.empty) {
            return false;
         }

         return true;
      } catch {
         return false;
      }   
   }

   private handleError() {
      return {
         ok: false,
         message: 'A problem occurred contact your administrator.'
      }
   }
}