const myForm = document.querySelector('#form');
const addButton = document.querySelector('#add');

let books = JSON.parse(localStorage.getItem('books'));

if (!books || books.length === 0) {
    books = [{
        title: 'Caixa Homero – Ilíada & Odisseia: Ilíada e Odisseia',
        author: 'Homero',
        pages: '1152',
        status: false,
    }];

    localStorage.setItem('books', JSON.stringify(books));
}

addButton.addEventListener('click', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const authorName = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const result = document.createElement('p');
    result.style.color = '#bd0b23';
    result.style.backgroundColor = '#d6a8ae';
    result.id = 'error-message';
    result.style.padding = '5px';
    myForm.appendChild(result); 

    const existingBook = books.find(book => 
        book.title === title && 
        book.author === authorName && 
        book.pages === pages
    );

    if (existingBook) {
        result.textContent = 'This book already exists.';
        setTimeout(() => {
            result.style.display = 'none';
        }, 3000);
        return;
    }
    
    if (title === '' && authorName === '' && pages === '') {
        result.textContent = 'Please fill all the form to continue';
           
        setTimeout(() => {
            result.style.display = 'none';
        }, 3000);
        
        return;
    } else  if (title === '' && isNaN) {
            result.textContent = 'Please fill the title to continue';
             setTimeout(() => {
            result.style.display = 'none';
             }, 3000);
            return;
        }else  if (authorName === '' && isNaN) {
            result.textContent = 'Please fill the author name to continue';
             setTimeout(() => {
            result.style.display = 'none';
             }, 3000);
            return;
        }else  if (pages === '' || isNaN(pages)) {
            result.textContent = 'You forget to fill page number';
             setTimeout(() => {
            result.style.display = 'none';
             }, 3000);
            return;
        } else {

    const newBook = {
        title: title,
        author: authorName,
        pages: pages,
        status: false,
    };
    
    books.push(newBook);
    
    localStorage.setItem('books', JSON.stringify(books));
    
        dataRecuperation();
    }
     const errorMessage = document.querySelector('#error-message');
    if (errorMessage) {
        errorMessage.remove()
    }
});

function dataRecuperation() {
    const container = document.querySelector('.data');
    container.innerHTML = '';

    books.forEach(book => {
        const myBook = document.createElement('div');
        myBook.style.cssText = `
            padding: 15px 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: solid .6px #DDD;
            width: 200px;
            height: auto;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            position: relative;
            margin: 5px;
            overflow: hidden;
            background-color: #fff;`;
        container.appendChild(myBook)
        const titleInput = document.createElement('h1');
        titleInput.textContent = book.title;
        titleInput.style.color = `${book.textColor}`
        myBook.appendChild(titleInput);

        const containerBtn = document.createElement('div');
        containerBtn.style.cssText = `
        display: flex;
        flex-direction: column;
        padding: 10px;
        width: max-content;
        height: 120px;`
        const btnRemove = document.createElement('button');
        containerBtn.appendChild(btnRemove);
        btnRemove.textContent = 'Remove';
        btnRemove.style.cssText = `
            background-color: #ff2223;
            padding: 5px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 80px;
            color: #fff;
            box-shadow: 1px 2px 2px #ddd;`;
    
        btnRemove.addEventListener('click', () => {
            const index = books.findIndex(item => item.title === book.title &&
                item.author === book.author && item.pages === book.pages);

            if (index !== -1) {
                books.splice(index, 1);
                localStorage.setItem('books', JSON.stringify(books));
                dataRecuperation();
            }
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = book.status;
        checkbox.id='check-'+book.title
        containerBtn.appendChild(checkbox)
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = 'Reading?';
        const labelCheck = document.createElement('div');
        labelCheck.appendChild(checkbox);
        labelCheck.style.cssText = `display: flex;
        align-items: center; 
        width: 100px; 
        justify-content: center; 
        flex-direction: row-reverse;
        margin: 10px;`
        labelCheck.appendChild(label)
        containerBtn.appendChild(labelCheck);
        const status = document.createElement('p');
        status.innerHTML = checkbox.checked ?
            `<span style='color: green; background-color: #ddd; padding: 10px;'>I've already started reading</span>` :
            `<span style='color: red; background-color: #ddd; padding: 10px;'>I haven't started reading</span>`;
        containerBtn.appendChild(status);

        checkbox.addEventListener('change', () => {
            book.status = checkbox.checked; 
            localStorage.setItem('books', JSON.stringify(books)); 
            status.innerHTML = checkbox.checked ?
                `<span style='color: green;  background-color: #ddd; padding: 10px;'>I've already started reading</span>` :
                `<span style='color: red; background-color: #ddd; padding: 10px;'>I haven't started reading</span>`;
        });
       
        myBook.appendChild(containerBtn);

        const newContainer = document.createElement('div');
        newContainer.classList.add('author-sec');
        myBook.appendChild(newContainer)
        const authorInput = document.createElement('p');
        authorInput.innerHTML = `
            <span style='display: block; margin: 5px 0; font-weight: 700';>Author:</span> ${book.author}`;
        newContainer.appendChild(authorInput);
        authorInput.style.fontStyle = 'italic';
        authorInput.style.color=`#333333`

        const pagesInput = document.createElement('p');
        pagesInput.innerHTML = `
            <span style='display: block; margin: 5px 0; font-weight: 700';>Pages:</span> ${book.pages}`;
        newContainer.appendChild(pagesInput);
        pagesInput.style.fontStyle = 'italic';
        pagesInput.style.color = `#333`;
    });
}

const favDialog = document.querySelector('.favDialog');
const closeButton = document.querySelector('#close');
const modalShow = document.querySelector('#show-button')

modalShow.addEventListener('click', () => {
    favDialog.showModal();
    
})

closeButton.addEventListener('click', () => {
    favDialog.close()
})

dataRecuperation();
