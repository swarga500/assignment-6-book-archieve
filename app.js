
// DOM
const booksDiv = document.getElementById('books-div');
const inputId = document.getElementById('input-field');
const countId = document.getElementById('search-count');
const errorDiv = document.getElementById('error-div')

// onclick event handler
const loadBooks = () =>{
  const searchText = inputId.value;
  // clear previous data 
  inputId.value = '';
  booksDiv.textContent = '';
  countId.innerHTML ='';
    
    // error handling
    if(searchText === ''){
      errorDiv.innerText = 'search field is empty'
      return
    }
    const url = ` http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
      // error handling------------
      if(data.numFound === 0){
        errorDiv.innerText = 'result not found'
        return
      }
      else{
        errorDiv.innerText ='';
      }
      displayBook(data)})
};

// arrow function call 
loadBooks()

//------- Ui display array function --------------------------------------------------
const displayBook = books =>{
  // clear previous result 
    booksDiv.textContent = '';
    countId.textContent ='';


    const p = document.createElement('p');
    p.innerHTML = `
    <p>search result: ${books.numFound}</p>
    `;
    countId.appendChild(p);

    //----------- array looping -------------------------------------
    books.docs.forEach(book => {

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img height="350px" src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Name: <p class="text-muted fw-bold">${book.title}</p></h5>
              <h5>Author: <p class="text-muted">${book.author_name[0]}</p></h5>
              <h5>Publisher: <p class="text-muted">${book.publisher[0]}</p></h5>
              <h5>First publish: <p class="text-muted">${book.first_publish_year}</p></h5>
              <h5>Publish date: <p class="text-muted">${book.publish_date[0]}</p></h5>
            </div>
            </div>
          </div>
        `;
        booksDiv.appendChild(div);
    })
}











