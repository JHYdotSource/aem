export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  let imgSize;
  let imageMapPoints = [];

  // setup image columns
  [...block.children].forEach((row) => {
    // console.log('Row', row);
    let imgPointData = [];

    const pic = row.querySelector('picture');
    if (pic) {
      imgSize = [pic.querySelector('img').width, pic.querySelector('img').height];
      const picWrapper = pic.closest('div');
      if (picWrapper && picWrapper.children.length === 1) {
        // picture is only content in column
        picWrapper.classList.add('imagemap-img-col');
      }
    }
    [...row.children].forEach((col) => {
      if (!pic) {
        imgPointData.push(col.textContent);
      }
    });
    if (!pic) {
      row.remove();
      imageMapPoints.push([imgPointData]);
    }
  });

  if (imageMapPoints.length && imgSize.length) {
    imageMapPoints.forEach(point => {
      const [x, y, content] = point[0];
      const [imgWidth, imgHeight] = imgSize;
      const percentageTop = 100 * y / imgHeight;
      const percentageLeft = 100 * x / imgWidth;
      const imageWrapper = document.querySelector('.imagemap-img-col');
      const pointElement = document.createElement('div');
      pointElement.classList.add('point');
      pointElement.style.top = percentageTop + '%';
      pointElement.style.left = percentageLeft + '%';
      pointElement.title = content;
      imageWrapper.append(pointElement);
    })

  }
}