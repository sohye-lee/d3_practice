// const body = d3.select("body");
// const h1 = body.append("h1").html("Hi");
// const p = body
//   .append("p")
//   .attr("class", "link")
//   .attr("title", "link")
//   .html('<a href="/">Link</a>');
// console.log(body);

// const data = [10, 20, 30, 40, 50, 60, 70];

// const el = d3
//   .select("ul")
//   .selectAll("li")
//   .data(data)
//   .join(
//     (enter) => {
//       return enter.append("li").style("color", "green");
//     },
//     (update) =>
//       update.style("background-color", "purple").style("color", "white"),
//     (exit) => exit.remove()
//   )
//   .text((d) => d);
// console.log(el._groups[0][1].__data__);
// console.log(el);
