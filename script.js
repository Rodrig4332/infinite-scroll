const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initial = true;

// Unsplash API
let count = 5;
const apiKey =`kQm4sln5NUvKVk3e0dmuz8kCaK2snvsdQAOYmzj3AM4`;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
      initialLoad = false;
      count = 30;
      const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}
// Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}


//  Create Elements for Links & photos,add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photos array
    photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const  item = document.createElement('a');
    setAttributes(item, {
        href:photo.links.html,
        target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
  }


// Get photos from Unsplash API 
async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
    } catch (error) {
        // catch error Here
    }
}

// Check to see if scrolling near bottom of page,Load More Pictures
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ) {
    ready = false;
    getPhotos();
    }
})
// On load
getPhotos();