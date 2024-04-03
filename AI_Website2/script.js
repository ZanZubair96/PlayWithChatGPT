const aiWebsites = [
    { name: "Algolia", url: "https://www.algolia.com/", category: "AI Search Engines" },
    { name: "OpenAI", url: "https://www.openai.com/", category: "AI Research" },
    { name: "Hexomatic", url: "https://hexomatic.com/", category: "Automation" },
    { name: "Search Engine Journal", url: "https://www.searchenginejournal.com/", category: "SEO and Marketing" }
];

const searchInput = document.getElementById('searchInput');
const aiLinks = document.getElementById('aiLinks');

// Function to display AI websites based on search query
function displayAIWebsites(query) {
    aiLinks.innerHTML = '';
    const filteredWebsites = aiWebsites.filter(website => website.name.toLowerCase().includes(query.toLowerCase()));
    
    filteredWebsites.forEach(website => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const span = document.createElement('span');
        
        a.textContent = website.name;
        a.href = website.url;
        a.target = "_blank";
        
        span.textContent = `Category: ${website.category}`;
        span.style.fontStyle = "italic";
        
        li.appendChild(a);
        li.appendChild(document.createElement('br'));
        li.appendChild(span);
        
        aiLinks.appendChild(li);
    });
}

// Event listener for search input
searchInput.addEventListener('input', function() {
    const query = this.value;
    displayAIWebsites(query);
});

// Function to update element styles based on mouse position
function updateElementStyle(element, mouseX, mouseY) {
    const rect = element.getBoundingClientRect();
    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;
    
    const deltaX = mouseX - elementCenterX;
    const deltaY = mouseY - elementCenterY;
    
    const maxDistance = 100;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < maxDistance) {
        const scale = 1 + (maxDistance - distance) / maxDistance;
        element.style.transform = `scale(${scale})`;
    } else {
        element.style.transform = 'scale(1)';
    }
}

// Event listener for mouse movement
document.addEventListener('mousemove', function(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    const aiLinks = document.querySelectorAll('#aiLinks li');
    
    aiLinks.forEach(link => {
        updateElementStyle(link, mouseX, mouseY);
    });
});