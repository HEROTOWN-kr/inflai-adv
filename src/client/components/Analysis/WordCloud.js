import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5wc from '@amcharts/amcharts5/wc';

function AmChartWordCloud() {
  const color1 = '#CB02C8';
  const color2 = '#691FD5';
  const color3 = '#482CF9';
  const color4 = '#89A4FF';

  useLayoutEffect(() => {
    const root = am5.Root.new('wordCloud');

    const series = root.container.children.push(
      am5wc.WordCloud.new(root, {
        angles: [0],
        minFontSize: 18,
        maxFontSize: 56,
        colors: am5.ColorSet.new(root, {
          colors: [
            am5.color(color1),
            am5.color(color2),
            am5.color(color2),
            am5.color(color2),
            am5.color(color2),
            am5.color(color2),
            am5.color(color2),
            am5.color(color2),
            am5.color(color2),
            am5.color(color3),
            am5.color(color3),
            am5.color(color3),
            am5.color(color3),
            am5.color(color3),
            am5.color(color3),
            am5.color(color3),
            am5.color(color3),
            am5.color(color3),
            am5.color(color3),
            am5.color(color3),
            am5.color(color3),
            am5.color(color3),
            am5.color(color3),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4),
            am5.color(color4)
          ]
        })
      })
    );

    series.labels.template.setAll({
      fill: am5.color(0x85ffc4),
      templateField: 'labelSettings',
      fontFamily: 'Courier New',
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 5,
      paddingBottom: 5
    });

    series.data.setAll([
      { category: '정부', value: 45 },
      { category: '정부', value: 23 },
      { category: '정부', value: 23 },
      { category: '정부', value: 23 },
      { category: '방문', value: 23 },
      { category: '부인', value: 23 },
      { category: '아들', value: 23 },
      { category: '부인', value: 23 },
      { category: '아들', value: 23 },
      { category: '정부', value: 15 },
      { category: '발표', value: 15 },
      { category: '부인', value: 15 },
      { category: '여의도', value: 15 },
      { category: '지원', value: 15 },
      { category: '문재인', value: 15 },
      { category: '발표', value: 15 },
      { category: '부인', value: 15 },
      { category: '여의도', value: 15 },
      { category: '공수처', value: 15 },
      { category: '여의도', value: 15 },
      { category: '공수처', value: 15 },
      { category: '여의도', value: 15 },
      { category: '공수처', value: 15 },
      { category: '아들', value: 10 },
      { category: '김건회', value: 10 },
      { category: '김혜경', value: 10 },
      { category: '아들', value: 10 },
      { category: '김건회', value: 10 },
      { category: '김혜경', value: 10 },
      { category: '아들', value: 10 },
      { category: '김건회', value: 10 },
      { category: '김혜경', value: 10 },
      { category: '방문', value: 10 },
      { category: '부인', value: 10 },
      { category: '아들', value: 10 },
      { category: '김혜경', value: 10 },
      { category: '김혜경', value: 10 },
      { category: '방문', value: 10 },
      { category: '부인', value: 10 },
      { category: '아들', value: 10 },
      { category: '김혜경', value: 10 }
    ]);

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="wordCloud" style={{ width: '100%', height: '250px' }} />;
}

export default AmChartWordCloud;
