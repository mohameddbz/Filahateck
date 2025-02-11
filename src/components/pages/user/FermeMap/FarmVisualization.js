import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate

const FarmVisualization = ({ parcels }) => {
  const svgRef = useRef(null);
  const navigate = useNavigate(); // Utilisez useNavigate pour obtenir la fonction de navigation

  useEffect(() => {
    if (!parcels || parcels.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Nettoyer le SVG à chaque rendu

    const allCoords = parcels.flatMap(parcel => parcel.coordinates[0]);
    const xExtent = d3.extent(allCoords, d => d[0]);
    const yExtent = d3.extent(allCoords, d => d[1]);

    // Créer une échelle pour ajuster les coordonnées à la taille du SVG
    const width = 500;
    const height = 500;
    const xScale = d3.scaleLinear().domain(xExtent).range([0, width]);
    const yScale = d3.scaleLinear().domain(yExtent).range([height, 0]);

    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("padding", "5px")
      .style("background-color", "rgba(0,0,0,0.7)")
      .style("color", "white")
      .style("border-radius", "4px")
      .style("font-size", "12px");

    parcels.forEach(parcel => {
      const coords = parcel.coordinates[0].map(([x, y]) => [xScale(x), yScale(y)]);

      svg.append("polygon")
        .attr("points", coords.map(d => d.join(",")).join(" "))
        .attr("fill", "lightgreen")
        .attr("stroke", "black")
        .attr("opacity", 0.7)
        .style("cursor", "pointer")
        .on("mouseover", function(event, d) {
          d3.select(this).attr("fill", "green");

          tooltip.transition()
            .duration(200)
            .style("visibility", "visible")
            .style("opacity", 1);

          tooltip.html(`Parcelle: ${parcel.id}`)
            .style("left", `${event.pageX + 5}px`)
            .style("top", `${event.pageY + 5}px`); 
        })
        .on("mouseout", function() {
          d3.select(this).attr("fill", "lightgreen");

          tooltip.transition()
            .duration(200)
            .style("opacity", 0)
            .style("visibility", "hidden");
        })
        .on("click", () => {
          navigate(`/user/ferme-map/${parcel.id}`);
        });

      const centroid = d3.polygonCentroid(coords);
      svg.append("text")
        .attr("x", centroid[0])
        .attr("y", centroid[1])
        .text(parcel.nomPercel)
        .attr("font-size", "12px")
        .attr("text-anchor", "middle");
    });
  }, [parcels]);

  return <svg ref={svgRef} width={500} height={500}></svg>;
};

export default FarmVisualization;