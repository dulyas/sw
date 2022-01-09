<script>
	import SWService from '../components/Service.js';
	import CharacterList from './CharacterList.svelte';



	const swService = new SWService;



	

	function getPeople(path) {
		swService.getSWApi(path)
		.then(res => selectedPeople = res);
	}
	

</script>

<div class="wrapper">
	<div class="content">
			<header class='header'>
				<div class="header__content">
					<img src="./img/star.png" alt="" class="header__content-star">
					<h1 class="header__content-title">CHARACTER Encyclopedia</h1>
					<img src="./img/wars.png" alt="" class="header__content-wars">
				</div>
			</header>
			<div>
				<CharacterList/>
			</div>
	</div>
	<div class="footer"><div class='footer-text'>STAR WARS CHARACTER Encyclopedia, 2k22</div></div>
</div>

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