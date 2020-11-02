/**
 * 计算svg四周顶点坐标，path方式简单的只接受left,right,top,bottom四个顶点和radius
 * @param width 内容宽度
 * @param height 内容高度
 * @param strockWidth 线宽
 * @param arrowWidth 箭头空隙宽度
 * @param arrowHeight 箭头空隙高度
 * @param arrowOffset 箭头offset
 */
export function calcSvgBounding(
  placement,
  width,
  height,
  strockWidth,
  arrowWidth,
  arrowHeight,
  arrowOffset
) {
  const isHorizontal = placement === 'left' || placement === 'right';
  if (isHorizontal) {
    const tmpWidth = width;
    width = height;
    height = tmpWidth;
  }
  const strockOffset = strockWidth / 2;

  // borderWidth和borderHeight代表内容加上strock的宽度
  // 由于svg strokeWidth会占用一半线宽,处理成类似css的盒模型
  const borderWidth = width + strockWidth * 2;
  const borderHeight = height + strockWidth * 2 + strockOffset;
console.log(arrowWidth)
  arrowOffset += arrowWidth / 2;

  return {
    left: -(width / 2 + arrowOffset + strockOffset), // 是为了避免左侧由于计算被裁切,
    right: width / 2 - arrowOffset + strockOffset,
    top: -(height + strockWidth),
    bottom: 0,
    width: borderWidth,
    height: borderHeight + px2px(arrowHeight),
    strockOffset,
  };
}

/**
 * 通过rect来绘制svg
 * @param placement 方向
 * @param svgRect svg rect
 * @param radius svg raidus
 * @param arrowPath 箭头路径
 * @param positionArrowOffset 偏移量
 */
export default function calSvgInfo(
  placement = 'top',
  svgRect,
  radius,
  arrowPath,
  positionArrowOffset,
  arrowWidth
) {
  const { left: originLeft, right: originRight, top, bottom, width, height } = svgRect;
  // 计算偏移
  const left = originLeft - positionArrowOffset;
  const right = originRight - positionArrowOffset;

  let rotate = 0;
  switch (placement) {
    case 'left':
      rotate = -90;
      break;
    case 'right':
      rotate = 90;
      break;
    case 'bottom':
      rotate = 180;
      break;
    default:
      rotate = 0;
      break;
  }
  return {
    // TODO: prefix
    svgTransform: {
      transformOrigin: placement === 'left' || placement === 'right' ? 'left top' : 'center',
      transform: `rotate(${rotate}deg)`,
      top: placement === 'left' ? `${width}px` : 0,
      left: placement === 'right' ? `${height}px` : 0,
    },
    path: `M 0,0
        ${arrowPath}
        H ${Math.min(left + radius, -arrowWidth)}
        Q ${left},${bottom} ${left},${bottom - radius}
        V ${top + radius}
        Q ${left},${top} ${left + radius},${top}
        H ${right - radius}
        Q ${right},${top} ${right},${top + radius}
        V ${bottom - radius}
        Q ${right},${bottom} ${Math.max(right - radius, 0)},${bottom}
        z`,
  };
}


function vw2px(num) {
  const screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
  return (num / 100) * screenWidth;
}

export function px2px(num) {
  return vw2px(num / 7.5);
}

export function path2vw(str: string, scale: number = 1) {
  if (!str) return '';
  try {
    return str
      .split(' ')
      .map(n => {
        if (!isNaN(Number(n))) {
          return px2px(Number(n) * scale);
        } else {
          return n;
        }
      })
      .join(' ');
  } catch (er) {
    return '';
  }
}