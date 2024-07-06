function generateRandomCode() {
    var code = '';
    var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var max = characters.length - 1;

    for (var i = 0; i < 13; i++) {
        code += characters.charAt(Math.floor(Math.random() * max));
    }

    return code;
}

// Example usage
// var randomCode = generateRandomCode();
// console.log(randomCode);

module.exports = generateRandomCode;