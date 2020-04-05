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
ctx!.font = '12px Arial';

export const measureText = function (text: string) {
  return ctx!.measureText(text).width;
};

export const formatText = function (label: any, color: string, searchKey?: string) {
  const { searchBg, searchColor, fontFamily } = getTheme();
  if (!searchKey) {
    return <Text text={`${label}`} fontSize={12} fill={color} fontFamily={fontFamily} />;
  } else {
    const labels: any[] = [];
    let x = 0;
    label.split(searchKey).forEach((item: string, index: number) => {
      labels.push(
        <Text
          x={x}
          key={`${index}-1`}
          text={item}
          fontSize={12}
          fill={color}
          fontFamily={fontFamily}
        />
      );
      x += measureText(item);
      labels.push(
        <Label x={x} key={`${index}-2`}>
          <Tag fill={searchBg} />
          <Text fontSize={12} fill={searchColor} text={searchKey} fontFamily={fontFamily} />
        </Label>
      );
      x += measureText(searchKey);
    });
    return labels.slice(0, labels.length - 1);
  }
};

/**
 * 计算字符串的长度
 * @param {string} str 指定的字符串
 */
export const calcStrLen = function calcStrLen(str: string) {
  let len = 0,
    textWidths = [];
  for (let i = 0; i < str.length; i++) {
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
) {
  const fontWidth = fontSize * 1.3; //字号+边距
  maxWidth = maxWidth * 2; // 需要根据自己项目调整
  const { len, textWidths } = calcStrLen(str);
  const width = len * fontWidth;
  const ellipsis = '…';
  if (width > maxWidth) {
    let splitLength = Math.floor((width - maxWidth) / fontWidth),
      i = textWidths.length - 1;
    for (; i >= 0; i--) {
      const item = textWidths[i];
      splitLength -= item;
      if (splitLength < 0) {
        break;
      }
    }
    // var actualLen = Math.floor((maxWidth - 20) / fontWidth)
    var result = str.substring(0, i) + ellipsis;
    return result;
  }
  return str;
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
