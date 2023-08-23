import { GithubUser } from "./GithubUser.js"

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites: ')) || []
  }

  save() {
    localStorage.setItem('@github-favorites: ', JSON.stringify(this.entries))
  }

  async add(username) {
    try {
      const userExists = this.entries.find(entry => entry.login === username)
      if(userExists) {
        throw new Error('Usuário já existente')
      }

      if(username === '') {
        throw new Error('Digite um usuário')
      }

      const user = await GithubUser.search(username)

      if(user.login === undefined) {
        throw new Error('Usuário inexistente')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()
    } catch (e) {
      alert(e.message)
    }

    
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.body = this.root.querySelector('table tbody')
    this.update()
    this.onadd()
  }

  onadd() {
    this.root.querySelector('#search button').onclick = () => {
      const { value } = this.root.querySelector('#search input')
      this.add(value)
    }
  }

  update() {
    this.removeAllTr()

    const showMsg = this.entries.length === 0
    this.empty = this.root.querySelector('#empty')

    if(showMsg) {
      this.empty.classList.remove('none')
    } else {
      this.entries.forEach(user => {
        const row = this.createAllTr()
        row.querySelector('.user img').src = `https://github.com/${user.login}.png`
        row.querySelector('.user a').href = `https://github.com/${user.login}`
        row.querySelector('.user a p').textContent = user.name
        row.querySelector('.user a span').textContent = user.login
        row.querySelector('.repositories').textContent = user.public_repos
        row.querySelector('.followers').textContent = user.followers
        row.querySelector('.remove').onclick = () => {
          const msg = confirm('Tem certeza que deseja excluir esse perfil?')
          if(msg) {
            this.delete(user)
          }
        }
        
        this.body.append(row)
      })
      this.empty.classList.add('none')
    }

    
  }

  createAllTr() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
    <td class="user">
      <img src="https://github.com/maykbrito.png" alt="Imagem da conta github">
      <a href="https://github.com/maykbrito" target="_blank">
        <p>Mayk Brito</p>
        <span>/maykbrito</span>
      </a>
    </td>
    <td class="repositories">
      123
    </td>
    <td class="followers">
      1234
    </td>
    <td class="action">
      <button class="remove">Remover</button>
    </td>
    `

    return tr
  }

  removeAllTr() {
    this.tr = this.body.querySelectorAll('tr')
    this.tr.forEach(tr => tr.remove())
  }
}