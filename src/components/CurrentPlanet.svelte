<script>
import { onMount } from "svelte";
import { createEventDispatcher } from 'svelte';
import { Link } from "svelte-routing";
import SWService from './Service.js';

	const swService = new SWService;

	export let planetRef;
	// let residents = [];
	let planet = null; 

	onMount(async () => {
		// transformResidents(planetRef);
		try {
			planet = await swService.transformArrayOfRefs(planetRef, 'residents');
		} catch (e) {
			console.error(e);
			planet = {
				name: null,
				residents: [],
			}
		}

	});


	
	// function transformResidents(path) {
	// 	swService.getSWApi(path)
	// 	.then((res) => {
	// 		planet = {
	// 			...res,
	// 			residents:[],
	// 			};
	// 		const arrayOfPromises = res.residents.map((url) => {
	// 			return swService.getSWApi(url);
	// 		});
	// 		Promise.allSettled(arrayOfPromises).then((res) => {
	// 			const currentRes = res.map(item => item.value);
	// 			planet.residents = currentRes;
	// 		});
	// 	});
	// } 

	// function transformArrayOfRefs(path, arrayName) {
	// 	console.log(path);
	// 	swService.getSWApi(path)
	// 	.then((res) => {
	// 		const dataObject = {
	// 			...dataObject,
	// 			...res,
	// 		}
	// 		const arrayOfPromises = res[arrayName].map((url) => {
	// 			return swService.getSWApi(url);
	// 		});
	// 		Promise.allSettled(arrayOfPromises).then((res) => {
	// 			const currentRes = res.map(item => item.value);
	// 			dataObject[arrayName] = currentRes;
	// 		});
	// 	});
	// } 






    const peopleClickHandle = (arg) => {
        dispatch('message', {
			newSelectedPeoplePath: arg,
		});
    }



    const dispatch = createEventDispatcher();







</script>

<div class="main">
{#if !planet} 
<span class="choose">Выберите персонажа</span>
{:else}
<span class="char">
		Имя: {planet.name}
		<br>
		Диаметр: {planet.diameter}
		<br>
		Климат: {planet.climate}
		<br>
		{#if planet.residents.length}
			Жители: <br>
			{#each planet.residents as resident}
				<div class="char">
					<Link to="char"
					on:click={() => peopleClickHandle(resident.url)}
					>{resident.name}</Link>
				</div>
			<!-- <button
			on:click={() => peopleClickHandle(resident.url)}>{resident.name}</button><br> -->
			{/each}
		{/if}
</span>
{/if}
</div>



<style type="text/scss">
	@import '../styles/vars';
	.main {
		padding: 1rem;
        margin: 1rem;
        border: 2px black solid;
        text-align: center;
	}

	.char {
		color: $color;
		text-transform: uppercase;
		font-size: 2rem;
	}


</style>