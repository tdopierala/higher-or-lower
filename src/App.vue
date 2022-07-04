<template>
	<header>
		<nav class="navbar navbar-expand-lg bg-light">
			<div class="container-fluid">
				<router-link class="navbar-brand" to="/">Higher or Lower Game</router-link>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<!-- <li class="nav-item">
							<a class="nav-link active" aria-current="page" href="#">Home</a>
						</li> -->
						<li class="nav-item">
							<router-link class="nav-link" aria-current="page" to="/">Play!</router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" aria-current="page" to="/score">Score</router-link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>

	<main>
		<div class="container">
			<div class="row">
				<div class="col-12">
					<router-view />
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="scss">
/* * {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
} */

/* #app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
} */
</style>
