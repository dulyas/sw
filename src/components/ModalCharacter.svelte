<script>

    import SWService from './Service.js';
    import { createEventDispatcher, onDestroy } from 'svelte';
    const swService = new SWService;

    export let people;
    let promise;



    const dispatch = createEventDispatcher();
    const close = () => {
        dispatch('close')
    };

    const handle_keydown = e => {
		if (e.key === 'Escape') {
			close();
			return;
		};
    }

</script>

    <svelte:window on:keydown={handle_keydown}/>

   <div class="modal__bg" on:click={close}></div>
    <img src="./img/icons/exit.svg" on:click={close} alt="exit" class="modal__exit">
    <div class="modal__content">
        <div class="modal-flex-name">
            <div class="cards__item-avatar"
            style={people.color}>{people.name[0]}</div>
            <div class="cards__item-name">{people.name}</div>
        </div>
        <div class="modal-line"></div>
            <div class="modal-flex-info">
                <div class="modal__content__item">
                    <img src="./img/icons/birth.svg" alt="Birth year" class="modal__content__item-img">
                    <span class="modal__content__item-descr">Birth year</span>
                    <span class="modal__content__item-result">{people.birth_year}</span>
                </div>
                <div class="modal__content__item">
                    <img src="./img/icons/homeworld.svg" alt="homeworld" class="modal__content__item-img">
                    <span class="modal__content__item-descr">Homeworld</span>
                    <span class="modal__content__item-result">
                    {#await promise = swService.getSWApi(people.homeworld)}
                    loading...
                    {:then result}
                    {result.name}
                    {:catch error}
                    {error.message}
                    {/await}
                    </span>
                </div>
                <div class="modal__content__item">
                    <img src="./img/icons/species.svg" alt="species" class="modal__content__item-img">
                    <span class="modal__content__item-descr">Species</span>
                    <span class="modal__content__item-result">{people.speciesName}</span>
                </div>
                <div class="modal__content__item">
                    <img src="./img/icons/films.svg" alt="films" class="modal__content__item-img">
                    <span class="modal__content__item-descr">Films</span>
                    <span class="modal__content__item-result">
                        {#each people.films as film}
                        {#await promise = swService.getSWApi(film)}
                        loaging...
                        {:then result}
                        <div class='film'>{result.title}</div>
                        {:catch error}
                        {error.message}
                        {/await}
                        {/each}
                    </span>
                </div>
                <div class="modal__content__item">
                    <img src="./img/icons/gender.svg" alt="gender" class="modal__content__item-img">
                    <span class="modal__content__item-descr">Gender</span>
                    <span class="modal__content__item-result">{people.gender}</span>
                </div>
            </div>
    </div>


<style type='text/scss'>

    @import '../styles/mixins';



    .cards__item {
        &-name {
            @include name;
        }
        &-avatar {
            @include avatar;
        }
    }

    .film {
        margin: 7px 0 0 0;
    }



    .modal {
        &__bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(128, 128, 128, 0.01);
            backdrop-filter: blur(30px);
            z-index: 5;
        }
        &__content {
            position: fixed;
		    left: 50%; top: 50%;
            transform: translate(-50%, -50%);
            width: 800px;
            min-height: 492px;
            background: #1A1A1A;
            border-radius: 8px;
            z-index: 7;
            &__item {
                width: 50%;
                margin: 10px 0;
                display: flex;
                align-items: center;
                &-descr {
                    font-style: normal;
                    font-weight: normal;
                    font-size: 18px;
                    line-height: 21px;
                    font-feature-settings: 'liga' off;
                    color: #808080;
                    width: 50%;
                    margin-left: 11px;
                }
                &-result {
                    font-style: normal;
                    font-weight: bold;
                    font-size: 18px;
                    line-height: 21px;
                    font-feature-settings: 'liga' off;
                    color: #FFFFFF;
                    margin-left: 24px;
                    width: 50%;
                    }
            }
        }
        &-flex-name {
            margin: 80px 0 0 80px;
            display: flex;
            justify-content: left;
            align-items: center;
            .cards__item-name {
                margin-left: 16px;
            }
        }
        &-flex-info {
            display: flex;
            flex-wrap: wrap;
            margin-top: 71px;
            justify-content: left;
            align-items: center;
            width: 640px;
            margin: 71px auto;
        }
        &-line {
            width: 90%;
            height: 2px;
            background: #808080;
            justify-content: center;
            margin: 80px auto 0px auto;
        }
    }

    @media (max-width: 710px) {
        .modal {
            &__content {
                width: 100%;
                height: 100%;
                min-height: 0px;
                &__item {
                    margin: 20px 0;
                }
            }
            &-flex-name {
                margin: 48px 0 0 24px;
            }
            &-flex-info {
                display: block;
                padding-left: 24px;
            }
            &__exit {
                display: block;
                position: fixed;
                top: 2%;
                right: 4%;
                z-index: 100;
            }
        }
    }
</style>