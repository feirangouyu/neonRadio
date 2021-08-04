function getColor (imageSrc, Obj) {
  let qulity = 1000;
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');

  let image = new Image();
  image.crossOrigin = '';
  let data;
  image.src = imageSrc;

  image.onload = function () {
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 300, 150);
    data = ctx.getImageData(0, 0, image.width, image.height).data; //读取整张图片的像素。
    let rgbArray = new Array();
    for (let i = 0; i < data.length; i += 4) {
      let rdata = data[i]; //240-250
      let gdata = data[i + 1]; //70-100
      let bdata = data[i + 2]; //80-120
      let adata = data[i + 3];
      if (adata > 125) {
        rgbArray.push([rdata, gdata, bdata, adata]);
      }
    }
    GetColor(rgbArray);
  };

  function GetColor(cube) {
    let maxr = cube[0][0],
      minr = cube[0][0],
      maxg = cube[0][1],
      ming = cube[0][1],
      maxb = cube[0][2],
      minb = cube[0][2];
    for (let i = 0; i < cube.length; i++) {
      if (cube[i][0] > maxr) {
        maxr = cube[i][0];
      }
      if (cube[i][0] < minr) {
        minr = cube[i][0];
      }
      if (cube[i][1] > maxg) {
        maxg = cube[i][1];
      }
      if (cube[i][1] < ming) {
        ming = cube[i][1];
      }
      if (cube[i][2] > maxb) {
        maxb = cube[i][2];
      }
      if (cube[i][2] < minb) {
        minb = cube[i][2];
      }
    }

    if ((maxr - minr) < qulity && (maxg - ming) < qulity && (maxb - minb) < qulity) {
      let r = 0,
        g = 0,
        b = 0;
      for (let i = 0; i < cube.length; i++) {
        r += cube[i][0];
        g += cube[i][1];
        b += cube[i][2];
      }

      let divcolor = document.createElement("div");
      divcolor.style.backgroundColor = "rgba(" + r / (cube.length) + "," + g / (cube.length) + "," + b / (cube
        .length) +
        ")";
      Obj.rdata = Math.floor( r / (cube.length))  
      Obj.gdata = Math.floor( g / (cube.length))  
      Obj.bdata = Math.floor( b / (cube.length))  
    } else {
      let maxrgb = 0;
      let rgbindex = 0;
      let rgbmiddle = 0;

      if ((maxr - minr) > maxrgb) {
        maxrgb = (maxr - minr);
        rgbmiddle = (maxr + minr) / 2
        rgbindex = 0;
      }
      if ((maxg - ming) > maxrgb) {
        maxrgb = (maxg - ming);
        rgbmiddle = (maxg + ming) / 2;
        rgbindex = 1;
      }
      if ((maxb - minb) > maxrgb) {
        maxrgb = (maxb - minb);
        rgbmiddle = (maxb + minb) / 2;
        rgbindex = 2;
      }

      //排序
      cube.sort(function (x, y) {
        return x[rgbindex] - y[rgbindex];
      });
      let cubea = new Array();
      let cubeb = new Array();
      for (let i = 0; i < cube.length; i++) {
        if (cube[i][rgbindex] < rgbmiddle) {
          cubea.push(cube[i]);
        } else {
          cubeb.push(cube[i]);
        }
      }

      GetColor(cubeb);
      GetColor(cubea);
    }
  }

} 

export {getColor}