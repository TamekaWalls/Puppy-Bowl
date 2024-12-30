//allow visitors to see teams of puppies that are competing
//observe a players details

//grab the ul
const ul = document.querySelector('ul');
const detailContainer = document.querySelector(".puppy-details")
const back = document.querySelector('button')
//get API puppy list
const getPuppies = async () => {
  const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2410-ftb-mt-web-pt/players');
  const responseObject = await response.json();

  ul.classList.remove("hide")
  detailContainer.classList.add('hide')
  back.classList.add('hide')

  //create an li for each puppy
  constpuppyNameLis = responseObject.data.players.forEach((individualPuppy) => {
    const puppyLI = document.createElement('li');
    puppyLI.innerText = individualPuppy.name;
    puppyLI.addEventListener('click', () => {
      getPuppyDetails(individualPuppy.id)
    })
    //put all li's in the ul
    ul.append(puppyLI)
  });
}
getPuppies();


const getPuppyDetails = async (id) => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2410-ftb-mt-web-pt/players/${id}`);
  const responseObject = await response.json();
  console.log(responseObject.data.player);

  const player = responseObject.data.player;

  ul.classList.add("hide")
  detailContainer.classList.remove('hide')
  back.classList.remove('hide')

  detailContainer.innerHTML = ''
  const playerHTML = `
       <h2>${player.name}</h2>
    <p>Breed: ${player.breed}</p>
    <p>Status: ${player.status}</p>
    <h4>Team: ${player.team.name}</h4>
    <img src="${player.imageUrl}" alt="${player.name}">
    `
  detailContainer.innerHTML = playerHTML
}

back.addEventListener('click',()=>{
  getPuppies()
})
