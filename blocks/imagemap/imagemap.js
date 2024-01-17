/*
 * Copyright (c) 2008-2024.
 * All rights reserved.
 * https://www.dotsource.de
 *
 * Contributors
 * Jakob Heynemann - initial contents
 */

export default function decorate(block) {
  let imgSize;
  const imageMapPoints = [];

  // setup image and mappings
  [...block.children].forEach((row) => {
    const imgPointData = [];
    const pic = row.querySelector('picture');
    if (pic) {
      const imgElement = pic.querySelector('img');
      if (imgElement) {
        imgSize = [imgElement.width, imgElement.height];
      }
      const picWrapper = pic.closest('div');
      if (picWrapper && picWrapper.children.length === 1) {
        // picture is only content in column
        picWrapper.classList.add('imagemap-img-col');
      }
      return;
    }
    [...row.children].forEach((col) => {
      imgPointData.push(col.textContent);
    });
    row.remove();
    imageMapPoints.push([imgPointData]);
  });

  // create points with title attribute
  if (imageMapPoints.length && imgSize.length === 2) {
    const [imgWidth, imgHeight] = imgSize;
    const imageWrapper = block.querySelector('.imagemap-img-col');
    imageMapPoints.forEach((point) => {
      const [x, y, content] = point[0];
      const percentageTop = (100 * y) / imgHeight;
      const percentageLeft = (100 * x) / imgWidth;
      const pointElement = document.createElement('div');
      pointElement.classList.add('point');
      pointElement.style.top = `${percentageTop}%`;
      pointElement.style.left = `${percentageLeft}%`;
      pointElement.dataset.title = content;
      pointElement.tabIndex = 0;
      imageWrapper.append(pointElement);
    });
  }
}
