function DateToString(date) {
    try {
        let result = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`
        return result
    } catch (error) {
        console.log(error)
    }
}

export {DateToString}