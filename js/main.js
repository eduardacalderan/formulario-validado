class ValidForm {
  constructor() {
    this.form = document.querySelector('.form')
    this.events()
  }

  events() {
    this.form.addEventListener('submit', e => {
      this.handleSubmit(e)
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const isValid = this.isValid()
    const passwordIsValid = this.passwordIsValid()

    if (isValid && passwordIsValid) {
      alert('Formulário enviado com sucesso!')
      this.form.submit()
    }
  }

  isValid() {
    let valid = true

    for (let errorText of this.form.querySelectorAll('.error-msg')) {
      errorText.remove()
    }

    for (let field of this.form.querySelectorAll('.valid')) {
      const label = field.previousElementSibling.innerText

      if (!field.value) {
        this.createError(field, `Campo "${label}" não pode estar em branco.`)
        valid = false
      }
      if (field.classList.contains('cpf')) {
        if (!this.validCPF(field)) valid = false
      }
      if (field.classList.contains('user')) {
        if (!this.validUser(field)) valid = false
      }
    }
    return valid
  }

  passwordIsValid() {
    let valid = true

    const password = this.form.querySelector('.password')
    const repeatPassword = this.form.querySelector('.repeat-password')

    if (password.value !== repeatPassword.value) {
      valid = false
      this.createError(
        password,
        `Campos senha e repetir senha precisam ser iguais.`
      )

      this.createError(
        repeatPassword,
        `Campos senha e repetir senha precisam ser iguais.`
      )
    }

    if (password.value.length < 6 || password.value.length > 12) {
      this.createError(
        password,
        `Campos senha precisa ter entre 6 e 12 caracteres.`
      )
    }

    return valid
  }

  validCPF(field) {
    const cpf = new ValidCPF(field.value)

    if (!cpf.valid()) {
      this.createError(field, `CPF inválido.`)
      return false
    }

    return true
  }

  validUser(field) {
    const user = field.value
    let valid = true

    if (user.length > 12 || user.length < 3) {
      this.createError(
        field,
        `Nome de usuário precisa ter entre 3 e 12 caracteres.`
      )
      valid = false
    }

    if (!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(
        field,
        `Nome de usuário precisa conter apenas letras e/ou números.`
      )
      valid = false
    }

    return valid
  }

  createError(field, msg) {
    const p = document.createElement('p')
    p.innerHTML = msg
    p.classList.add('error-msg')
    field.insertAdjacentElement('afterend', p)
  }
}

const validForm = new ValidForm()
