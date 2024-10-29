const loadPhone = async(text, isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${text}`);
    const mobile = await res.json();
    displayPhones(mobile.data ,isShowAll);
}

const displayPhones =(phones, isShowAll) =>{
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';


   

    const showAllContainer = document.getElementById('show-allContainer');

    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden')
    }
    else{
      showAllContainer.classList.add('hidden')
    }

    if(!isShowAll){
      phones = phones.slice(0,12)
    }
    
  
     phones.forEach(phone =>{
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-base-100 w-96 shadow-xl`
        phoneCard.innerHTML=` <figure>
                  <img
                    src="${phone.image}"
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-end">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
                `;
                phoneContainer.appendChild(phoneCard);
     })
       toggleLoadingSpinner(false)
    }
     //search bar
     const handleSearch = (isShowAll)=>{
      toggleLoadingSpinner(true)
       const searchField = document.getElementById('search-filed');
       const text = searchField.value;
      //  console.log(text);
       loadPhone(text, isShowAll)
     }

    // show all container
    const handleShowAll = () => {
      handleSearch(true)
    }
  // show mobile detail
  const handleShowDetails = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data
    showAllDetails(phone)
  }

  const showAllDetails = (phone) =>{
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name; 
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML =`
    <img src="${phone.image}" alt="" >
  <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
  <p><span>Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>ChipSet: </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span>Memory: </span>${phone?.mainFeatures?.memory}</p>
  <p><span>Sensors: </span>${phone?.mainFeatures?.sensors}</p>
  <p><span>Slug: </span>${phone?.slug}</p>
  <p><span>Name: </span>${phone?.name}</p>
  `
    my_modal_1.showModal();
  }
 
  //loading spinner
  const toggleLoadingSpinner = (isLoading) =>{
    const isLoadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
      isLoadingSpinner.classList.remove('hidden')
    }
    else{
      isLoadingSpinner.classList.add('hidden')
    }
  }


   
loadPhone();