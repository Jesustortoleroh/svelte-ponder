<script lang="ts">
	let email = $state('');
	let password = $state('');
	let error = $state('');

	function loginHandler(event: SubmitEvent) {
		event.preventDefault();
		error = '';

		// Validation logic
		if (!email.includes('@')) {
			error = 'Please enter a valid email.';
		} else if (password.length < 6) {
			error = 'Password must be at least 6 characters.';
		} else {
			console.log('Login clicked!');
		}
	}
</script>

<form onsubmit={loginHandler}>
	<div>
		<label for="email">Email</label>
		<input id="email" type="email" bind:value={email} />
	</div>
	<div>
		<label for="password">Password</label>
		<input id="password" type="password" bind:value={password} />
	</div>
	<button type="submit">Log In</button>
	
	{#if error}
		<p class="error">{error}</p>
	{/if}
</form>

<style>
	form {
		max-width: 350px;
		margin: 2rem auto;
		padding: 2rem;
		border: 2px solid #a3b18a; 
		border-radius: 12px; 
		background-color: #fefae0; 
		box-shadow: 0 4px 12px rgba(58, 90, 64, 0.1); 
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #3a5a40; 
		font-family: 'Georgia', serif; 
	}

	input {
		width: 100%;
		padding: 0.75rem;
		margin-bottom: 1.25rem;
		border: 1px solid #a3b18a;
		border-radius: 6px;
		background-color: #ffffff;
		box-sizing: border-box;
		color: #344e41;
		transition: border-color 0.3s ease;
	}

	input:focus {
		outline: none;
		border-color: #588157; 
		box-shadow: 0 0 0 3px rgba(88, 129, 87, 0.2);
	}

	button {
		width: 100%;
		padding: 0.85rem;
		background-color: #588157; 
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1rem;
		font-weight: bold;
		letter-spacing: 0.5px;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #3a5a40; 
	}

	.error {
		color: #bc4749; 
		margin-top: 1rem;
		font-size: 0.9rem;
		text-align: center;
		font-weight: bold;
	}
</style>