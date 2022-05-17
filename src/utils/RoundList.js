export default function RoundList(numero, divisor) {
    let toRound = 0
    if (numero % divisor != 0) {
        toRound = (4 - (numero % divisor))
        return toRound
    }
    else {
        return 0
    }
}
