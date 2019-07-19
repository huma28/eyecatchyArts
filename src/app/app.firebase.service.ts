import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import * as firebase from 'firebase';


 
// import {FileUpload} from './models/fileupload';
// @Injectable()
 
@Injectable()
export class FirebaseService {
    list: AngularFireList<any>;
    detail: AngularFireList<any>;
    


//   private basePath = '/uploads';
//   fileUploads: FileUpload[];
 
  constructor(private firebase: AngularFireDatabase) {}

  getBanner() {
    this.list = this.firebase.list('paintingList');
    return this.list;
  }

  paintingDetail(id) {
    this.detail = this.firebase.list(`paintingList/${id}`);
    console.log('huma---', this.detail);
    return this.detail;
  }
 
//   pushFileToStorage(fileUpload: FileUpload, progress: {percentage: number}) {
//     const storageRef = firebase.storage().ref();
//     const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
 
//     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
//       (snapshot) => {
//         // in progress
//         const snap = snapshot as firebase.storage.UploadTaskSnapshot
//         progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
//       },
//       (error) => {
//         // fail
//         console.log(error)
//       },
//       () => {
//         // success
//         fileUpload.url = uploadTask.snapshot.downloadURL
//         fileUpload.name = fileUpload.file.name
//         this.saveFileData(fileUpload)
//       }
//     );
//   }
 
//   private saveFileData(fileUpload: FileUpload) {
//     this.db.list(`${this.basePath}/`).push(fileUpload)
//   }
 
//   getFileUploads(query = {}) {
//     this.fileUploads = this.db.list(this.basePath, {
//       query: query
//     });
//     return this.fileUploads
//   }
 
//   deleteFileUpload(fileUpload: FileUpload) {
//     this.deleteFileDatabase(fileUpload.$key)
//       .then(() => {
//         this.deleteFileStorage(fileUpload.name)
//       })
//       .catch(error => console.log(error))
//   }
 
//   private deleteFileDatabase(key: string) {
//     return this.db.list(`${this.basePath}/`).remove(key)
//   }
 
//   private deleteFileStorage(name: string) {
//     const storageRef = firebase.storage().ref()
//     storageRef.child(`${this.basePath}/${name}`).delete()
//   }
}