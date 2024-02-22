const loadPhone = async (searchText='13',isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  display(phones,isShowAll);
};

const display = (phones,isShowAll) => {
  const divContainer = document.getElementById("dive-container");
  // clear phone container card adding new search
  divContainer.textContent = "";

  //  show all button implement by condition
  
  const showALLBtn = document.getElementById("show-all-btn");
  if(phones.length>6){
    showALLBtn.classList.remove('hidden')
  }else{
    showALLBtn.classList.add('hidden')
  }
  // slice the data to show set value

 if(isShowAll){
  phones=phones.slice(0,6)
}

  

  phones.forEach((value) => {
  
    const phoneList = document.createElement("div");
    phoneList.classList = "card  bg-base-300 gap-4 shadow-xl";

    phoneList.innerHTML = `
        <figure><img src="${value.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${value.brand}</h2>
                      <p>${value.phone_name}</p>
                      <div class="card-actions justify-end">
                        <button onclick='handleDetails("${value.slug
                        }"), my_modal_5.showModal()' class="btn btn-primary">About DEtails</button>
                      </div>
                    </div>
        `;

    divContainer.appendChild(phoneList);
  });
  // hidden loading spinner after load data
  toggleLoadSpinner(false)
};

const inputField = document.getElementById("myInput");
const button = document.getElementById("myButton");

// Function to handle input value
function getInputValue(isShowAll) {
  toggleLoadSpinner(true)
  const inputValue = inputField.value;
  
  
  loadPhone(inputValue,isShowAll);
  
}

inputField.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    getInputValue();
  }
});
button.addEventListener("click", getInputValue);

// add a loading spinner

const toggleLoadSpinner=(isLoading)=>{
  const loadingSpinner=document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
  

}

// handle show on function

const handleShowAll=()=>{
    getInputValue(true)
}
// about Details of every phone;

const handleDetails=async(id)=>{
    

    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data=await res.json();
    
    handleShowDetails(data.data)

}

const handleShowDetails=(phone)=>{
  console.log(phone);
  my_modal_5.showModal();
  const showDetails=document.getElementById("show-details-container");
  showDetails.innerHTML=`
  <div class="card card-compact w-96 bg-base-100 shadow-xl">
  <figure><img src="${phone.image}" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">${phone.name}</h2>
    <p>${phone.
      releaseDate
      }</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
  `
}
loadPhone()
