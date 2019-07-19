let img, pixelArray = []
const loadFile = function (event) {
    // Load image 
    img = document.getElementById('output')
    img.src = URL.createObjectURL(event.target.files[0])
}

function getImageData() {
    // draw image on canvas to get pixeldata
    canvas = document.getElementById('canvas')
    canvas.width = img.width
    canvas.height = img.height
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height)

    // get pixel data 
    const data = canvas.getContext('2d').getImageData(0, 0, img.width, img.height).data

    const imageHeight = img.height
    const imageWidth = img.width

    for (var y = 0; y < imageHeight; y++) {
        // loop through each column
        for (var x = 0; x < imageWidth; x++) {
            pixelArray[x, y] = {
                red: data[((imageWidth * y) + x) * 4],
                green: data[((imageWidth * y) + x) * 4 + 1],
                blue: data[((imageWidth * y) + x) * 4 + 2],
                alpha: data[((imageWidth * y) + x) * 4 + 3]
            }
        }
    }

    console.log(pixelArray)
}