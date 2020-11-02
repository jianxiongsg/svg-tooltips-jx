/**@jsx createElement */
import { createElement,useLayoutEffect,forwardRef, useState, useRef } from 'rax';
import calSvgInfo, { calcSvgBounding ,px2px,path2vw } from './calPathBak';
import './index.less';

/**
 * 计算svg四周顶点坐标，path方式简单的只接受left,right,top,bottom四个顶点和radius
 * @param size 内容宽高
 * @param strockWidth 线宽
 * @param arrowWidth 箭头空隙宽度
 * @param arrowHeight 箭头空隙高度
 * @param arrowOffset 箭头offset
 * @param radius 圆角
 * @param direction 箭头方向
 * @param defsElement 渐变配合fill
 */


export interface ToolTipElementProps {

    ref?:any,
    content?:any, // 框里面的元素
    className?:string, // 类名
    a11yId:string,  // id
    a11yRole?:any,
    width:number,
    height:number,
    arrowPath:string, // svg箭头路径
    allowReplacePath?:boolean, 
    arrowWidth:number,
    arrowHeight:number,
    radius:number,
    strockWidth:number,
    direction?:string,
    arrowOffset:number,
    transitionName:string,
    defsElement?:any,
    fill:any
}



function SvgToolTip(props: ToolTipElementProps,ref:any) {
  const {
    content,
    className,
    a11yId,
    a11yRole,
    width,
    height,
    arrowPath,
    allowReplacePath,
    arrowWidth,
    arrowHeight,
    radius,
    strockWidth,
    direction,
    arrowOffset,
    transitionName,
    defsElement,
    fill,
  } = props;
  const childRef = useRef(null);
  const [svgInfo, setSvgInfo] = useState({
    width: 0,
    height: 0,
    translate: 'translate(0, 0)',
    svgTransform: {},
    path: '',
    wrapWidth: 0,
    wrapHeight: 0,
    contentStyle: {},
    wrapLeft: 0,
    wrapTop: 0,
  });

  useLayoutEffect(() => {
    const svgWidth = px2px(width);
    const svgHeight = px2px(height);
    const svgRadius = px2px(radius);
    const svgArrowPath = path2vw(arrowPath);
    // 计算svg的包围盒
    const svgBounding = calcSvgBounding(direction, svgWidth, svgHeight, strockWidth, arrowWidth, arrowHeight, arrowOffset);
    // 计算svg路径
    const svgDriectionInfo = calSvgInfo(direction, svgBounding, svgRadius, svgArrowPath,0, arrowWidth);
    const isHorizontal = direction === 'left' || direction === 'right';
    setSvgInfo({
      width: svgBounding.width,
      height: svgBounding.height,
      translate: `translate(${-svgBounding.left + svgBounding.strockOffset},${-svgBounding.top + svgBounding.strockOffset})`,
      svgTransform: svgDriectionInfo.svgTransform,
      path: allowReplacePath ? svgArrowPath : svgDriectionInfo.path,
      contentStyle: {},
      wrapWidth: isHorizontal ? svgBounding.height : svgBounding.width,
      wrapHeight: isHorizontal ? svgBounding.width : svgBounding.height,
      wrapLeft: 0,
      wrapTop: 0
    });
  }, [content]);

  return (
    <div
      ref={ref}
      className={`tooltips ${className || ''} ${transitionName}`}
      role={a11yRole}
      tabIndex={-1}
      id={a11yId}
      style={{
        left: `${svgInfo.wrapLeft}px`,
        top: `${svgInfo.wrapTop}px`,
        width: `${svgInfo.wrapWidth}px`,
        height: `${svgInfo.wrapHeight}px`
      }}
    >
      <svg focusable="false" aria-hidden={true}  width={svgInfo.width} height={svgInfo.height} style={svgInfo.svgTransform}>
        {defsElement && <defs>{defsElement}</defs>}
        <g transform={svgInfo.translate} fill={fill}>
          <path className="tooltip__path" d={svgInfo.path}></path>
        </g>
      </svg>
      <div ref={childRef} style={{ ...svgInfo.contentStyle }} className="tooltips__content">
        {content}
      </div>
    </div>
  );
}

export default forwardRef(SvgToolTip);

SvgToolTip.defaultProps = {
  
  direction: 'top',
  arrowOffset: 0,
  strockWidth: 0,
  arrowPath: 'L -8, 8 L -16, 0',
  allowReplacePath: false,
  arrowWidth: 16,
  arrowHeight: 8,
  visible: false,
  transitionName: '',
  timeout: 0
};