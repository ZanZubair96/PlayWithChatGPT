let images = [];

function captureImage() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            images.push(e.target.result);
            showPage2();
        };
        reader.readAsDataURL(file);
    }
}

function showPage2() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const imageContainer = document.getElementById('imageContainer');

    imageContainer.innerHTML = '';
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        imageContainer.appendChild(img);
    });

    page1.style.display = 'none';
    page2.style.display = 'block';
}

function addMore() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}

function goBack() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');

    page1.style.display = 'block';
    page2.style.display = 'none';
}

function nextPage() {
    alert('Proceed to the next page');
}
