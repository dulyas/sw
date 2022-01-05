<script>
    import { onMount } from 'svelte';
    import SWService from '../components/Service.js';
    import { createEventDispatcher } from 'svelte';
    import { links } from "svelte-routing";
    import Loading from '../components/Loading.svelte'



    let swService = new SWService;
    let peoples = [];
    let page = 1;
    let value = '';


    const peopleClickHandle = (i) => {
        dispatch('message', {
			selected: peoples[i],
		});
    }




    const dispatch = createEventDispatcher();





    onMount(() => {
        swService.getAllCharacters(`https://swapi.dev/api/people/?page=${page}`)
        .then(res => peoples = res);
    })

    function nextPage() {
        if (page < 9) {
            page++
        } else {
            page = 1;
        }
            swService.getAllCharacters(`https://swapi.dev/api/people/?page=${page}`)
            .then(res => peoples = res);
    }
    
    function prevPage() {
        if (page > 1) {
            page--;
        } else {
            page = 9;
        }
            swService.getAllCharacters(`https://swapi.dev/api/people/?page=${page}`)
            .then(res => peoples = res);
    }
    
    function searchPeople(value) {
        swService.getAllCharacters(`https://swapi.dev/api/people/?search=${value}`)
        .then(res => peoples = res);
    }


</script>




<div class="main">
    <div class="search">
        <input bind:value={value} type="text" placeholder='Search by name'>
        <img src="./img/icons/search.svg" alt="" class="search-img" on:click="{() => searchPeople(value)}">
    </div>
    <div class="peoples">
        {#each peoples as people, i}
        <div use:links class="char">
            <a href="char"
            on:click={() => peopleClickHandle(i)}
            >{people.name}</a>
        </div>
        {:else}
            <Loading/>
        {/each}
    </div>
    <div class="btns">
        <button on:click={prevPage}>prev</button>
        <button on:click={nextPage}>next</button>
    </div>
</div>



<style type="text/scss">
	@import '../styles/vars';
	.main {
		padding: 1rem;
        text-align: center;
	}
    .search {
        position: relative;
        width: 60%;
        margin: 0 auto;
        input {
            background: rgba($color: #000000, $alpha: 0.1);
            border: none;
            height: 2.5rem;
            padding: 0 1rem;
            width: 90%;
            color: white;
        }
        img {
            position: absolute;
            right: 5%;
            top: 20%;
            cursor: pointer;
        }
    }
    .btns {
        margin-top: 1rem;
    }

    .peoples {
        a {
		color: white;
		text-decoration: none;
		margin: 0 1rem;
        }
    }

</style>

