import { Response } from "types/response.interface";
import { IUserRepository } from "types/users/iuser.repository";
import { User } from "types/users/user.interface";

import firebase from "@config/firebase";
import {
   getFirestore,
   collection,
   addDoc,
   query,
   where,
   getDocs,
 } from 'firebase/firestore';

export class UserRepository implements IUserRepository {
   private db = getFirestore(firebase);
   private userCollection = collection(this.db, 'users');

   async create(data: User): Promise<Response<User>> {
     const { ok } = await this.findOne(data.email);

     if(ok) {
      return {
         ok: false,
         message: "User already exists."
      }
     }
     
     const docRef = await addDoc(this.userCollection, data);
     return {
        ok:true,
        data: { ...data, id: docRef.id },
        message: 'User created successfully.'
     }
     
   }

   async findOne(id: string): Promise<Response<User | null>> {
      try {
         const q = query(this.userCollection, where('email', '==', id));
         const querySnapshot = await getDocs(q);

         if (querySnapshot.empty) {
            return {
               ok: false,
               message: 'No user found with that email'
            }
         }

         const userDoc = querySnapshot.docs[0];
         return {
            ok: true,
            data: {  id: userDoc.id, ...userDoc.data() } as User
         }
      } catch (error) {
         return this.handleError();
      }
   }

   findAll(): Promise<Response<User[]>> {
      throw new Error("Method not implemented.");
   }

   update(id: string, data: Partial<User>): Promise<Response<Boolean>> {
      throw new Error("Method not implemented.");
   }

   delete(id: string): Promise<Response<Boolean>> {
      throw new Error("Method not implemented.");
   }

   private handleError() {
      return {
         ok: false,
         message: 'A problem occurred contact your administrator.'
      }
   }
}