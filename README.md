## svg-tooltips-jx


## Install

$ npm install svg-tooltips-jx --save

## Usage
import SvgToolTip from 'svg-tooltips-jx';
```
const getContent=()=>{
        return <div>content</div>
}


const getDefsElement = ()=>{
    return <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="rgba(0,0,0,0.4)"/>
            <stop offset="100%" stop-color="rgba(0,0,0,.8)" />
        </linearGradient>
}



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
```

### Props

| 参数          | 介绍                          |
|-------------|-----------------------------|
| arrowPath | 尖角路径（可选，默认尖角）    |
| arrowWidth | 尖角宽度（可选）                    |
| arrowHeight | 尖角高度（可选）                    |
| widht | 气泡宽度                    |
| height | 气泡高度                    |
| strockWidth | 边框宽度                       |
| direction   | 尖角方向(left/right/top/bottom)|
| arrowOffset | 尖角距离气泡中心点的offset         |
| radius      | 气泡四周圆角                      |
| content     | 气泡内容                      |
| defsElement | svg defs元素，用于渐变                      |
| fill        | fill,配合defsElement,也可直接设置颜色                     |
| a11yId | tooltips 的id名 |
