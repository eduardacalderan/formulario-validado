class ValidCPF {
  constructor(sentCPF) {
    Object.defineProperty(this, 'cleanCPF', {
      writable: false,
      //
      enumerable: true,
      //
      configurable: false,
      //
      value: sentCPF.replace(/\D+/g, '')
    })
  }

  valid() {
    if (typeof this.cleanCPF === 'undefined') return false
    if (this.cleanCPF.length !== 11) return false
    if (this.isSequence()) return false
    const partialCPF = this.cleanCPF.slice(0, -2)
    const digit1 = ValidCPF.createDigit(partialCPF)
    const digit2 = ValidCPF.createDigit(partialCPF + digit1)
    const novoCPF = partialCPF + String(digit1) + String(digit2)
    return novoCPF === this.cleanCPF
  }

  static createDigit(partialCPF) {
    const cpfArray = Array.from(partialCPF)

    let regressive = cpfArray.length + 1
    let total = cpfArray.reduce((accumulator, value) => {
      accumulator += regressive * Number(value)
      regressive--
      return accumulator
    }, 0)

    const digit = 11 - (total % 11)
    return digit > 9 ? 0 : digit
  }

  isSequence() {
    const sequence = this.cleanCPF[0].repeat(this.cleanCPF.length)
    return sequence === this.cleanCPF
  }
}
