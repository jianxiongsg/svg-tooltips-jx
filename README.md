## svg-tooltips-jx


## Install

$ npm install svg-tooltips-jx --save

## Usage
import SvgToolTip from 'svg-tooltips-jx';
```
const getContent=()=>{
        return <div>content</div>
}
```
const getDefsElement = ()=>{
    return <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="rgba(0,0,0,0.4)"/>
            <stop offset="100%" stop-color="rgba(0,0,0,.8)" />
        </linearGradient>
};
```
<SvgToolTip
    className={`svg-con`}
    a11yId="svgEleId"
    strockWidth={0}
    radius={18}
    width={300}
    height={80}
    direction="top"
    arrowOffset={0}
    arrowWidth={12}
    arrowHeight={24}
    defsElement={getDefsElement()}
    fill='url(#Gradient1)'
    arrowPath="L -12 12 L -24 0"
    content={getContent()}
></SvgToolTip>
