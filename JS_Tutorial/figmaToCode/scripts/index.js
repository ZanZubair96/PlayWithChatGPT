function captureMaterialImg() {
    document.getElementById('fileInput').click();
}

document.getElementById('fileInput').onchange = function(event) {
    const file = event.target.files[0];
    if (file) {
        alert('File selected: ' + file.name);
    }
};