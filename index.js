const myLibrary = [];

function Book(title,author,pages,read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggleRead = function() {
    this.read = !this.read;
  }
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  const bookshelf = document.querySelector('.bookshelf');
  bookshelf.innerHTML = '';
  
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    
    bookCard.innerHTML = `
      <div class="author-image-container">
        <input type="url" class="author-image-input" data-index="${index}" 
               placeholder="URL de l'image" style="display: none;">
        ${book.imageUrl ? 
          `<div class="image-wrapper">
             <img src="${book.imageUrl}" class="author-image">
             <button class="delete-img-btn" data-index="${index}">×</button>
           </div>` : 
          `<button class="add-image-btn" data-index="${index}">ajouter une image</button>`
        }
      </div>
      <h3>${book.title}</h3>
      <p>par ${book.author}</p>
      <p>${book.pages} pages</p>
      <label>
        <input type="checkbox" class="read-checkbox" data-index="${index}" ${book.read ? 'checked' : ''}>
        Lu
      </label>
      <button class="delete-btn" data-index="${index}">Supprimer</button>
    `;
    
    bookshelf.appendChild(bookCard);
  });

  // Ajout des gestionnaires pour les images
  const addImageBtns = document.querySelectorAll('.add-image-btn');
  const imageInputs = document.querySelectorAll('.author-image-input');

  addImageBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      imageInputs[index].style.display = 'block';
      btn.style.display = 'none';
    });
  });

  imageInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const index = e.target.dataset.index;
      myLibrary[index].imageUrl = e.target.value;
      displayBooks();
    });
  });
  
  // Modification des écouteurs d'événements pour les checkboxes
  const checkboxes = document.querySelectorAll('.read-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const index = e.target.dataset.index;
      myLibrary[index].toggleRead();
      displayBooks();
    });
  });

  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      myLibrary.splice(index, 1); // Supprime le livre du tableau
      displayBooks(); // Rafraîchit l'affichage
    });
  });

  // Ajout du gestionnaire pour le bouton de suppression d'image
  const deleteImgBtns = document.querySelectorAll('.delete-img-btn');
  deleteImgBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      myLibrary[index].imageUrl = '';
      displayBooks();
    });
  });
}

// Sélection des éléments du DOM
const modal = document.getElementById('bookFormModal');
const newBookBtn = document.getElementById('newBookBtn');
const closeBtn = document.getElementsByClassName('close')[0];
const bookForm = document.getElementById('bookForm');

// Ouvrir le modal
newBookBtn.onclick = function() {
  modal.style.display = "block";
}

// Fermer le modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Fermer le modal en cliquant à l'extérieur
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Gérer la soumission du formulaire
bookForm.onsubmit = function(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  
  displayBooks();
  bookForm.reset();
  modal.style.display = "none";
} 