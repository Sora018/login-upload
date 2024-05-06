const firebaseConfig = {
    apiKey: "AIzaSyAPJiUQ3-rxzfhHyEzejKmVFuDz7q8mANM",
    authDomain: "teste-geral1.firebaseapp.com",
    projectId: "teste-geral1",
    storageBucket: "teste-geral1.appspot.com",
    messagingSenderId: "422986308403",
    appId: "1:422986308403:web:8649d52226a1202312bc46"
};

firebase.initializeApp(firebaseConfig);

function voltar() {
    window.location.href = "../pages/home/home.html";
}




const storage = firebase.storage();

const inp = document.querySelector(".inp");
const progressbar = document.querySelector(".progress");
const img = document.querySelector(".img");
const fileData = document.querySelector(".filedata");
const loading = document.querySelector(".loading");
let file;
let fileName;
let progress;
let isLoading = false;
let uploadedFileName;

const selectImage = () => {
  inp.click();
};

const getImageData = (e) => {
  file = e.target.files[0];
  fileName = Math.round(Math.random() * 9999) + file.name;
  if (fileName) {
    fileData.style.display = "block";
  }
  fileData.innerHTML = fileName;
  console.log(file, fileName);
};

const uploadImage = () => {
  loading.style.display = "block";
  const storageRef = storage.ref().child("myimages");
  const folderRef = storageRef.child(fileName);
  const uploadtask = folderRef.put(file);
  uploadtask.on(
    "state_changed",
    (snapshot) => {
      console.log("Snapshot", snapshot.ref.name);
      progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progress = Math.round(progress);
      progressbar.style.width = progress + "%";
      progressbar.innerHTML = progress + "%";
      uploadedFileName = snapshot.ref.name;
    },
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref("myimages")
        .child(uploadedFileName)
        .getDownloadURL()
        .then((url) => {
          console.log("URL", url);
          if (!url) {
            img.style.display = "none";
          } else {
            img.style.display = "block";
            loading.style.display = "none";
          }
          img.setAttribute("src", url);
        });
      console.log("File Uploaded Successfully");
    }
  );
};
