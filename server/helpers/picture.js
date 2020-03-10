function GetTime() {
    return new Date().getTime();
}

function Base64ToFile(picture) {
    //parfois lorsque la chaine est convertie en chaine base 64 elle commence
    //par le préfixee data:image .....
    //c pourqoi on replace par le vide si existe
    base64Data = picture.replace(/^data:image\/png;base64,/, "")
    binaryData = new Buffer(base64Data, 'base64').toString('binary');

    //on génère le file_name qui sagit d'un timestamp
    file_name = `/uploads/${GetTime()}.png`;

    require("fs").writeFile(`.${file_name}`, binaryData, "binary", function (err) {
        console.log(err); // writes out file without error, but it's not a valid image
    });
    return file_name;
}

module.exports = { Base64ToFile }