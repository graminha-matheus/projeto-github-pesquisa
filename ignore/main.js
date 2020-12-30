$(document).ready(function(){

	var userimg = ''
	var profile_userimg = ''

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

		$.get("https://api.github.com/search/users?q=" + username + "+in:user&per_page=100",
		 function(data){
				
				//mostra dados resultantes no console
				console.log(data)	

				//mostra o avatar de cada usuário que se encaixa nos parâmetros da busca
				data.items.forEach(item => {
					
					userimg = `<img id="imguser" class="border ml-4 mt-4" width="100" height="100" src="${item.avatar_url}"/></a>`
					profile_userimg = `<img id="imguser" class="border ml-4 mt-4" width="100" height="100" src="${item.avatar_url}"/></a>`

					$("#github_photo").append(userimg)
					$("#result").append(userimg)

					$('#result').click(function(){
  						$('#userpage').modal('show')

  					});
				});

		})
	}

});