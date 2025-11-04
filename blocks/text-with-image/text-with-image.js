export default function decorate(block) {
  const [imageDiv, textDiv] = block.children;

  if (!imageDiv || !textDiv) {
    console.warn('Text-with-image block requires both image and text sections');
    return;
  }

  // Clear the block and add our structure
  block.innerHTML = '';

  // Create container
  const container = document.createElement('div');
  container.className = 'text-with-image-container';

  // Process image
  const imageSection = document.createElement('div');
  imageSection.className = 'text-with-image-image';

  const img = imageDiv.querySelector('img');
  if (img) {
    // Ensure image is responsive
    img.setAttribute('loading', 'lazy');
    imageSection.appendChild(img);
  }

  // Process text content
  const textSection = document.createElement('div');
  textSection.className = 'text-with-image-text';

  // Move all text content to text section
  const textContent = document.createElement('div');
  textContent.className = 'text-with-image-content';

  // Process the text elements
  const textElements = Array.from(textDiv.children);
  textElements.forEach((element) => {
    if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') {
      element.className = 'text-with-image-title';
    } else if (element.tagName === 'P') {
      element.className = 'text-with-image-description';
    } else if (element.tagName === 'A' || (element.tagName === 'P' && element.querySelector('a'))) {
      // Handle links/CTAs
      const link = element.tagName === 'A' ? element : element.querySelector('a');
      if (link) {
        link.className = 'text-with-image-cta';
      }
    }
    textContent.appendChild(element);
  });

  textSection.appendChild(textContent);

  // Add sections to container
  container.appendChild(imageSection);
  container.appendChild(textSection);

  // Add container to block
  block.appendChild(container);
}
