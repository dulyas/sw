<script>
	import SWService from '../components/Service.js';
	import CurrentCharacter from './CurrentCharacter.svelte';
	import CharacterList from './CharacterList.svelte';
	import CurrentPlanet from './CurrentPlanet.svelte';
	import { Router, Route, links } from "svelte-routing";




	let selectedPlanet = null;
	let selectedPeople = null;

	function changePeople(event) {
		selectedPeople = event.detail.selected;
		selectedPlanet = selectedPeople.homeworld;
		 transformPlanet(selectedPeople.homeworld);
	} 

	function getPeopleByPath(event) {
		const path = event.detail.newSelectedPeoplePath;
		getPeople(path);
	}

	const swService = new SWService;

	// function getPlanet(path) {
	// 	swService.getSome(path.substr(21))
	// 	.then(res => selectedPlanet = res)
	// };


	// function getPlanet(path) {
	// 	swService.getSome(path.substr(21))
	// 	.then((res) => {
	// 	let beforeRes = res;
	// 	res.residents.forEach((item, i) => {
	// 		let path = item.substr(21);
	// 		swService.getSome(path)
	// 		.then((res) => {
	// 			beforeRes.residents[i] = res;
	// 		});
	// 	})
	// 	setTimeout(() => {
	// 	console.log(beforeRes);
	// 	selectedPlanet = beforeRes;
	// 	console.log(selectedPlanet);
	// 	}, 5000);
	// 	});

	// }



	function transformPlanet(path) {
		swService.getSWApi(path)
		.then((res) => {
			selectedPlanet = {
				...res,
				residents:[],
				}
			const arrayOfPromises = res.residents.map((url) => {
				return swService.getSWApi(url)
			});
			Promise.allSettled(arrayOfPromises).then((res) => {
				const currentRes = res.map(item => item.value);
				selectedPlanet.residents = currentRes;
			});
		});
	} 

	

	function getPeople(path) {
		swService.getSWApi(path)
		.then(res => selectedPeople = res);
	}
	
	// async function getPlanet(path) {
    //     const res = await swService.getSome(path.substr(21));
    //     selectedPlanet = res;
    // }
	
	// async function getPeople(path) {
    //     const res = await swService.getSome(path.substr(21));
    //     selectedPeople = res;
    // }


</script>

<Router>
	<header class='header'>
		<div class="header__content">
			<img src="./img/star.png" alt="" class="header__content-star">
			<h1 class="header__content-title">CHARACTER Encyclopedia</h1>
			<img src="./img/wars.png" alt="" class="header__content-wars">
		</div>
	</header>









	<nav>
		<div use:links class="nav">
			<a href="/">All Characters</a>
			<a href="char">Selected Character</a>
			<a href="planet">Selected Planet</a>
		</div>
	</nav>
	<div>
	  <Route path="char"><CurrentCharacter people={selectedPeople} planet={selectedPlanet}/></Route>
	  <Route path="planet"><CurrentPlanet on:message={getPeopleByPath} planet={selectedPlanet}/></Route>
	  <Route path="/"><CharacterList on:message={changePeople}/></Route>
	</div>
</Router>


<!-- <CurrentCharacter people={selectedPeople} planet={selectedPlanet}/>
<CharacterList on:message={changePeople}/>
<CurrentPlanet on:message={getPeopleByPath} planet={selectedPlanet}/> -->

<style type="text/scss">
	@import '../styles/vars';

	.header {
		background: url('/img/Header_bg.png')center center/cover no-repeat;
		height: 40vh;
		width: 100%;
		padding: 5vh 0;
		text-align: center;
		h1 {
			text-transform: uppercase;
			font-size: 1.6rem;
			letter-spacing: 0.11em;
			text-align: center;
			color: white;
		}
	}
	nav {
		text-align: center;
		margin: 1rem;
		a {
		color: white;
		text-decoration: none;
		margin: 0 1rem;
	}
	}

</style>