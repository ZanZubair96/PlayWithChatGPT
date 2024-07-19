window.onload = function() {
  const imageData = localStorage.getItem('capturedImage');
  if (imageData) {
      document.getElementById('displayImage').src = imageData;
  }
};

function goBack() {
  window.history.back();
}

function addMore() {
  window.location.href = 'index.html'; // Navigate to the capture page
}

function goNext() {
  // Implement the action for the next button
  alert('Next button clicked!');
}