 // this.setSize();

    // const svg = d3
    //   .select(this.$el)
    //   .append("svg")
    //   .attr("width", "100%")
    //   .attr("height", "100%");

    // const g = svg.append("g"); // g:group 组合对象的容器

    // const projection = d3
    //   .geoMercator()
    //   .center([0, 0])
    //   .translate([this.size.width / 2, this.size.height / 2])
    //   .scale(512 / (2 * Math.PI));

    // const path = d3.geoPath(projection); // path generator，根据输入的数据得到path

    // const countries = g
    //   .selectAll("path") //数据绑定在path上
    //   .data(this.Feature)
    //   .enter(); //  当对应的元素不足时，绑定数据数量 > 对应元素，后面通常先跟 append 操作

    // console.log(g);

    // countries
    //   .append("path") // 插入元素，也可用insert(可以指定将新元素插入位置)
    //   .attr("class", "countries")
    //   .style("fill", "#444")
    //   .attr("d", path);