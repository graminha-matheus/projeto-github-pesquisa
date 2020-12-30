$(document).ready(function(){

	var userimg = ''

	// formulário
	$("#form").submit(function (event){

		//prevenir envio automático do formulário
		event.preventDefault()

		//bindando uma variável para o input da caixa de pesquisas 
		var username = $("#username").val()

		//chamando a função que busca o usuário no GitHub
		ghUserLookup (username);

	});

	//essa função permite que, ao pesquisar outro username, os resultados
	//anteriores sejam apagados
	$("#username").change(function(){
		var username = $("#username").val()

		ghUserLookup(username) 
	})

	//função para buscar o usuário no banco de dados do GitHub, usando API.
	function ghUserLookup(username) {

		//apaga as imagens da pesquisa anterior
		$("#result").empty()
		$("#result_repo_info").empty()
		$("#h_dev").empty()

		$.get("https://api.github.com/search/users?q=" + username + "+in:user",
		 function(data){
				
				//mostra dados resultantes no console
				console.log(data)	

				//mostra a imagem de perfil do usuário correspondente
				var profile_picture = 
				`<img id="imguser" 
				class="ml-4 mt-4 image-portrait center" 
				src="${data.items[0].avatar_url}"/>`

				$("#result").append(profile_picture)

				//mostra o nome de perfil do usuário correspondente
				var profile_login = 
				`<h1 class="text-center text-light">${data.items[0].login}</h1>
				<h3>-----------------</h3>
				<h4 class="text-center text-light">${data.items[0].login}'s repositories:</h2>
				<br>`
				
				$("#result").append(profile_login)

		})

		$.get("https://api.github.com/search/repositories?q=user:" + username +"&sort=stars&order=desc",
		 function(data){
				
				//mostra dados resultantes no console
				console.log(data)	

				data.items.forEach(item => {

					profile_repo_info = 
					//Nome do repositório, descrição e linguagem.
					 `<a href="${item.html_url}">
					 <p class="text-center text-light font-weight-bold">${item.full_name}</p></a>

					 <p class="text-center text-light font-italic">"${item.description}"</p> 

					 <p class="text-center text-light font-weight-light">Mostly developed in ${item.language}</p>
					 <h3 class="text-center">-----------</h3>`

					$("#result_repo_info").append(profile_repo_info)

				})
		})
	}

});