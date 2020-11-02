export default function getPosition(
  svgWidth,
  svgHeight,
  triggerRefRect,
  boxRect,
  strockWidth,
  direction
) {
  // trigger的中心点
  const triggerCenter = triggerRefRect.left + triggerRefRect.width / 2;

  // 左右包围：中心点应该在包围盒的左右偏移tip宽度一半中
  const calTriggerCenter = Math.min(
    boxRect.right - svgWidth / 2 - strockWidth,
    Math.max(triggerCenter, boxRect.left + svgWidth / 2 + strockWidth)
  );
  const st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const offsetLeft = calTriggerCenter - svgWidth / 2;

  let offset = calTriggerCenter - triggerCenter;
  let wrapLeft = 0;
  let wrapTop = 0;
  let contentStyle = {};

  // TODO: 应该要通过计算完成的svg宽高来计算
  switch (direction) {
    case 'top':
      offset = -offset;
      wrapLeft = offsetLeft;
      wrapTop = triggerRefRect.top - svgHeight + st;
      contentStyle = {left: `${strockWidth}px`, top: `${strockWidth}px`};
      break;
    case 'bottom':
      wrapLeft = offsetLeft;
      wrapTop = triggerRefRect.bottom + st;
      contentStyle = {left: `${strockWidth}px`, bottom: `${strockWidth}px`};
      break;
    case 'left':
      offset = -offset;
      wrapLeft = triggerRefRect.left - svgHeight;
      wrapTop = triggerRefRect.top + triggerRefRect.height / 2 - svgWidth / 2 + st;
      contentStyle = {left: `${strockWidth}px`, top: `${strockWidth}px`};
      break;
    case 'right':
      wrapLeft = triggerRefRect.right;
      wrapTop = triggerRefRect.top + triggerRefRect.height / 2 - svgWidth / 2 + st;
      contentStyle = {right: `${strockWidth}px`, top: `${strockWidth}px`};
      break;
  }

  return {
    offset,
    wrapLeft: wrapLeft,
    wrapTop: wrapTop,
    contentStyle
  };
}
