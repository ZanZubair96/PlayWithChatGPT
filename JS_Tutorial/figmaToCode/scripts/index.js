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
};const MAX_FILE_SIZE_MB = 3; // Maximum file size in MB

function captureMaterialImage() {
    document.getElementById('fileInput').click();
}

document.getElementById('fileInput').onchange = function(event) {
    const file = event.target.files[0];
    if (file) {
        const fileSizeMB = file.size / (1024 * 1024); // Convert file size to MB
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            compressImage(file);
        } else {
            processImage(file);
        }
    }
};

function compressImage(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const maxWidth = 800; // You can adjust this value as needed
            const maxHeight = 800; // You can adjust this value as needed
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(function(blob) {
                processImage(blob);
            }, 'image/jpeg', 0.7); // Adjust the quality parameter as needed (0.7 means 70% quality)
        };
    };
}

function processImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        localStorage.setItem('capturedImage', e.target.result);
        window.location.href = 'displayMaterial.html';
    };
    reader.readAsDataURL(file);
} 

