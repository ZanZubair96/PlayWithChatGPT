function captureMaterialImg() {
    document.getElementById('fileInput').click();
}

document.getElementById('fileInput').onchange = function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('capturedImage', e.target.result);
            window.location.href = 'displayMaterial.html';
        };
        reader.readAsDataURL(file);
    }
};