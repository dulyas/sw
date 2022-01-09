<script>
	import SWService from '../components/Service.js';
	import CurrentCharacter from './CurrentCharacter.svelte';
	import CharacterList from './CharacterList.svelte';
	import CurrentPlanet from './CurrentPlanet.svelte';
	import { Router, Route, links } from "svelte-routing";
	
	export let url = '';


	const swService = new SWService;


	let selectedPeople;
	swService.getSWApi('https://swapi.dev/api/people/1/')
	.then(res => selectedPeople = res);

	function changePeople(event) {
		selectedPeople = event.detail.selected;

	} 

	function getPeopleByPath(event) {
		const path = event.detail.newSelectedPeoplePath;
		getPeople(path);
	}



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



	// function transformPlanet(path) {
	// 	swService.getSWApi(path)
	// 	.then((res) => {
	// 		selectedPlanet = {
	// 			...res,
	// 			residents:[],
	// 			}
	// 		const arrayOfPromises = res.residents.map((url) => {
	// 			return swService.getSWApi(url)
	// 		});
	// 		Promise.allSettled(arrayOfPromises).then((res) => {
	// 			const currentRes = res.map(item => item.value);
	// 			selectedPlanet.residents = currentRes;
	// 		});
	// 	});
	// } 

	

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

<div class="wrapper">
	<div class="content">
		<Router url={url}>
			<header class='header'>
				<div class="header__content">
					<img src="./img/star.png" alt="" class="header__content-star">
					<h1 class="header__content-title">CHARACTER Encyclopedia</h1>
					<img src="./img/wars.png" alt="" class="header__content-wars">
				</div>
			</header>
		
		
		
		
		
		
		
		
		
			<!-- <nav>
				<div use:links class="nav">
					<a href="/">All Characters</a>
					<a href="char">Selected Character</a>
					<a href="planet">Selected Planet</a>
				</div>
			</nav> -->
			<div>
			  <Route path="planet"><CurrentPlanet on:message={getPeopleByPath} planetRef={selectedPeople.homeworld}/></Route>
			  <Route path="/"><CharacterList on:message={changePeople}/></Route>
			  <Route path="char"><CurrentCharacter people={selectedPeople}/></Route>
			</div>
		</Router>
	</div>
	<div class="footer"><div class='footer-text'>STAR WARS CHARACTER Encyclopedia, 2k22</div></div>
</div>

<!-- <CurrentCharacter people={selectedPeople} planet={selectedPlanet}/>
<CharacterList on:message={changePeople}/>
<CurrentPlanet on:message={getPeopleByPath} planet={selectedPlanet}/> -->

<style type="text/scss">


	.header {
		background: url('/img/Header_bg.png')center center / cover no-repeat;
		height: 40vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		z-index: 1;
		h1 {
			text-transform: uppercase;
			font-size: 24px;
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

	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		}
	.content {
		flex: 1 0 auto;
		}




	.footer {
		flex: 0 0 auto;
		height: 120px;
		background: #1A1A1A;
		font-family: Roboto;
		font-style: normal;
		font-weight: bold;
		font-size: 18px;
		letter-spacing: 0.11em;
		text-transform: uppercase;
		font-feature-settings: 'cpsp' on;
		color: #FFFFFF;
		text-align: center;
		padding: 0;
	}
	.footer-text {
		margin-top: 48px;
	}

	@media (max-width: 618px) {
		.header {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 30vh;
			.header__content {
			&-title {
				font-size: 14px;
			}
		}
			img {
				width: 212px;
				height: 50px;
			}
		}
		.footer {
			font-size: 13px;
		}
	}
</style>