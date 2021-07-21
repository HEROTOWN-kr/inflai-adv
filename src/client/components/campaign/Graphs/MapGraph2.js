import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@material-ui/core';
import axios from 'axios';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;

function MapGraph2(props) {
  const { INS_ID, setMaxLocVal } = props;
  const [mapData, setMapData] = useState([]);
  const selectEl = useRef(null);

  function getStatistics() {
    axios.get('/api/TB_INSTA/statsMap', {
      params: { INS_ID }
    }).then((res) => {
      const { data2, maxLoc } = res.data;
      if (maxLoc) setMaxLocVal(maxLoc);
      if (data2) setMapData(data2);
    }).catch(err => alert(err));
  }

  useEffect(() => {
    if (INS_ID) {
      getStatistics();
    }
  }, [INS_ID]);

  useEffect(() => {
    if (selectEl.current && mapData.length > 0) {
      am4core.ready(() => {
        // Create map instance
        const chart = am4core.create('chartdiv', am4maps.MapChart);

        /* const title = chart.titles.create();
        title.text = '[bold font-size: 20]Population of the World in 2011[/]\nsource: Gapminder';
        title.textAlign = 'middle'; */

        // Set map definition
        chart.geodata = am4geodata_worldLow;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        chart.seriesContainer.draggable = false;
        chart.seriesContainer.resizable = false;
        chart.maxZoomLevel = 1;

        // Create map polygon series
        const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.exclude = ['AQ'];
        polygonSeries.useGeodata = true;
        polygonSeries.nonScalingStroke = true;
        polygonSeries.strokeWidth = 0.5;
        polygonSeries.calculateVisualCenter = true;

        const imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.data = mapData;
        imageSeries.dataFields.value = 'value';

        const imageTemplate = imageSeries.mapImages.template;
        imageTemplate.nonScaling = true;

        const circle = imageTemplate.createChild(am4core.Circle);
        circle.fillOpacity = 0.7;
        circle.propertyFields.fill = 'color';
        circle.tooltipText = '{name}: [bold]{value}[/]';


        imageSeries.heatRules.push({
          target: circle,
          property: 'radius',
          min: 4,
          max: 30,
          dataField: 'value'
        });

        imageTemplate.adapter.add('latitude', (latitude, target) => {
          const polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
          if (polygon) {
            return polygon.visualLatitude;
          }
          return latitude;
        });

        imageTemplate.adapter.add('longitude', (longitude, target) => {
          const polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
          if (polygon) {
            return polygon.visualLongitude;
          }
          return longitude;
        });
      }); // end am4core.ready()
    }
  }, [selectEl, mapData]);

  return (
    <Box ref={selectEl} id="chartdiv" width="100%" height="265px" />
  );
}

export default MapGraph2;
