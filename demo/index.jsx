import { createElement, render } from 'rax';
import DriverUniversal from 'driver-universal';
import SvgToolTip from "svg-tooltips-jx";
const getContent=()=>{
    return <div>content</div>
}
render( <SvgToolTip
    className={`svg-con`}
    a11yId={"svgEleId"}
    strockWidth={0}
    radius={18}
    width={300}
    height={80}
    direction={"top"}
    arrowOffset={0}
    arrowWidth={12}
    arrowHeight={24}
    transitionName="boost-mod-block"
    arrowPath={'L -12 12 L -24 0'}
    content={getContent()}
    fill={`rgba(255,0,0,0.7)`}
></SvgToolTip>, document.body, { driver: DriverUniversal });
