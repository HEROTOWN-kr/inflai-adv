import React, {
  useEffect, useRef, useState, useLayoutEffect
} from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;

function MapGraph(props) {
  const { mapData } = props;
  const selectEl = useRef(null);

  useLayoutEffect(() => {
    const chart = am4core.create('chartdiv', am4maps.MapChart);

    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();
    chart.seriesContainer.draggable = false;
    chart.seriesContainer.resizable = false;
    chart.maxZoomLevel = 1;

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

    selectEl.current = chart;

    return () => {
      chart.dispose();
    };
  }, [mapData]);

  return (
    <Box ref={selectEl} id="chartdiv" width="100%" height="320px" />
  );
}

export default MapGraph;
