import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
  const firebaseConfig = {
    apiKey: "AIzaSyA6FFI4ftocfETaPo5DhyNsfbS2UBUNL6g",
    authDomain: "project1-773d4.firebaseapp.com",
    databaseURL: "https://project1-773d4-default-rtdb.firebaseio.com",
    projectId: "project1-773d4",
    storageBucket: "project1-773d4.appspot.com",
    messagingSenderId: "1079998514803",
    appId: "1:1079998514803:web:b77907abe7f4fe6c398c06"
  };

const app = initializeApp(firebaseConfig);
export const db=getDatabase(app)