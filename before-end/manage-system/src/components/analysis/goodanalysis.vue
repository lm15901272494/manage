<template>
  <div>
    <h1 style="margin:10px 0;">商品分析页面</h1>
    <!-- 扇形图 -->
    <div id="myChartone" :style="{width:'400px',height:'250px'}"></div>
    <!-- 柱形图 -->
    <div id="mycharttwo" :style="{width:'400px',height:'250px',marginTop:'10px'}">

    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    //通过函数调用生产图表
    this.myChartone()

    this.myCharttwo()

    this.axios.get("/goodAnalysis").then(res=>{
      if(res.data.length!=0){
        let arr=[]
        for(let i of res.data){
           arr.push({value:i.sum,name:i.title})
        }
        this.myChartone(arr)
      }
    })
  },
  methods:{
    myChartone(arr){
      // 基于准备好的dom，初始化echarts实例  ---在vue中  this.$echarts
    let myChart =this.$echarts.init(document.getElementById("myChartone"));
    //数据设置
    let option = {
      backgroundColor: "#2c343c",
      title: {
        text: "天猫商城",
        left: "center",
        // top: 20,
        textStyle: {
          color: "#ccc"
        }
      },

    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },

      // visualMap: {
      //   show: false,
      //   min: 80,
      //   max: 600,
      //   inRange: {
      //     colorLightness: [80, 600]
      //   }
      // },
      series: [
        {
          name: "数量占比",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: arr,
          roseType: "radius",
          label: {
            normal: {
              textStyle: {
                color: "rgba(255, 255, 255, 0.3)"
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)"
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 255, 0.5)"
            }
          },

          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    },
    myCharttwo(){
      let myChart =this.$echarts.init(document.getElementById("mycharttwo"));
      let option = {
          dataset: {
              source: [
                  ['score', 'amount', 'product'],
                  [89.3, 58212, 'Matcha Latte'],
                  [57.1, 78254, 'Milk Tea'],
                  [74.4, 41032, 'Cheese Cocoa'],
                  [50.1, 12755, 'Cheese Brownie'],
                  [89.7, 20145, 'Matcha Cocoa'],
                  [68.1, 79146, 'Tea'],
                  [19.6, 91852, 'Orange Juice'],
                  [10.6, 101852, 'Lemon Juice'],
                  [32.7, 20112, 'Walnut Brownie']
              ]
          },
          grid: {containLabel: true},
          xAxis: {name: 'amount'},
          yAxis: {type: 'category'},
          visualMap: {
              orient: 'horizontal',
              left: 'center',
              min: 10,
              max: 100,
              text: ['High Score', 'Low Score'],
              // Map the score column to color
              dimension: 0,
              inRange: {
                  color: ['#D7DA8B', '#E15457']
              }
          },
          series: [
              {
                  type: 'bar',
                  encode: {
                      // Map the "amount" column to X axis.
                      x: 'amount',
                      // Map the "product" column to Y axis
                      y: 'product'
                  }
              }
          ]
      };
      myChart.setOption(option);
    }
  }

};

</script>