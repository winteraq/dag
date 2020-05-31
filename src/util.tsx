import React from 'react';
import { Label, Tag, Text } from 'react-konva';
import { curveBasis, line } from 'd3-shape';
import { getTheme } from './theme';

const canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 300;
canvas.style.display = 'none';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
ctx!.font = '12px Ubuntu Mono, Tahoma';

export const measureText = function (text: string) {
  return ctx!.measureText(text).width;
};

export const formatText = function (
  label: string,
  fittingIndex: number,
  color: string,
  searchKey?: string
) {
  const { searchBg, searchColor, fontFamily } = getTheme();
  if (!searchKey) {
    return (
      <Text
        listening={false}
        text={`${fittingIndex === label.length ? label : label.substring(0, fittingIndex) + '...'}`}
        fontSize={12}
        fill={color}
        fontFamily={fontFamily}
      />
    );
  } else {
    const labels: any[] = [];
    let x = 0;
    let currentIndex = 0;
    const items = label.split(searchKey);
    let i = 0;
    const l = items.length;
    for (; i < l; i++) {
      const item = items[i];
      currentIndex += item.length;
      let renderText = item;
      if (currentIndex > fittingIndex) {
        renderText = item.slice(0, fittingIndex - currentIndex);
      }
      labels.push(
        <Text
          listening={false}
          x={x}
          key={`${i}-1`}
          text={renderText}
          fontSize={12}
          fill={color}
          fontFamily={fontFamily}
        />
      );
      x += measureText(renderText);
      if (currentIndex > fittingIndex) {
        break;
      }
      currentIndex += searchKey.length;
      renderText = searchKey;
      if (currentIndex > fittingIndex) {
        renderText = searchKey.slice(0, fittingIndex - currentIndex);
      }
      labels.push(
        <Label listening={false} x={x} key={`${i}-2`}>
          <Tag fill={searchBg} />
          <Text fontSize={12} fill={searchColor} text={renderText} fontFamily={fontFamily} />
        </Label>
      );
      x += measureText(renderText);
      if (currentIndex > fittingIndex) {
        break;
      }
    }
    if (fittingIndex < label.length) {
      labels.push(
        <Label listening={false} x={x} key={`...`}>
          {i < l - 1 && <Tag fill={searchBg} />}
          {/* <Tag fill={searchBg} /> */}
          <Text
            fontSize={12}
            fill={i >= l - 1 ? color : searchColor}
            text={'...'}
            fontFamily={fontFamily}
          />
        </Label>
      );
    }
    return labels.slice(0, labels.length);
  }
};

/**
 * 计算字符串的长度
 * @param {string} str 指定的字符串
 */
export const calcStrLen = function calcStrLen(str: string) {
  let len = 0;
  const textWidths = [];
  for (let i = 0; i < str.length; i++) {
    if (['i', '1', 'l', ':', '.'].includes(str.charAt(i))) {
      len += 0.5;
      textWidths.push(0.5);
    }
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      len++;
      textWidths.push(1);
    } else {
      textWidths.push(2);
      len += 2;
    }
  }
  return { len, textWidths };
};

/**
 * 计算显示的字符串
 * @param {string} str 要裁剪的字符串
 * @param {number} maxWidth 最大宽度
 * @param {number} fontSize 字体大小
 */
export const fittingString = function fittingString(
  str: string,
  maxWidth: number,
  fontSize: number
): number {
  const fontWidth = fontSize * 1.2; // 字号+边距
  maxWidth = maxWidth * 2; // 需要根据自己项目调整
  const { len, textWidths } = calcStrLen(str);
  const width = len * fontWidth;
  if (width > maxWidth) {
    let splitLength = Math.floor((width - maxWidth) / fontWidth);
    let i = textWidths.length - 1;
    for (; i >= 0; i--) {
      const item = textWidths[i];
      splitLength -= item;
      if (splitLength < 0) {
        break;
      }
    }
    return i;
    // var actualLen = Math.floor((maxWidth - 20) / fontWidth)
    // var result = str.substring(0, i) + ellipsis;
    // return result;
  }
  return str.length;
  // return str;
};

export const lineGenerator = line()
  .x(function (d) {
    return d[0];
  })
  .y(function (d) {
    return d[1];
  });

export function getPathData(points: { x: number; y: number }[]): string {
  // TODO 加缓存？
  const data = lineGenerator.curve(curveBasis)(points.map((item) => [item.x, item.y]));
  // console.log(data)
  return data!;
}

export function pathDataToPoints(data: string) {
  return data
    .split(/(?=[LMC])/)
    .map((item) => item.slice(1).split(',').map(Number))
    .flat();
}
