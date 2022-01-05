import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5wc from '@amcharts/amcharts5/wc';

function AmChartWordCloud() {
  useLayoutEffect(() => {
    const root = am5.Root.new('wordCloud');

    const series = root.container.children.push(
      am5wc.WordCloud.new(root, {
        maxCount: 100, // the cloud will limited to 100 words
        minValue: 2, // only words that appear twice or more in sourceText will appear in the cloud
        angles: [0],
        colors: am5.ColorSet.new(root, {
          colors: [
            am5.color(0x095256),
            am5.color(0x087f8c),
            am5.color(0x5aaa95),
            am5.color(0x86a873),
            am5.color(0xbb9f06)
          ]
        })
      })
    );

    series.labels.template.setAll({
      fontFamily: 'Courier New',
      fill: am5.color(0x85ffc4),
      templateField: 'labelSettings'
    });

    series.data.setAll([
      {
        category: '안철수',
        value: 64.96,
        labelSettings: { fill: am5.color(0x8d8d8d) }
      },
      {
        category: '이준석',
        value: 45.07,
        labelSettings: { fill: am5.color(0x297373) }
      },
      { category: '정부', value: 45.24 },
      { category: '방문', value: 45.08 },
      { category: '정부', value: 45.35 },
      { category: '지원', value: 33.91 },
      { category: '문재인', value: 33.91 },
      { category: '발표', value: 33.91 },
      { category: '부인', value: 33.91 },
      { category: '여의도', value: 33.91 },
      { category: '공수처', value: 33.91 },
      { category: '아들', value: 33.91 },
      { category: '김건회', value: 33.91 },
      { category: '김혜경', value: 33.91 }
    ]);

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="wordCloud" style={{ width: '100%', height: '250px' }} />;
}

export default AmChartWordCloud;
