let fileInput = document.getElementById("file-input");
let imageContainer = document.getElementById("images");
let numOfFiles = document.getElementById("num-of-files");

let newFileInput = document.getElementById("card-image");
let imgNueva = document.getElementById("img-nueva");

function newPreview() {
  imgNueva.innerHTML = "";
  const newImage = newFileInput.files;
  console.log(newFileInput);
  console.log(newFileInput.length());
  let reader = new FileReader();
  const fileImg = newImage[0];
  let container = document.createElement("div");
  container.className = "card card-color";
  container.setAttribute("style", "width: 18rem;");
  let img = document.createElement("img");
  img.className = "card-img-top";
  img.setAttribute("style", "height: 200px; object-fit: cover;");
  let cardBody = document.createElement("div");
  cardBody.className = "card-body card-color";
  let deleteButton = document.createElement("a");
  deleteButton.innerText = "Eliminar";
  deleteButton.className = "btn btn-outline-light w-30 py-2 w-50";

  deleteButton.addEventListener("click", function () {
    imageContainer.removeChild(container);
    removeFile(file);
  });
  reader.onload = () => {
    img.setAttribute("src", reader.result);
  };

  cardBody.appendChild(deleteButton);
  container.appendChild(img);
  container.appendChild(cardBody);
  imageContainer.appendChild(container);
  reader.readAsDataURL(file);
}

function preview() {
  imageContainer.innerHTML = "";
  const files = fileInput.files;
  //numOfFiles.textContent = `${fileInput.files.length} imagenes nuevas`;

  for (let i = 0; i < files.length; i++) {
    let reader = new FileReader();
    const file = files[i];

    let container = document.createElement("div");
    container.className = "card card-color";
    container.setAttribute("style", "width: 18rem;");

    let img = document.createElement("img");
    img.className = "card-img-top";
    img.setAttribute("style", "height: 200px; object-fit: cover;");
    //  img.setAttribute("id", "new");

    let cardBody = document.createElement("div");
    cardBody.className = "card-body card-color";
    //Delete button
    let deleteButton = document.createElement("a");
    deleteButton.innerText = "Eliminar";
    deleteButton.className = "btn btn-outline-light w-30 py-2 w-50";

    deleteButton.addEventListener("click", function () {
      imageContainer.removeChild(container);
      // numOfFiles.textContent = `${fileInput.files.length} imagenes nuevas`;
      removeFile(file);
    });
    reader.onload = () => {
      img.setAttribute("src", reader.result);
    };

    cardBody.appendChild(deleteButton);
    container.appendChild(img);
    container.appendChild(cardBody);
    imageContainer.appendChild(container);
    reader.readAsDataURL(file);
  }
}
function removeFile(fileToRemove) {
  const newFiles = Array.from(fileInput.files).filter(
    (file) => file !== fileToRemove
  );
  fileInput.files = new FileList(newFiles);
  //numOfFiles.textContent = `${fileInput.files.length} imagenes nuevas`;
}
