let img, pixelArray = []
const loadFile = function (event) {
    // Load image 
    img = document.getElementById('output')
    img.src = URL.createObjectURL(event.target.files[0])
}

function getImageData() {
    // draw image on canvas to get pixeldata
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height)

    // get pixel data 
    const data = canvas.getContext('2d').getImageData(0, 0, img.width, img.height).data

    const imageHeight = img.height
    const imageWidth = img.width
    let cssString = ''

    for (let y = 0; y < imageHeight; y++) {
        // loop through each column
        for (let x = 0; x < imageWidth; x++) {
            pixelArray[x, y] = {
                red: data[((imageWidth * y) + x) * 4],
                green: data[((imageWidth * y) + x) * 4 + 1],
                blue: data[((imageWidth * y) + x) * 4 + 2],
                alpha: data[((imageWidth * y) + x) * 4 + 3]
            }

            // String contains box-shadow values
            // bod-shadow line contains:
            // x-value y-value 0 color,
            const hexColor = rgbToHex(pixelArray[x, y].red, pixelArray[x, y].green, pixelArray[x, y].blue)
            cssString = cssString + ` ${x}px ${y}px 0 ${hexColor}, `
        }
    }

    // delete last comma
    cssString = cssString.substring(0, cssString.length - 2)

    $('#output').css("display", "none")
    $('#css-div-parent').css("width", imageWidth)
    $('#css-div-parent').css("height", imageHeight)
    $('#css-div').css("box-shadow", cssString)
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function componentToHex(c) {
    const hex = c.toString(16)
    return hex.length == 1 ? "0" + hex : hex
}