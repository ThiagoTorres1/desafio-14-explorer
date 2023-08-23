// export class GithubUser {
//   static search(user) {
//     const endpoint = `https://api.github.com/users/${user}`

//     return fetch(endpoint)
//     .then(data => data.json())
//     .then(({login, name, public_repos, followers}) => ({
//       login,
//       name,
//       public_repos,
//       followers
//     }))
//   }
// }

// export class Favorites {
//   constructor(root) {
//     this.root = document.querySelector(root)
//     this.load()
//   }

//   load() {
//     this.entries = JSON.parse(localStorage.getItem('@github-favorites: ')) || []
//   }

//   async add(username) {
    
//     try {
//       const userExists = this.entries.find(entry => entry.login === username)

//       if(userExists) {
//         throw new Error('Usuário já cadastrado')
//       }

//       const user = await GithubUser.search(username)

//       if(user.login === undefined) {
//         throw new Error('Usuário não encontrado')
//       }
      
//       this.entries = [user, ...this.entries]
//       this.update()
//       this.save()

//     } catch (e) {
//       alert(e.message)
//     }

   
//   }

//   save() {
//     localStorage.setItem('@github-favorites: ', JSON.stringify(this.entries))
//   }

//   delete(user) {
//     const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
//     this.entries = filteredEntries
//     this.update()   
//     this.save()
//   }

// }

// export class FavoritesView extends Favorites {
//   constructor(root) {
//     super(root)
//     this.body = this.root.querySelector('table tbody')
//     this.update()
//     this.onadd()
//   }

//   onadd() {
//     const addButton = this.root.querySelector('#search button')
//     addButton.onclick = () => {
//       const {value} = this.root.querySelector('#search input')
//       this.add(value)
//     }
//   }

//   update() {
//     this.removeAllTr()
//     const entriesValue = this.entries.length

//     if(entriesValue === 0) {
//       this.isEmpty = this.root.querySelector('#empty')
//       this.isEmpty.classList.remove('none')
//     } else {
//       this.entries.forEach(user => {
//         const row = this.createTr()
//         row.querySelector('.user img').src = `https://github.com/${user.login}.png`
//         row.querySelector('.user a').href = `https://github.com/${user.login}`
//         row.querySelector('.user a p').textContent = user.name
//         row.querySelector('.user a span').textContent = `/${user.login}`
//         row.querySelector('.repositories').textContent = user.public_repos
//         row.querySelector('.followers').textContent = user.followers
//         row.querySelector('.remove').onclick = () => {
//           const isOk = confirm('Tem certeza que deseja deletar esse usuário?')
//           if(isOk) {
//             this.delete(user)
//           }
//         }
  
//        this.body.append(row)
//       })
//       this.isEmpty.classList.add('none')
//     }
    
//   }

//   createTr() {
//     const tr = document.createElement('tr')
    
//     tr.innerHTML = `
//         <td class="user">
//           <img src="https://github.com/maykbrito.png" alt="Imagem da conta github">
//           <a href="https://github.com/maykbrito" target="_blank">
//             <p>Mayk Brito</p>
//             <span>/maykbrito</span>
//           </a>
//         </td>
//         <td class="repositories">
//           123
//         </td>
//         <td class="followers">
//           1234
//         </td>
//         <td class="action">
//           <button class="remove">Remover</button>
//         </td>
//     `    

//     return tr
//   }

//   removeAllTr() {
//     this.body.querySelectorAll('tr')
//     .forEach(tr => tr.remove())
//   }
// } 